"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/landing/Breadcrumb";
import { Sofia_Sans_Condensed } from "next/font/google";

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["900"],
});

// ── Icons ──────────────────────────────────────────────────────────────────

const MapPinIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.22 6.22l1.89-1.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.42z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-primaryColor"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Contact Info Card ─────────────────────────────────────────────────────

const InfoCard = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start gap-4 group">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primaryColor/10 border border-primaryColor/20 flex items-center justify-center text-primaryColor group-hover:bg-primaryColor group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="text-[#001429] font-medium hover:text-primaryColor transition-colors text-[15px] leading-relaxed"
        >
          {value}
        </a>
      ) : (
        <p className="text-[#001429] font-medium text-[15px] leading-relaxed">
          {value}
        </p>
      )}
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    if (!form.agreed) newErrors.agreed = "You must agree before submitting.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
    // Clear error on change
    if (errors[target.name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[target.name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* ── Hero Breadcrumb ────────────────────────────────────── */}
      <Breadcrumb title="Contact Us" />

      {/* ── Intro strip ───────────────────────────────────────── */}
      <div className="bg-[#f7f9fc] border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-primaryColor">
            Contact Answers
          </p>
          <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
            Our team is ready to support you with football queries or feedback.
            Connect with Island Allstars Sports Club for expert help.
          </p>
        </div>
      </div>

      {/* ── Main Section ──────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Info ──────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div>
              <h1 className={`text-4xl md:text-[3.2rem] font-black uppercase leading-[1.1] tracking-tight text-[#001429] ${sofiaSansCondensed.className}`}>
                Need Help?{" "}
                <span className="text-primaryColor">Contact IASC</span> Now!
              </h1>
              <p className="text-gray-500 mt-5 text-[15px] leading-relaxed max-w-md">
                Our team is ready to support you with football queries or
                feedback. Connect with Island Allstars Sports Club for expert
                help.
              </p>
            </div>

            <div className="flex flex-col gap-7">
              <InfoCard
                icon={<MapPinIcon />}
                label="Our Location"
                value="Lagos Business School, KM 22, Lekki-Epe Expressway, Ajah, Lagos, Nigeria"
              />
              <InfoCard
                icon={<PhoneIcon />}
                label="Phone Number"
                value="+2349155172547"
                href="tel:+2349155172547"
              />
              <InfoCard
                icon={<MailIcon />}
                label="Email Address"
                value="islandallstarssc@gmail.com"
                href="mailto:islandallstarssc@gmail.com"
              />
              <InfoCard
                icon={<ClockIcon />}
                label="Office Hours"
                value="Mon – Sat: 8:00 AM – 6:00 PM (WAT)"
              />
            </div>

            {/* Decorative accent bar */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-1 w-16 rounded-full bg-primaryColor" />
              <div className="h-1 w-6 rounded-full bg-primaryColor/30" />
              <div className="h-1 w-3 rounded-full bg-primaryColor/15" />
            </div>
          </div>

          {/* ── Right: Form / Success ─────────────────────── */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-100/80 p-8 md:p-10">
            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center text-center gap-5 py-10">
                <CheckCircleIcon />
                <h2 className="text-2xl font-bold text-[#001429] uppercase tracking-tight">
                  Message Sent!
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. A member of our team will get back
                  to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                      agreed: false,
                    });
                  }}
                  className="mt-2 px-8 py-3 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#0f55a0] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-600"
                    >
                      Name <span className="text-primaryColor">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-600"
                    >
                      Email <span className="text-primaryColor">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-600"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your number"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-xs font-semibold uppercase tracking-widest text-gray-600"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all bg-white appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Enquiry</option>
                      <option value="membership">Membership</option>
                      <option value="training">Training</option>
                      <option value="events">Events & Matches</option>
                      <option value="sponsorship">
                        Sponsorship / Partnership
                      </option>
                      <option value="media">Media</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-widest text-gray-600"
                  >
                    Message <span className="text-primaryColor">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Enter your message…"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primaryColor/30 focus:border-primaryColor transition-all resize-none ${
                      errors.message ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Consent */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      id="contact-agreed"
                      name="agreed"
                      type="checkbox"
                      checked={form.agreed}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 accent-primaryColor cursor-pointer"
                    />
                    <span className="text-xs text-gray-500 leading-relaxed">
                      I agree that my submitted data is being{" "}
                      <span className="text-primaryColor font-semibold underline underline-offset-2">
                        collected and stored
                      </span>
                      .
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="text-xs text-red-500 pl-7">{errors.agreed}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto mt-1 inline-flex items-center justify-center gap-3 px-10 py-3.5 bg-primaryColor text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-[#0f55a0] active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Map Section ───────────────────────────────────────── */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.384931328095!2d3.6035562999999993!3d6.472829399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf73e807b9625%3A0x196ba6c7ae623509!2sLagos%20Business%20School!5e0!3m2!1sen!2sng!4v1780789640138!5m2!1sen!2sng"
          width="600"
          height="450"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* ── FAQ Strip ─────────────────────────────────────────── */}
      <section className="bg-[#f7f9fc] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primaryColor mb-3">
              Quick Help
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-[#001429] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What does IASC stand for?",
                a: "IASC stands for Island Allstars Sports Club.",
              },
              {
                q: "How do I become a member of Island Allstars Sports Club?",
                a: "You can apply for membership by completing our online membership form on the 'Join our club' page. Our team will review your application and get in touch to guide you through the next steps.",
              },
              {
                q: "What sports and activities do you offer?",
                a: "We offer a diverse range of physical fitness activities including Football, Table Tennis, as well as indoor games like Chess, Draft, and Ludo.",
              },
              {
                q: "Where are your training and club facilities located?",
                a: "Our primary facility is located within the premises of the prestigious Lagos Business School in Ajah, Lekki, Lagos.",
              },
              {
                q: "How can I sponsor or partner with IASC?",
                a: "Please email islandallstarssc@gmail.com with 'Partnership Enquiry' as the subject line, or use the contact form above and select Sponsorship / Partnership.",
              },
            ].map((faq, i) => (
              <FaqCard key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FAQ Card ──────────────────────────────────────────────────────────────

function FaqCard({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-primaryColor shadow-md" : "border-gray-100 shadow-sm"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-sm font-semibold leading-snug transition-colors ${
            open ? "text-primaryColor" : "text-[#001429]"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? "border-primaryColor bg-primaryColor text-white rotate-45"
              : "border-gray-200 text-gray-400"
          }`}
        >
          <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-6" : "max-h-0"
        }`}
      >
        <p className="px-6 text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}
