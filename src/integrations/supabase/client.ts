// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nrbxdecevwyneidsjdja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYnhkZWNldnd5bmVpZHNqZGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjAxNDgsImV4cCI6MjA2NjA5NjE0OH0.4bx6pesBd4xEmTWyDHzhdcWuhQ1J2WfFwYMhRRngQ1U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);