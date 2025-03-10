"use client"; // Add this line at the top of the file

import React, { useState, useRef } from "react";
import { ArrowDownCircle, Send, Stars, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser"; // Use @emailjs/browser
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  business: string;
  vision: string;
}

const LandingPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    business: "",
    vision: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Create a ref for the "Ready to Start?" section
  const applySectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the "Ready to Start?" section
  const scrollToApplySection = () => {
    applySectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle form submission with EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Form Data before sending:", formData);

    try {
      const response = await emailjs.send(
        "service_z0zgnsp", // ✅ Correct Service ID
        "template_qjlz90w", // ✅ Ensure this is correct
        {
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          business: formData.business,
          vision: formData.vision,
        },
        "h8521CHkbMRbBHHUf" // ✅ Ensure this is the correct Public Key
      );

      console.log("✅ Email Sent Successfully:", response);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", mobile: "", business: "", vision: "" });
    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      alert("Failed to send message. Please check your API credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Hero Section */}
      <header className="p-6 lg:p-12 border-b-4 border-white">
        <nav className="flex justify-between items-center mb-20">
          <div className="text-2xl font-bold">Style My Site</div>
          <button
            className="bg-green-400 text-black px-6 py-2 font-bold hover:bg-green-300 transition-colors"
            onClick={scrollToApplySection}
          >
            APPLY NOW
          </button>
        </nav>
      </header>

      {/* Application Form */}
      <section ref={applySectionRef} className="p-6 lg:p-12 bg-pink-400 text-black">
        <h2 className="text-3xl lg:text-5xl font-bold mb-12">READY TO START?</h2>
        {isSubmitted ? (
          <div className="text-center bg-blue-500 text-black p-12 rounded-lg border-4 border-black transform rotate-1 shadow-lg max-w-xl mx-auto">
            <h2 className="text-4xl font-extrabold text-black mb-4">THANK YOU!</h2>
            <p className="text-lg font-bold bg-white inline-block px-4 py-2 transform -rotate-1">
              Your application has been submitted successfully.
            </p>
            <button
              className="mt-6 bg-black text-white px-6 py-3 border-4 border-white font-bold hover:bg-gray-800 transition-transform transform hover:-rotate-1"
              onClick={() => setIsSubmitted(false)}
            >
              APPLY AGAIN
            </button>
          </div>
        ) : (
          <form className="max-w-2xl space-y-6" onSubmit={handleSubmit}>
            {[
              { label: "NAME", type: "text", key: "name" as keyof FormData },
              { label: "EMAIL", type: "email", key: "email" as keyof FormData },
              { label: "MOBILE NUMBER", type: "tel", key: "mobile" as keyof FormData },
              { label: "BUSINESS NAME", type: "text", key: "business" as keyof FormData },
              { label: "YOUR VISION", type: "textarea", key: "vision" as keyof FormData },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block font-bold">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    className="w-full p-4 bg-white border-4 border-black"
                    rows={4}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-4 bg-white border-4 border-black"
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    required
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-8 py-4 font-bold flex items-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}</span>
              <Send size={20} />
            </button>
          </form>
        )}
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="whatsapp://send?phone=+918460501227&text=Hi,%20I%20need%20a%20website"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-green-400 transition-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={24} />
        <span className="hidden md:inline">Chat on WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="p-6 lg:p-12 border-t-4 border-white">
        <div className="text-center">
          <p className="text-lg">Crafted with ♥ by Sneh</p>
          <p className="text-sm mt-2">Empowering Ideas, One Website at a Time</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
