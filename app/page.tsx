"use client"; // Add this line at the top of the file

import React, { useState, useRef } from 'react';
import { ArrowDownCircle, Send, Stars } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Use @emailjs/browser
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
    name: '',
    email: '',
    mobile: '', // Add mobile field
    business: '',
    vision: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Create a ref for the "Ready to Start?" section
  const applySectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the "Ready to Start?" section
  const scrollToApplySection = () => {
    applySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle form submission with EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    console.log("Form Data before sending:", formData);
  
    try {
      const response = await emailjs.send(
        'service_z0zgnsp', // ✅ Correct Service ID
        'template_qjlz90w', // ✅ Ensure this is correct
        {
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          business: formData.business,
          vision: formData.vision
        },
        'h8521CHkbMRbBHHUf' // ✅ Ensure this is the correct Public Key
      );
  
      console.log("✅ Email Sent Successfully:", response);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', business: '', vision: '' });
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
            onClick={scrollToApplySection} // Add onClick handler
          >
            APPLY NOW
          </button>
        </nav>

        <div className="space-y-8">
          <h1 className="text-4xl lg:text-7xl font-black leading-tight">
            <span className="text-yellow-400">FREE</span> WEBSITES<br />
            FOR <span className="text-blue-400">AMBITIOUS</span><br />
            <span className="text-pink-400">DREAMERS</span>
          </h1>
          <p className="text-xl bg-white text-black p-4 inline-block transform rotate-1">
            Worth ₹15,000+ • Limited Slots Available
          </p>
          <div className="flex items-center space-x-4">
            <ArrowDownCircle className="animate-bounce" size={32} />
            <span className="text-lg">Scroll to learn more</span>
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="p-6 lg:p-12 bg-yellow-400 text-black">
        <div className="max-w-4xl">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            WHY I&apos;M DOING THIS?
          </h2>
          <p className="text-xl leading-relaxed bg-white p-4 transform -rotate-1">
          I&apos;m on a mission to help small businesses and creatives thrive online. 
            Every great idea deserves an amazing website, regardless of budget.
          </p>
          <div className="mt-8 flex items-center space-x-4">
            <Stars className="text-purple-600" size={32} />
            <span className="font-bold">NO HIDDEN CATCHES. JUST PURE CREATIVITY.</span>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="p-6 lg:p-12 bg-blue-500">
        <h2 className="text-3xl lg:text-5xl font-bold mb-12">HOW IT WORKS</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', text: 'APPLY VIA FORM' },
            { step: '02', text: 'GET SELECTED' },
            { step: '03', text: 'COLLABORATE' },
            { step: '04', text: 'LAUNCH SITE' }
          ].map((item) => (
            <div key={item.step} className="bg-white text-black p-6 transform hover:rotate-2 transition-transform">
              <div className="text-6xl font-black mb-4">{item.step}</div>
              <div className="text-xl font-bold">{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section ref={applySectionRef} className="p-6 lg:p-12 bg-pink-400 text-black">
        <h2 className="text-3xl lg:text-5xl font-bold mb-12">READY TO START?</h2>
        {isSubmitted ? (
  <div className="text-center bg-blue-500 text-black p-12 rounded-lg border-4 border-black transform rotate-1 shadow-lg max-w-xl mx-auto">
    <h2 className="text-4xl font-extrabold text-black mb-4">THANK YOU!</h2>
    <p className="text-lg font-bold bg-white inline-block px-4 py-2 transform -rotate-1">
      Your application has been submitted successfully.
    </p>
    <p className="mt-4 text-lg font-bold">I&apos;ll review it and get back to you soon!</p>
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
              { label: 'NAME', type: 'text', key: 'name' as keyof FormData },
              { label: 'EMAIL', type: 'email', key: 'email' as keyof FormData },
              { label: 'MOBILE NUMBER', type: 'tel', key: 'mobile' as keyof FormData }, // Add mobile field
              { label: 'BUSINESS NAME', type: 'text', key: 'business' as keyof FormData },
              { label: 'YOUR VISION', type: 'textarea', key: 'vision' as keyof FormData }
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block font-bold">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="w-full p-4 bg-white border-4 border-black"
                    rows={4}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-4 bg-white border-4 border-black"
                    value={formData[field.key]}
                    onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
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
              <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}</span>
              <Send size={20} />
            </button>
          </form>
        )}
      </section>

    

      {/* FAQ Section */}
      <section className="p-6 lg:p-12 bg-purple-500 text-black">
        <h2 className="text-3xl lg:text-5xl font-bold mb-12">
          QUESTIONS? <br />I GOT ANSWERS
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "HOW TO GET FREE WEBSITE?",
              answer: "Fill the form. Get selected. Magic happens. Site launches. Simple!"
            },
            {
              question: "WHO CAN APPLY?",
              answer: "Small businesses, startups, and creative souls with fire ideas 🔥"
            },
            {
              question: "ANY HIDDEN COSTS?",
              answer: "Nope. Zero. Nada. Just need your amazing idea!"
            },
            {
              question: "HOW LONG IT TAKES?",
              answer: "2-4 weeks from idea to launch. Quality takes time ⚡"
            }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="bg-white p-6 border-4 border-black transform hover:-rotate-1 transition-transform"
            >
              <h3 className="text-xl font-black mb-4">{faq.question}</h3>
              <p className="text-lg bg-purple-200 p-4 transform rotate-1">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Logos Section - Fully Responsive Two-Row Grid */}
<section className="p-6 lg:p-12 bg-black text-white">
  <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
    SOME SITES I&apos;VE WORKED ON
  </h2>

  {/* Responsive Grid for Logos */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-7xl mx-auto px-6">
    {[
      { src: "/logos/logo1.png", link: "https://type.ovrlzy.com" },
      { src: "/logos/logo2.png", link: "https://myportfolio.ovrlzy.com" },
      { src: "/logos/logo3.png", link: "https://imageops.ovrlzy.com" },
      { src: "/logos/logo4.png", link: "https://ovrlzy.com" },
      { src: "/logos/logo5.png", link: "https://miorah.biz" },
      { src: "/logos/logo6.png", link: "https://bit.ly/airbull" },
      { src: "/logos/logo7.png", link: "https://v0-file-reducer-dpgizjwkqvp.vercel.app/" },
      { src: "/logos/logo8.png", link: "https://amrita-aura-mxbznkvqvltejwge.builder-preview.com" },
      { src: "/logos/logo9.png", link: "https://expense-eta-seven.vercel.app/" },
      { src: "/logos/logo10.png", link: "https://stylemy.site" },
      { src: "/logos/logo11.png", link: "https://stylemy.site" },
      { src: "/logos/logo12.png", link: "https://stylemy.site" },
    ].map((logo, index) => (
      <a 
        key={index} 
        href={logo.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex justify-center items-center bg-white rounded-lg border-4 border-black w-32 h-32 aspect-square transform hover:scale-110 transition-transform"
      >
        <Image
  src={logo.src}
  alt={`Logo ${index + 1}`}
  width={128} // Adjust size
  height={128}
  className="w-32 h-32 object-contain"
/>

      </a>
    ))}
  </div>
</section>

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