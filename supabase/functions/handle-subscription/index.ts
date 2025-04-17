
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionData {
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = "https://laurvehulnkfxmmdbodf.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    
    // Check rate limiting
    const { data: rateCheckData, error: rateCheckError } = await supabase.rpc(
      "check_rate_limit",
      { ip_address: clientIP, action_type: "subscription" }
    );

    if (rateCheckError || !rateCheckData) {
      console.error("Rate limit check failed:", rateCheckError);
      return new Response(
        JSON.stringify({
          message: "Rate limit check failed, please try again later.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!rateCheckData) {
      return new Response(
        JSON.stringify({
          message: "Too many requests. Please try again later.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse the request body
    const { email }: SubscriptionData = await req.json();

    // Validate email
    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Email is required",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          message: "Invalid email format",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if already subscribed
    const { data: existingSubscriber, error: searchError } = await supabase
      .from("subscribers")
      .select("*")
      .eq("email", email)
      .single();

    if (searchError && searchError.code !== "PGRST116") { // PGRST116 is "not found" error
      console.error("Error checking subscriber:", searchError);
      return new Response(
        JSON.stringify({
          message: "Failed to check subscription status. Please try again.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (existingSubscriber) {
      if (!existingSubscriber.is_active) {
        // Reactivate existing subscription
        const { error: updateError } = await supabase
          .from("subscribers")
          .update({ is_active: true })
          .eq("id", existingSubscriber.id);

        if (updateError) {
          console.error("Error reactivating subscription:", updateError);
          return new Response(
            JSON.stringify({
              message: "Failed to reactivate your subscription. Please try again.",
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify({
            message: "Your subscription has been reactivated!",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "You're already subscribed!",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Save new subscription
    const { data, error } = await supabase.from("subscribers").insert([
      {
        email,
      },
    ]);

    if (error) {
      console.error("Error saving subscription:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to save your subscription. Please try again.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Subscription saved successfully:", data);

    return new Response(
      JSON.stringify({
        message: "Successfully subscribed to updates!",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        message: "An unexpected error occurred. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
