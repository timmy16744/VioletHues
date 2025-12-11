"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send, Check, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  budget: string;
  message: string;
  howDidYouHear: string;
}

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "wedding", label: "Wedding Florals" },
  { value: "special-occasion", label: "Special Occasion" },
  { value: "everyday", label: "Everyday Bouquet" },
  { value: "subscription", label: "Flower Subscription" },
  { value: "other", label: "Other / Not Sure" },
];

const budgetOptions = [
  { value: "", label: "Select your budget..." },
  { value: "under-100", label: "Under $100" },
  { value: "100-250", label: "$100 - $250" },
  { value: "250-500", label: "$250 - $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2500", label: "$1,000 - $2,500" },
  { value: "2500+", label: "$2,500+" },
];

const howDidYouHearOptions = [
  { value: "", label: "Select an option..." },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "google", label: "Google Search" },
  { value: "referral", label: "Friend/Family Referral" },
  { value: "wedding-planner", label: "Wedding Planner" },
  { value: "other", label: "Other" },
];

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "For weddings and large events, I recommend booking 3-6 months in advance. For smaller arrangements and everyday bouquets, 1-2 weeks notice is usually sufficient.",
  },
  {
    question: "Do you deliver?",
    answer: "Yes! I offer delivery within a 20-mile radius of Meadowbrook. Delivery fees vary based on distance and are quoted at the time of booking.",
  },
  {
    question: "Can I request specific flowers?",
    answer: "Absolutely! I work closely with you to incorporate your favourite flowers whenever possible. Keep in mind that some flowers are seasonal, so I may suggest beautiful alternatives when needed.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "I understand plans change. Cancellations made more than 2 weeks before your event receive a full refund minus the deposit. Please contact me directly for specific circumstances.",
  },
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(123) 456-7890",
    href: "tel:+1234567890",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@violethues.com",
    href: "mailto:hello@violethues.com",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "123 Blossom Lane, Meadowbrook",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Sat: 9am - 5pm",
    href: "#",
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data:", data);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-medium rounded-full mb-6">
              Let&apos;s Connect
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-violet-950 leading-tight mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-violet-700 max-w-2xl mx-auto">
              I genuinely care about your special moments. Let me know how I can
              make them even more beautiful with flowers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {isSubmitted ? (
                <div className="bg-violet-50 rounded-3xl p-12 text-center">
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-violet-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-violet-900 mb-3">
                    Thank You!
                  </h3>
                  <p className="text-violet-700 mb-6">
                    I&apos;ve received your message and will get back to you within
                    24 hours. I can&apos;t wait to hear more about your vision!
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Your Name *"
                      id="name"
                      placeholder="Jane Smith"
                      error={errors.name?.message}
                      {...register("name", { required: "Name is required" })}
                    />
                    <Input
                      label="Email Address *"
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      error={errors.email?.message}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      id="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                      {...register("phone")}
                    />
                    <Select
                      label="Service Type *"
                      id="service"
                      options={serviceOptions}
                      error={errors.service?.message}
                      {...register("service", { required: "Please select a service" })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input
                      label="Event Date"
                      id="eventDate"
                      type="date"
                      {...register("eventDate")}
                    />
                    <Select
                      label="Estimated Budget"
                      id="budget"
                      options={budgetOptions}
                      {...register("budget")}
                    />
                  </div>

                  <Textarea
                    label="Tell Me About Your Vision *"
                    id="message"
                    rows={5}
                    placeholder="Describe your event, colour preferences, flower favourites, or anything else you'd like me to know..."
                    error={errors.message?.message}
                    {...register("message", {
                      required: "Please share some details about your request",
                    })}
                  />

                  <Select
                    label="How Did You Hear About Us?"
                    id="howDidYouHear"
                    options={howDidYouHearOptions}
                    {...register("howDidYouHear")}
                  />

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-lavender rounded-3xl p-8">
                <h3 className="font-serif text-xl font-semibold text-violet-900 mb-6">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="flex items-start gap-4 text-violet-700 hover:text-violet-900 transition-colors"
                      >
                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                          <p className="text-sm text-violet-500">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-violet-950 rounded-3xl p-8 text-white">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Visit My Studio
                </h3>
                <p className="text-violet-300 text-sm mb-4">
                  Studio visits are by appointment only. Get in touch to arrange
                  a consultation where we can chat over tea and discuss your
                  floral dreams.
                </p>
                <div className="aspect-[4/3] bg-violet-900 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
                    alt="Violet Hues Studio"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-lavender">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-violet-950 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-violet-700">
              Find answers to common questions below, or reach out directly if
              you need more information.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-violet-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-violet-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
