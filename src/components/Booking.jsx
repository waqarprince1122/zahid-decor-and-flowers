import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiArrowUpRight,
  HiCheck,
  HiChevronDown,
  HiMagnifyingGlass,
  HiMapPin,
  HiXMark,
} from "react-icons/hi2";
import emailjs from "@emailjs/browser";

const easeLux = [0.16, 1, 0.3, 1];

const EMAILJS_TEMPLATE_ID = "template_rpjorqr";
const EMAILJS_SERVICE_ID = "service_n5lncob";
const EMAILJS_PUBLIC_KEY = "QC40RnRInkpcvxVe6";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  location: "",
  date: "",
  time: "",
  requirements: "",
};

const lahoreAreas = [
  "All Lahore Areas",
  "DHA Lahore",
  "Gulberg",
  "Model Town",
  "Johar Town",
  "Bahria Town Lahore",
  "Wapda Town",
  "Garden Town",
  "Faisal Town",
  "Township",
  "Cantt Lahore",
  "Askari",
  "Valencia Town",
  "Lake City",
  "Iqbal Town",
  "Muslim Town",
  "Sabzazar",
  "Samanabad",
  "Shadman",
  "Gulshan-e-Ravi",
  "Green Town",
  "PIA Housing Scheme",
  "Pak Arab Housing Society",
  "Cavalry Ground",
  "Bedian Road",
  "DHA Phase 1",
  "DHA Phase 2",
  "DHA Phase 3",
  "DHA Phase 4",
  "DHA Phase 5",
  "DHA Phase 6",
  "DHA Phase 7",
  "DHA Phase 8",
  "Bahria Orchard",
  "Bahria Nasheman",
  "Paragon City",
  "Askari 10",
  "Askari 11",
  "Other Lahore Area",
];

