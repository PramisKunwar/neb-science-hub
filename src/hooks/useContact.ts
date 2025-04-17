import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useContact() {
  const [submitting, setSubmitting] = useState(false);

  const submitContactForm = async (formData: ContactFormData) => {
    setSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error("All fields are required");
      }
      
      // Client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }
      
      // Check rate limiting
      const { data: rateCheckData, error: rateCheckError } = await supabase.rpc(
        "check_rate_limit",
        { ip_address: "client-side", action_type: "contact_submission" }
      );

      if (rateCheckError) {
        console.error("Rate limit check failed:", rateCheckError);
        throw new Error("Rate limit check failed, please try again later.");
      }

      if (!rateCheckData) {
        throw new Error("Too many requests. Please try again later.");
      }
      
      // Insert directly into the contact_messages table
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error("Error submitting contact form:", error);
        throw new Error(error.message || "Failed to submit form");
      }
      
      // Show success message
      toast.success("Message Sent!", {
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error in contact form submission:", error);
      
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
      
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    submitContactForm,
  };
} 