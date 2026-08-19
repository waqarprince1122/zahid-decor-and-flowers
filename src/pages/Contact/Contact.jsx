import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
} from "react-icons/hi";

import { HiArrowUpRight } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";

import { siteConfig } from "../../data/siteConfig";

// =====================================================
// EMAILJS CONFIG
// =====================================================

const EMAILJS_SERVICE_ID = "service_n5lncob";
const EMAILJS_TEMPLATE_ID = "template_12g2mpz";
const EMAILJS_PUBLIC_KEY = "QC40RnRInkpcvxVe6";

// =====================================================
// CONTACT DETAILS
// =====================================================

const contactDetails = [
  {
    icon: HiOutlineLocationMarker,
    label: "Visit Our Studio",
    value: siteConfig.address,
  },
  {
    icon: HiOutlinePhone,
    label: "Call Us",
    value: siteConfig.phoneDisplay,
    href: `tel:+${siteConfig.phoneRaw}`,
  },
  {
    icon: HiOutlineMail,
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
];

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  name: "",
  phone: "",
  email: "",
  occasion: "",
  location: "",
  date: "",
  message: "",
};

const easeLux = [0.16, 1, 0.3, 1];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState(initialForm);

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 11);

      setForm((previous) => ({
        ...previous,
        phone: numbersOnly,
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const location = form.location.trim();

    if (name.length < 3) {
      return "Please enter your full name (minimum 3 characters).";
    }

    if (!/^03\d{9}$/.test(phone)) {
      return "Please enter a valid Pakistan mobile number, e.g. 03001234567.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!form.occasion) {
      return "Please select an occasion.";
    }

    if (location.length < 3) {
      return "Please enter your event location.";
    }

    if (!form.date) {
      return "Please select your event date.";
    }

    if (!form.message.trim()) {
      return "Please tell us a little about your requirements.";
    }

    return "";
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        customer_name: form.name.trim(),
        customer_phone: form.phone.trim(),
        customer_email: form.email.trim(),

        occasion: form.occasion,
        event_location: form.location.trim(),
        event_date: form.date,

        message: form.message.trim(),

        submitted_at: new Date().toLocaleString("en-PK"),
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error("EmailJS Contact Error:", err);

      setError("Your enquiry could not be sent right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =====================================================
  // WHATSAPP
  // =====================================================

  const whatsappUrl = `https://wa.me/${
    siteConfig.phoneRaw
  }?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-cream to-ivory pt-28 pb-14 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

        <div className="container-x relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLux }}
            className="eyebrow mb-4"
          >
            Get in Touch
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeLux }}
            className="text-balance text-4xl font-semibold leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          >
            Let's Plan Your Occasion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: easeLux }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal-soft/85 sm:text-base"
          >
            Reach out by phone, WhatsApp or the enquiry form below. Tell us
            about your occasion and we'll help you plan something beautiful.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="bg-ivory pb-20 sm:pb-28">
        <div className="container-x mx-auto grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easeLux }}
            className="space-y-5 lg:col-span-5"
          >
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <motion.div
                  key={detail.label}
                  whileHover={{ y: -3 }}
                  className="flex items-start gap-4 rounded-2xl border border-charcoal/5 bg-cream/50 p-5 shadow-sm transition-shadow duration-300 hover:shadow-soft sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                    <Icon size={20} />
                  </span>

                  <div className="min-w-0">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-gold-dark sm:text-xs">
                      {detail.label}
                    </p>

                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="break-words text-sm text-charcoal transition-colors hover:text-burgundy sm:text-base"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="break-words text-sm text-charcoal sm:text-base">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Opening Hours */}

            <div className="flex items-start gap-4 rounded-2xl border border-charcoal/5 bg-cream/50 p-5 shadow-sm sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <HiOutlineClock size={20} />
              </span>

              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-gold-dark sm:text-xs">
                  Opening Hours
                </p>

                <div className="space-y-1">
                  {siteConfig.hours.map((h) => (
                    <p
                      key={h.day}
                      className="text-sm text-charcoal sm:text-base"
                    >
                      <span className="text-charcoal-soft/75">{h.day}:</span>{" "}
                      {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp */}

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-medium tracking-wide text-white shadow-sm transition-shadow duration-300 hover:shadow-soft"
            >
              <FaWhatsapp size={21} />
              Chat With Us on WhatsApp
            </motion.a>
          </motion.div>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: easeLux }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl border border-charcoal/5 bg-cream/50 p-5 shadow-sm sm:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: easeLux }}
                    className="flex min-h-[430px] flex-col items-center justify-center px-4 py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, ease: easeLux }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-cream shadow-soft"
                    >
                      <HiCheckCircle size={32} />
                    </motion.div>

                    <h2 className="mt-6 font-display text-2xl text-burgundy sm:text-3xl">
                      Enquiry Sent Successfully
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal-soft/80">
                      Thank you for contacting Zahid Decor & Flowers. We have
                      received your enquiry and our team will contact you
                      shortly.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn-outline mt-7"
                    >
                      Send Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Error */}

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name + Phone */}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-charcoal"
                        >
                          Full Name *
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          minLength={3}
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          autoComplete="name"
                          className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-charcoal"
                        >
                          Pakistan Mobile Number *
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="03001234567"
                          inputMode="numeric"
                          maxLength={11}
                          pattern="03[0-9]{9}"
                          autoComplete="tel"
                          className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                        />
                      </div>
                    </div>

                    {/* Email */}

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Email Address *
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Occasion */}

                    <div>
                      <label
                        htmlFor="occasion"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Occasion *
                      </label>

                      <select
                        id="occasion"
                        name="occasion"
                        required
                        value={form.occasion}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                      >
                        <option value="">Select an occasion</option>
                        <option value="Wedding Decoration">
                          Wedding Decoration
                        </option>
                        <option value="Nikah Decoration">
                          Nikah Decoration
                        </option>
                        <option value="Bridal Flowers">Bridal Flowers</option>
                        <option value="Birthday Decoration">
                          Birthday Decoration
                        </option>
                        <option value="Event Decoration">
                          Event Decoration
                        </option>
                        <option value="Gift Bouquet / Hamper">
                          Gift Bouquet / Hamper
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Location */}

                    <div>
                      <label
                        htmlFor="location"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Event Location *
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        minLength={3}
                        value={form.location}
                        onChange={handleChange}
                        placeholder="e.g. Lahore, DHA Phase 5"
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Date */}

                    <div>
                      <label
                        htmlFor="date"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Event Date *
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={form.date}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Message */}

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-charcoal"
                      >
                        Tell Us More *
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Share your requirements, theme, colours, guest count or anything else..."
                        className="w-full resize-none rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm leading-relaxed text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Submit */}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending Enquiry...
                        </>
                      ) : (
                        <>
                          Send Enquiry
                          <HiArrowUpRight size={18} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[11px] leading-relaxed text-charcoal-soft/55">
                      By submitting this form, you agree that Zahid Decor &
                      Flowers may contact you regarding your enquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            MAP
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeLux }}
          className="container-x mx-auto mt-12 px-4 sm:mt-16 sm:px-6"
        >
          <div className="h-72 overflow-hidden rounded-3xl bg-cream shadow-card sm:h-96">
            <iframe
              title="Zahid Decor and Flowers location map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2946.971236799449!2d74.28825255970551!3d31.530164941881562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDMxJzUyLjMiTiA3NMKwMTcnMTcuNyJF!5e0!3m2!1sen!2s!4v1787105240612!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
