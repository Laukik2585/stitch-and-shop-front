
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  customerEmail: string;
  customerName: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Order confirmation email function called');
  
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

    console.log('User authenticated for email:', user.email);

    const { customerEmail, customerName, orderId, items, total }: OrderConfirmationRequest = await req.json();
    console.log('Sending order confirmation to:', customerEmail);

    // Generate order items HTML
    const itemsHtml = items.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <strong>${item.name}</strong><br>
          ${item.color ? `Color: ${item.color}<br>` : ''}
          ${item.size ? `Size: ${item.size}<br>` : ''}
          Qty: ${item.quantity}
        </td>
        <td style="padding: 12px 0; text-align: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join('');

    const emailResponse = await resend.emails.send({
      from: "ATELIER <onboarding@resend.dev>",
      to: [customerEmail],
      subject: "Order Confirmation - Thank You for Your Purchase!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1c1c1c; font-size: 32px; font-weight: 300; letter-spacing: 4px; margin: 0;">
                ATELIER
              </h1>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1c1c1c; font-size: 24px; font-weight: 300; margin-bottom: 16px;">
                Thank you for your order, ${customerName}!
              </h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 0;">
                We've received your order and will begin processing it right away. You'll receive a shipping confirmation email once your items are on their way.
              </p>
            </div>

            <div style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="color: #1c1c1c; font-size: 14px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
                Order ID: ${orderId}
              </p>
              <p style="color: #666; font-size: 14px; margin: 0;">
                Order Date: ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1c1c1c; font-size: 18px; font-weight: 400; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                Order Summary
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr style="border-top: 2px solid #1c1c1c;">
                  <td style="padding: 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                    Total
                  </td>
                  <td style="padding: 16px 0; text-align: right; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-weight: 600; font-size: 18px;">
                    $${total.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h4 style="color: #1c1c1c; font-size: 16px; font-weight: 400; margin: 0 0 12px 0;">
                What's Next?
              </h4>
              <ul style="color: #666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>We'll process your order within 1-2 business days</li>
                <li>You'll receive a shipping confirmation with tracking information</li>
                <li>Your order will arrive within 3-7 business days</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Questions about your order? Contact us at support@atelier.com
              </p>
              <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">
                © 2024 ATELIER. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending order confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
