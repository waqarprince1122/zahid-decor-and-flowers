import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUpRight, HiXMark } from "react-icons/hi2";
import emailjs from "@emailjs/browser";

const easeLux = [0.16, 1, 0.3, 1];

const EMAILJS_TEMPLATE_ID = "template_rpjorqr";
const EMAILJS_SERVICE_ID = "service_n5lncob";
const EMAILJS_PUBLIC_KEY = "QC40RnRInkpcvxVe6";

const ease = [0.16, 1, 0.3, 1];

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  location: "",
  date: "",
  time: "",
  requirements: "",
};

export default function Booking({ service, onClose }) {
  const [formData, setFormData] = useState(initialFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!service) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [service]);



  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service]);

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Phone: only numbers + maximum 11 digits
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

      setFormData((previous) => ({
        ...previous,
        phone: onlyNumbers,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const location = formData.location.trim();

    // Name minimum 3 characters
    if (name.length < 3) {
      return "Please enter your full name (minimum 3 characters).";
    }

    // Pakistan phone number
    if (!/^03\d{9}$/.test(phone)) {
      return "Please enter a valid Pakistan mobile number, e.g. 03001234567.";
    }

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    // Location
    if (location.length < 3) {
      return "Please enter your event location.";
    }

    // Date
    if (!formData.date) {
      return "Please select your event date.";
    }

    // Time
    if (!formData.time) {
      return "Please select your event time.";
    }

    return "";
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        service_name: service?.title || "Custom Service",
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email,
        event_location: formData.location,
        event_date: formData.date,
        event_time: formData.time,
        requirements:
          formData.requirements.trim() || "No additional requirements.",
        submitted_at: new Date().toLocaleString("en-PK"),
      };
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);
    } catch (submitError) {
      console.error("EmailJS Error:", submitError);

      setError(
        "Sorry, your request could not be sent right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setError("");
    setIsSubmitting(false);

    onClose();
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 p-3 backdrop-blur-md sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            transition={{
              duration: 0.45,
              ease,
            }}
            className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-ivory shadow-2xl sm:rounded-3xl"
          >
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative shrink-0 overflow-hidden border-b border-charcoal/10 bg-gradient-to-br from-cream via-ivory to-rose/10 px-5 py-5 sm:px-8 sm:py-7">
              {/* Decorative background */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-rose/10 blur-3xl" />

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close booking form"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-charcoal shadow-sm backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-burgundy hover:text-cream sm:right-5 sm:top-5"
              >
                <HiXMark size={20} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <p className="eyebrow mb-2">Zahid Decor & Flowers</p>

                <h2
                  id="booking-title"
                  className="pr-12 font-display text-2xl text-burgundy sm:text-3xl"
                >
                  Book Your Service
                </h2>

               
              </motion.div>

              {/* Selected Service */}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.12,
                }}
                className="mt-5 flex items-center gap-3 rounded-xl border border-burgundy/10 bg-white/75 p-3 shadow-sm backdrop-blur-sm"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gold-dark">
                    Selected Service
                  </p>

                  <h3 className="truncate font-display text-base text-charcoal sm:text-lg">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            </div>

            {/* =================================================
                FORM AREA
            ================================================= */}

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-7">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* =================================================
                     SUCCESS
                  ================================================= */

                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.4,
                      ease,
                    }}
                    className="flex min-h-[350px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-cream shadow-soft"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12.5l4.5 4.5L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="mt-5 font-display text-2xl text-burgundy sm:text-3xl">
                      Booking Request Sent
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-soft/75">
                      Thank you, {formData.name}. Your request for{" "}
                      <strong>{service.title}</strong> has been received. Our
                      team will contact you shortly.
                    </p>

                    <motion.button
                      type="button"
                      onClick={handleClose}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary mt-7"
                    >
                      Done
                      <HiArrowUpRight />
                    </motion.button>
                  </motion.div>
                ) : (
                  /* =================================================
                     FORM
                  ================================================= */

                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Error */}

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            height: 0,
                            y: -5,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            y: -5,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name */}

                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                      >
                        Full Name *
                      </label>

                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        minLength={3}
                        autoComplete="name"
                        className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                      />

                      <p className="mt-1 text-[10px] text-charcoal-soft/50">
                        Minimum 3 characters
                      </p>
                    </div>

                    {/* Phone + Email */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                        >
                          Pakistan Mobile Number *
                        </label>

                        <input
                          id="booking-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="03001234567"
                          required
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={11}
                          pattern="03[0-9]{9}"
                          className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                        />

                        <p className="mt-1 text-[10px] text-charcoal-soft/50">
                          11 digits — e.g. 03001234567
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="booking-email"
                          className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                        >
                          Email Address *
                        </label>

                        <input
                          id="booking-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                          className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                        />
                      </div>
                    </div>

                    {/* Location */}

                    <div>
                      <label
                        htmlFor="booking-location"
                        className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                      >
                        Event Location *
                      </label>

                      <input
                        id="booking-location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Lahore, DHA Phase 5"
                        required
                        minLength={3}
                        autoComplete="street-address"
                        className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Date + Time */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                        >
                          Event Date *
                        </label>

                        <input
                          id="booking-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="booking-time"
                          className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                        >
                          Event Time *
                        </label>

                        <input
                          id="booking-time"
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-all duration-300 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                        />
                      </div>
                    </div>

                    {/* Requirements */}

                    <div>
                      <label
                        htmlFor="booking-requirements"
                        className="mb-1.5 block text-xs font-medium tracking-wide text-charcoal"
                      >
                        Additional Requirements
                      </label>

                      <textarea
                        id="booking-requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your event, theme, colours, guest count or special requirements..."
                        className="w-full resize-none rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm leading-relaxed text-charcoal outline-none transition-all duration-300 placeholder:text-charcoal-soft/45 focus:border-burgundy/50 focus:ring-2 focus:ring-burgundy/10"
                      />
                    </div>

                    {/* Submit */}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="btn-primary mt-2 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Submit Booking Request
                          <HiArrowUpRight />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-[11px] leading-relaxed text-charcoal-soft/55">
                      By submitting this form, you agree that Zahid Decor &
                      Flowers may contact you regarding your booking request.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