export default function Booking({ service, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [detectingLocation, setDetectingLocation] = useState(false);

  const locationRef = useRef(null);
  const modalContentRef = useRef(null);

  /*
  =====================================================
  BODY SCROLL LOCK
  =====================================================
  */
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

  /*
  =====================================================
  ESCAPE KEY + OUTSIDE LOCATION CLICK
  =====================================================
  */
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [service]);

  /*
  =====================================================
  FILTER LAHORE AREAS
  =====================================================
  */
  const filteredAreas = useMemo(() => {
    const search = locationSearch.trim().toLowerCase();

    if (!search) return lahoreAreas;

    return lahoreAreas.filter((area) => area.toLowerCase().includes(search));
  }, [locationSearch]);

  /*
  =====================================================
  FORM CHANGE
  =====================================================
  */
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

      setFormData((previous) => ({
        ...previous,
        phone: onlyNumbers,
      }));
    } else {
      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));
    }

    setError("");

    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /*
  =====================================================
  SELECT LOCATION
  =====================================================
  */
  const selectLocation = (area) => {
    setFormData((previous) => ({
      ...previous,
      location: area,
    }));

    setLocationSearch("");
    setLocationOpen(false);
    setError("");

    setFieldErrors((previous) => ({
      ...previous,
      location: "",
    }));
  };

  /*
  =====================================================
  VALIDATION
  =====================================================
  */
  const validateForm = () => {
    const errors = {};

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();

    if (name.length < 3) {
      errors.name = "Please enter your full name.";
    }

    if (!/^03\d{9}$/.test(phone)) {
      errors.phone = "Enter a valid mobile number, e.g. 03001234567.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.location) {
      errors.location = "Please select your Lahore delivery area.";
    }

    if (!formData.date) {
      errors.date = "Please select your event date.";
    }

    if (!formData.time) {
      errors.time = "Please select your event time.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return "Please check the highlighted fields.";
    }

    return "";
  };

  /*
  =====================================================
  CURRENT DATE
  =====================================================
  */
  const today = new Date().toISOString().split("T")[0];

  /*
  =====================================================
  DETECT USER LOCATION
  =====================================================
  */
  const detectUserLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError(
        "Location detection is not supported by your browser. Please select your Lahore area manually.",
      );
      return;
    }

    setDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error("Location lookup failed");
          }

          const data = await response.json();
          const address = data?.address || {};

          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.city_district ||
            "";

          const detectedArea =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.quarter ||
            "";

          const cityText = city.toLowerCase();
          const displayName = data?.display_name?.toLowerCase() || "";

          const isLahore =
            cityText.includes("lahore") || displayName.includes("lahore");

          if (!isLahore) {
            setError(
              "Our home delivery service is currently available in Lahore only.",
            );

            setFieldErrors((previous) => ({
              ...previous,
              location: "Lahore delivery only.",
            }));

            return;
          }

          const detectedText = detectedArea.toLowerCase();

          const matchedArea = lahoreAreas.find((area) => {
            const cleanArea = area.toLowerCase().replace(" lahore", "").trim();

            if (
              !cleanArea ||
              cleanArea === "all lahore areas" ||
              cleanArea === "other lahore area"
            ) {
              return false;
            }

            return (
              detectedText.includes(cleanArea) ||
              cleanArea.includes(detectedText)
            );
          });

          if (matchedArea) {
            selectLocation(matchedArea);
          } else if (detectedArea) {
            selectLocation(`${detectedArea} — Lahore`);
          } else {
            selectLocation("All Lahore Areas");
          }
        } catch (locationError) {
          console.error(locationError);

          setError(
            "We couldn't detect your area automatically. Please select your Lahore area from the list.",
          );
        } finally {
          setDetectingLocation(false);
        }
      },
      (locationError) => {
        console.error(locationError);

        let message =
          "Location permission was not available. Please select your Lahore area manually.";

        if (locationError.code === 1) {
          message =
            "Please allow location access, or select your Lahore area manually.";
        }

        if (locationError.code === 2) {
          message =
            "Your location could not be detected. Please select your Lahore area manually.";
        }

        if (locationError.code === 3) {
          message =
            "Location detection timed out. Please select your Lahore area manually.";
        }

        setError(message);
        setDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  /*
  =====================================================
  SUBMIT BOOKING
  =====================================================
  */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      setTimeout(() => {
        const firstError = Object.keys(validateForm ? fieldErrors : {})[0];

        if (firstError) {
          document.getElementById(`booking-${firstError}`)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);

      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        service_name: service?.title || "Custom Flower Service",

        customer_name: formData.name.trim(),

        customer_phone: formData.phone.trim(),

        customer_email: formData.email.trim(),

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
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setSubmitted(true);

      if (modalContentRef.current) {
        modalContentRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (submitError) {
      console.error("EmailJS Error:", submitError);

      setError(
        "Sorry, your booking request could not be sent. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
  =====================================================
  CLOSE MODAL
  =====================================================
  */
  const handleClose = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setError("");
    setFieldErrors({});
    setLocationSearch("");
    setLocationOpen(false);
    setIsSubmitting(false);
    setDetectingLocation(false);

    onClose();
  };

  if (!service) return null;

  /*
  =====================================================
  FIELD ERROR
  =====================================================
  */
  const FieldError = ({ message }) => {
    if (!message) return null;

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: -4,
          height: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
          height: "auto",
        }}
        exit={{
          opacity: 0,
          y: -4,
          height: 0,
        }}
        className="overflow-hidden"
      >
        <p className="mt-1 text-[10px] font-medium text-red-600">{message}</p>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleClose();
          }
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2f2a2a]/70 p-2 backdrop-blur-md sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        {/* MODAL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            duration: 0.4,
            ease: easeLux,
          }}
          className="relative flex max-h-[96vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[#fffaf7] shadow-2xl sm:max-h-[92vh] sm:rounded-3xl"
        >
          {/* HEADER */}
          <div className="relative shrink-0 border-b border-[#2f2a2a]/10 bg-gradient-to-br from-[#fff5ef] via-[#fffaf7] to-[#f8e9e9] px-4 py-4 sm:px-7 sm:py-5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#b86f76]/10 blur-3xl" />

            {/* CLOSE */}
            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close booking form"
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#2f2a2a] shadow-sm backdrop-blur-md transition-colors duration-300 hover:bg-[#b86f76] hover:text-white sm:right-4 sm:top-4"
            >
              <HiXMark size={18} />
            </motion.button>

            {/* HEADING */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#b86f76]">
                Zahid Decor & Flowers
              </p>

              <h2
                id="booking-title"
                className="pr-10 font-serif text-2xl text-[#7f2436] sm:text-3xl"
              >
                Book Your Service
              </h2>
            </motion.div>

            {/* SELECTED SERVICE */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.08,
              }}
              className="mt-3 flex items-center gap-3 rounded-xl border border-[#7f2436]/10 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm"
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#a97838]">
                  Selected Service
                </p>

                <h3 className="truncate font-serif text-sm text-[#2f2a2a] sm:text-base">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          </div>

          {/* CONTENT */}
          <div
            ref={modalContentRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-7 sm:py-5"
          >
            <AnimatePresence mode="wait">
              {/* SUCCESS */}
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: easeLux,
                  }}
                  className="flex min-h-[320px] flex-col items-center justify-center px-2 py-8 text-center"
                >
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -20,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: easeLux,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7f2436] text-white shadow-lg"
                  >
                    <HiCheck size={30} />
                  </motion.div>

                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ delay: 0.2 }}
                    className="mt-5 font-serif text-3xl text-[#7f2436]"
                  >
                    Thank You!
                  </motion.h3>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 max-w-sm text-sm leading-relaxed text-[#2f2a2a]/70"
                  >
                    Thank you{" "}
                    <strong className="text-[#2f2a2a]">{formData.name}</strong>
                    .
                    <br />
                    Your booking request for{" "}
                    <strong className="text-[#7f2436]">
                      {service.title}
                    </strong>{" "}
                    has been received successfully.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-xs text-[#2f2a2a]/50"
                  >
                    Our team will contact you shortly.
                  </motion.p>

                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7f2436] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-[#6e1f2f]"
                  >
                    Done
                    <HiArrowUpRight size={17} />
                  </motion.button>
                </motion.div>
              ) : (
                /* FORM */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-3"
                >
                  {/* GENERAL ERROR */}
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
                        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] text-red-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                            !
                          </span>

                          <span>{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* NAME + PHONE */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
                      >
                        Full Name *
                      </label>

                      <input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all placeholder:text-[#2f2a2a]/35 focus:-translate-y-[1px] focus:ring-4 sm:text-sm ${
                          fieldErrors.name
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#2f2a2a]/10 focus:border-[#b86f76]/60 focus:ring-[#b86f76]/10"
                        }`}
                      />

                      <AnimatePresence>
                        <FieldError message={fieldErrors.name} />
                      </AnimatePresence>
                    </div>

                    {/* PHONE */}
                    <div>
                      <label
                        htmlFor="booking-phone"
                        className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
                      >
                        Mobile Number *
                      </label>

                      <input
                        id="booking-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="03001234567"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={11}
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all placeholder:text-[#2f2a2a]/35 focus:-translate-y-[1px] focus:ring-4 sm:text-sm ${
                          fieldErrors.phone
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#2f2a2a]/10 focus:border-[#b86f76]/60 focus:ring-[#b86f76]/10"
                        }`}
                      />

                      <AnimatePresence>
                        <FieldError message={fieldErrors.phone} />
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* EMAIL + LOCATION */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* EMAIL */}
                    <div>
                      <label
                        htmlFor="booking-email"
                        className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
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
                        autoComplete="email"
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all placeholder:text-[#2f2a2a]/35 focus:-translate-y-[1px] focus:ring-4 sm:text-sm ${
                          fieldErrors.email
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#2f2a2a]/10 focus:border-[#b86f76]/60 focus:ring-[#b86f76]/10"
                        }`}
                      />

                      <AnimatePresence>
                        <FieldError message={fieldErrors.email} />
                      </AnimatePresence>
                    </div>

                    {/* LOCATION */}
                    <div
                      ref={locationRef}
                      id="booking-location"
                      className="relative"
                    >
                      <label className="mb-1 block text-[11px] font-medium text-[#2f2a2a]">
                        Delivery Area *
                      </label>

                      <button
                        type="button"
                        onClick={() => setLocationOpen((previous) => !previous)}
                        className={`flex w-full items-center justify-between rounded-xl border bg-white px-3 py-2.5 text-left text-xs outline-none transition-all sm:text-sm ${
                          fieldErrors.location
                            ? "border-red-300"
                            : locationOpen
                              ? "border-[#b86f76]/60 ring-4 ring-[#b86f76]/10"
                              : "border-[#2f2a2a]/10"
                        }`}
                      >
                        <span
                          className={
                            formData.location
                              ? "text-[#2f2a2a]"
                              : "text-[#2f2a2a]/35"
                          }
                        >
                          {formData.location || "Select Lahore area"}
                        </span>

                        <HiChevronDown
                          size={17}
                          className={`shrink-0 text-[#7f2436] transition-transform duration-300 ${
                            locationOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {locationOpen && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              y: -6,
                              scale: 0.98,
                            }}
                            animate={{
                              opacity: 1,
                              y: 4,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              y: -5,
                              scale: 0.98,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-xl border border-[#2f2a2a]/10 bg-white p-2 shadow-xl"
                          >
                            {/* SEARCH */}
                            <div className="relative">
                              <HiMagnifyingGlass
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2f2a2a]/40"
                              />

                              <input
                                type="text"
                                value={locationSearch}
                                onChange={(event) =>
                                  setLocationSearch(event.target.value)
                                }
                                autoFocus
                                placeholder="Search Lahore area..."
                                className="w-full rounded-lg border border-[#2f2a2a]/10 bg-[#fffaf7] py-2 pl-9 pr-3 text-xs text-[#2f2a2a] outline-none focus:border-[#b86f76]/50 focus:ring-2 focus:ring-[#b86f76]/10"
                              />
                            </div>

                            {/* CURRENT LOCATION */}
                            <button
                              type="button"
                              onClick={detectUserLocation}
                              disabled={detectingLocation}
                              className="mt-2 flex w-full items-center gap-2 rounded-lg bg-[#fff0f0] px-3 py-2.5 text-left text-xs font-medium text-[#7f2436] transition-all hover:bg-[#f8e0e2] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {detectingLocation ? (
                                <>
                                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#7f2436] border-t-transparent" />
                                  Detecting your location...
                                </>
                              ) : (
                                <>
                                  <HiMapPin size={16} />
                                  Use My Current Location
                                </>
                              )}
                            </button>

                            <div className="my-2 border-t border-[#2f2a2a]/10" />

                            <p className="px-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a97838]">
                              Lahore Delivery Areas
                            </p>

                            {/* AREAS */}
                            <div className="max-h-48 overflow-y-auto pr-1">
                              {filteredAreas.length > 0 ? (
                                filteredAreas.map((area) => (
                                  <button
                                    type="button"
                                    key={area}
                                    onClick={() => selectLocation(area)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                                      formData.location === area
                                        ? "bg-[#7f2436] text-white"
                                        : "text-[#2f2a2a] hover:bg-[#fff0f0]"
                                    }`}
                                  >
                                    <span>{area}</span>

                                    {formData.location === area && (
                                      <HiCheck size={15} />
                                    )}
                                  </button>
                                ))
                              ) : (
                                <div className="px-3 py-4 text-center text-xs text-[#2f2a2a]/50">
                                  No Lahore area found.
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        <FieldError message={fieldErrors.location} />
                      </AnimatePresence>

                      <p className="mt-1 text-[9px] text-[#7f2436]/60">
                        Home delivery is available in Lahore only.
                      </p>
                    </div>
                  </div>

                  {/* DATE + TIME */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* DATE */}
                    <div>
                      <label
                        htmlFor="booking-date"
                        className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
                      >
                        Event Date *
                      </label>

                      <input
                        id="booking-date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all focus:-translate-y-[1px] focus:ring-4 sm:text-sm ${
                          fieldErrors.date
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#2f2a2a]/10 focus:border-[#b86f76]/60 focus:ring-[#b86f76]/10"
                        }`}
                      />

                      <AnimatePresence>
                        <FieldError message={fieldErrors.date} />
                      </AnimatePresence>
                    </div>

                    {/* TIME */}
                    <div>
                      <label
                        htmlFor="booking-time"
                        className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
                      >
                        Event Time *
                      </label>

                      <input
                        id="booking-time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all focus:-translate-y-[1px] focus:ring-4 sm:text-sm ${
                          fieldErrors.time
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-[#2f2a2a]/10 focus:border-[#b86f76]/60 focus:ring-[#b86f76]/10"
                        }`}
                      />

                      <AnimatePresence>
                        <FieldError message={fieldErrors.time} />
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* REQUIREMENTS */}
                  <div>
                    <label
                      htmlFor="booking-requirements"
                      className="mb-1 block text-[11px] font-medium text-[#2f2a2a]"
                    >
                      Additional Requirements{" "}
                      <span className="text-[10px] text-[#2f2a2a]/40">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="booking-requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Theme, colours, guest count or special requirements..."
                      className="w-full resize-none rounded-xl border border-[#2f2a2a]/10 bg-white px-3 py-2.5 text-xs text-[#2f2a2a] outline-none transition-all placeholder:text-[#2f2a2a]/35 focus:-translate-y-[1px] focus:border-[#b86f76]/60 focus:ring-4 focus:ring-[#b86f76]/10 sm:text-sm"
                    />
                  </div>

                  {/* SUBMIT */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7f2436] px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#6e1f2f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Submit Booking Request
                        <HiArrowUpRight size={17} />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[9px] leading-relaxed text-[#2f2a2a]/45">
                    Your information will only be used to process your booking
                    request.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
