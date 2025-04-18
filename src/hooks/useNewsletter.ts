
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useNewsletter() {
  const [subscribing, setSubscribing] = useState(false);

  const subscribe = async (email: string) => {
    if (!email) {
      toast.error("Error", {
        description: "Please enter your email address.",
      });
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Error", {
        description: "Please enter a valid email address.",
      });
      return false;
    }
    
    setSubscribing(true);
    
    try {
      // Check rate limiting - using an IP-agnostic approach for client-side
      const { data: rateCheckData, error: rateCheckError } = await supabase.rpc(
        "check_rate_limit",
        { ip_address: "client-side", action_type: "newsletter_subscription" }
      );

      if (rateCheckError) {
        console.error("Rate limit check failed:", rateCheckError);
        throw new Error("Rate limit check failed, please try again later.");
      }

      if (!rateCheckData) {
        throw new Error("Too many subscription attempts. Please try again later.");
      }
      
      // Check if email already exists
      const { data: existingSubscription } = await supabase
        .from("newsletter_subscriptions")
        .select("id, confirmed")
        .eq("email", email)
        .maybeSingle();
      
      if (existingSubscription) {
        if (existingSubscription.confirmed) {
          toast.info("Already Subscribed", {
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          toast.info("Confirmation Pending", {
            description: "This email is already registered. Please check your inbox to confirm your subscription.",
          });
        }
        return false;
      }
      
      // Insert new subscription
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email }]);
        
      if (error) {
        console.error("Error subscribing to newsletter:", error);
        throw new Error(error.message || "Failed to subscribe");
      }
      
      toast.success("Subscription Successful!", {
        description: "Thank you for subscribing to our newsletter.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error in newsletter subscription:", error);
      
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
      
      return false;
    } finally {
      setSubscribing(false);
    }
  };

  return {
    subscribing,
    subscribe,
  };
}
