
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log('Payment verification function called');
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    const { sessionId } = await req.json();
    console.log('Verifying payment for session:', sessionId);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Session status:', session.payment_status);

    if (session.payment_status === 'paid') {
      // Update order status in database
      const supabaseService = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
        { auth: { persistSession: false } }
      );

      const { data: order, error: fetchError } = await supabaseService
        .from("orders")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .single();

      if (fetchError) {
        console.error('Error fetching order:', fetchError);
        throw new Error('Order not found');
      }

      // Update order status to paid
      const { error: updateError } = await supabaseService
        .from("orders")
        .update({ status: "paid" })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        console.error('Error updating order status:', updateError);
      }

      // Parse customer info from session metadata
      const customerInfo = session.metadata?.customer_info ? 
        JSON.parse(session.metadata.customer_info) : 
        { firstName: 'Valued', lastName: 'Customer', email: user.email };

      // Send confirmation email
      try {
        const emailResponse = await supabaseClient.functions.invoke('send-order-confirmation', {
          body: {
            customerEmail: customerInfo.email || user.email,
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            orderId: order.id,
            items: order.items,
            total: order.amount / 100, // Convert from cents
          }
        });

        console.log('Email sent:', emailResponse);
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the whole request if email fails
      }

      return new Response(JSON.stringify({ 
        success: true, 
        status: 'paid',
        order: order
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        status: session.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
