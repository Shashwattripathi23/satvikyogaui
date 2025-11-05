import logo from "./assets/newlogo.png";
import yoga1 from "./assets/yoga1.jpg";
import yoga2 from "./assets/yoga2.png";
import drycupping from "./assets/drycupping.png";
import kativasti from "./assets/kativasti.png";
import Shankhaprakshalan from "./assets/Shankhaprakshalan.png";
import tratakkriya from "./assets/TratakKriya.png";
import jalneti from "./assets/JalNeti.png";
import hathayoga from "./assets/hathayoga.png";
import ashtangayoga from "./assets/ashtangayoga.png";
import coupleyoga from "./assets/coupleyoga.png";
import senioryoga from "./assets/senioryoga.png";
import mantrajapa from "./assets/mantrajapa.png";
import logo3 from "./assets/logo6.png";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/600.css";
import "@fontsource/lora/700.css";
import "@fontsource/dancing-script/400.css";
import "@fontsource/dancing-script/500.css";
import "@fontsource/dancing-script/600.css";
import "@fontsource/dancing-script/700.css";
import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaSpa,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedSpecialService, setSelectedSpecialService] = useState(0);
  const [scrollElements, setScrollElements] = useState([]);
  const [selectedService, setSelectedService] = useState(0);
  const serviceTabsRef = useRef(null);
  const specialServiceTabsRef = useRef(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  // Loader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use /api/send-email for both local and Vercel deployment
      const apiUrl = process.env.REACT_APP_API_URL || "/api/send-email";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactFormData),
      });

      const data = await response.json();

      if (data.success) {
        setShowContactPopup(true);
        setContactFormData({
          name: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        });
        setTimeout(() => setShowContactPopup(false), 4000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "special-services",
        "reviews",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Animation Effect
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate visibility percentage
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.height;
        const visibilityRatio = Math.max(
          0,
          Math.min(1, visibleHeight / elementHeight)
        );

        // Calculate opacity and transform based on visibility
        let opacity = 0;
        let translateY = 50;

        if (visibilityRatio > 0.1) {
          opacity = Math.min(1, visibilityRatio * 1.5);
          translateY = 50 * (1 - visibilityRatio);
        }

        element.style.opacity = opacity;
        element.style.transform = `translateY(${translateY}px)`;
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      rootMargin: "-50px 0px -50px 0px",
    });

    // Observe all scroll-animate elements
    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => {
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleNavClick = (href) => {
    if (isMobile) setIsNavExpanded(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navItems = [
    { icon: <FaHome />, label: "Home", href: "#home" },
    { icon: <GiMeditation />, label: "Services", href: "#services" },
    { icon: <FaSpa />, label: "Special Services", href: "#special-services" },
    { icon: <FaStar />, label: "Reviews", href: "#reviews" },
    { icon: <FaPhone />, label: "Contact Us", href: "#contact" },
    { icon: <FaMapMarkerAlt />, label: "Location", href: "#location" },
  ];

  const services = [
    {
      name: "Hatha Yoga",
      shortDesc: "Classical practice focusing on harmony between body and mind",
      fullDesc:
        "Hatha Yoga is a classical and grounding practice that focuses on harmony between body and mind. It combines physical postures (asanas), breathing techniques (pranayama), and relaxation to build strength, flexibility, and awareness. In my Hatha classes, we move with intention — exploring alignment, balance, and going deeper into each asana. It's an ideal practice for anyone seeking to reconnect with their body and find calm within movement.",
      icon: "",
      duration: "60 mins",
      image: hathayoga,
      schedule: ["Tuesday: 19:00-20:00 hrs", "Sunday: 19:00-20:00 hrs"],
      benefits: [
        "Builds strength and flexibility",
        "Improves body alignment",
        "Reduces stress and anxiety",
        "Enhances mind-body connection",
      ],
    },
    {
      name: "Ashtanga Yoga",
      shortDesc: "Dynamic practice synchronizing breath with flowing sequences",
      fullDesc:
        "Ashtanga Yoga is a dynamic and disciplined practice that synchronizes breath with a flowing sequence of postures. It follows a structured series that builds heat, strength, and focus while deepening the connection between body and mind. My classes guide you through mindful movement and conscious breathing — cultivating endurance, clarity, and a meditative rhythm that continues beyond the mat.",
      icon: "",
      duration: "75 mins",
      image: ashtangayoga,
      schedule: ["Upcoming Lessons"],
      benefits: [
        "Builds heat and stamina",
        "Increases focus and discipline",
        "Strengthens entire body",
        "Cultivates meditative flow",
      ],
    },
    {
      name: "Couple / Partner Yoga",
      shortDesc:
        "Connecting practice bringing two people together through movement",
      fullDesc:
        "Couple or Partner Yoga is a joyful and connecting practice that brings two people together through movement, breath, and awareness. It focuses on building trust, communication, and balance — both physical and emotional — as partners support and mirror each other in shared postures. Whether practiced with a partner, friend, or loved one, this practice deepens connection, enhances flexibility and strength, and invites a sense of harmony and togetherness on and off the mat.",
      icon: "",
      duration: "90 mins",
      image: coupleyoga,
      schedule: ["Upcoming Lessons"],
      benefits: [
        "Builds trust and communication",
        "Deepens relationships",
        "Enhances flexibility together",
        "Creates shared experience",
      ],
    },
    {
      name: "Yoga for Seniors",
      shortDesc:
        "Gentle practice supporting strength, flexibility, and balance",
      fullDesc:
        "Yoga for Seniors is a gentle and nurturing practice designed to support strength, flexibility, and balance at every stage of life. The classes focus on safe and accessible movements, mindful breathing, and relaxation, helping to ease stiffness, boost energy, and promote overall well-being. Beyond physical benefits, it's a space to connect with your body, cultivate awareness, and enjoy a sense of calm, confidence, and vitality in a supportive and welcoming environment.",
      icon: "",
      duration: "60 mins",
      image: senioryoga,
      schedule: ["Upcoming Lessons"],
      benefits: [
        "Improves balance and mobility",
        "Eases joint stiffness",
        "Boosts energy levels",
        "Safe and accessible movements",
      ],
    },
    {
      name: "Mantra Japa",
      shortDesc: "Meditative repetition of sacred sounds for inner stillness",
      fullDesc:
        "Mantra Japa is the meditative repetition of a sacred sound or phrase, traditionally in Sanskrit, used to focus the mind and awaken inner stillness. The rhythmic repetition of a mantra helps calm the mind, balance energy, and deepen awareness. Each mantra carries a unique intention and healing vibration, guiding you toward peace, clarity, and a deeper connection with your inner self.",
      icon: "",
      duration: "45 mins",
      image: mantrajapa,
      schedule: ["Upcoming Lessons"],
      benefits: [
        "Calms the mind",
        "Balances energy",
        "Deepens awareness",
        "Promotes inner peace",
      ],
    },
  ];

  const specialServices = [
    {
      name: "Dry Cupping Therapy",
      icon: "",
      shortDesc:
        "Ancient healing technique to improve blood circulation and release muscle tension",
      fullDesc:
        "Dry cupping therapy is an ancient healing practice that uses suction cups placed on the skin to increase blood flow, reduce inflammation, and promote healing. This non-invasive technique helps release muscle tension, improve circulation, and support the body's natural detoxification process. Ideal for those experiencing chronic pain, muscle stiffness, or sports injuries.",
      image: drycupping,
      benefits: [
        "Improves blood circulation",
        "Releases muscle tension",
        "Reduces inflammation",
        "Promotes healing",
      ],
    },
    {
      name: "Kati Vasti",
      icon: "",
      shortDesc:
        "Oil therapy for back pain relief and strengthening the lower back region",
      fullDesc:
        "Kati Vasti is a traditional Ayurvedic treatment that involves creating a reservoir of warm medicated oil on the lower back. This therapeutic technique provides deep relief from lower back pain, sciatica, and spinal disorders. The warm oil penetrates deep into the tissues, nourishing and strengthening the lumbar region while promoting flexibility and healing.",
      image: kativasti,
      benefits: [
        "Relieves lower back pain",
        "Strengthens spine",
        "Reduces stiffness",
        "Improves flexibility",
      ],
    },
    {
      name: "Shankhaprakshalan",
      icon: "",
      shortDesc:
        "Complete digestive system cleansing practice for internal purification",
      fullDesc:
        "Shankhaprakshalan is a powerful yogic cleansing technique that completely purifies the entire digestive tract from mouth to elimination. This practice involves drinking salt water and performing specific asanas to flush the system. It's excellent for detoxification, improving digestion, and resetting the body's natural balance. Performed under expert guidance for maximum safety and benefit.",
      image: Shankhaprakshalan,
      benefits: [
        "Complete digestive cleanse",
        "Detoxifies the body",
        "Improves metabolism",
        "Enhances nutrient absorption",
      ],
    },
    {
      name: "Tratak Kriya",
      icon: "",
      shortDesc:
        "Concentration technique to improve focus, eye health, and mental clarity",
      fullDesc:
        "Tratak is a powerful meditation and purification technique that involves steady gazing at a fixed point or candle flame. This practice strengthens eye muscles, improves concentration, enhances memory, and calms the mind. Regular practice of Tratak can help reduce mental stress, improve vision, and develop deep meditative states. It's particularly beneficial for students and professionals requiring high mental focus.",
      image: tratakkriya,
      benefits: [
        "Improves concentration",
        "Strengthens eyesight",
        "Calms the mind",
        "Enhances memory",
      ],
    },
    {
      name: "Jal Neti",
      icon: "",
      shortDesc:
        "Nasal cleansing practice to improve breathing and prevent respiratory issues",
      fullDesc:
        "Jal Neti is a gentle nasal irrigation technique using a specially designed pot (neti pot) filled with saline water. This practice cleanses the nasal passages, removes allergens and pollutants, and helps prevent sinus infections and respiratory issues. Regular practice improves breathing, reduces allergies, and enhances overall respiratory health. It's an essential practice for maintaining clear airways and preventing seasonal illnesses.",
      image: jalneti,
      benefits: [
        "Clears nasal passages",
        "Prevents sinus infections",
        "Reduces allergies",
        "Improves breathing",
      ],
    },
  ];

  const schedule = [
    {
      time: "7:00 AM",
      class: "Hatha Yoga",
      instructor: "Sarah M.",
      day: "Mon-Wed-Fri",
    },
    {
      time: "9:00 AM",
      class: "Vinyasa Flow",
      instructor: "David L.",
      day: "Tue-Thu",
    },
    {
      time: "6:00 PM",
      class: "Yin Yoga",
      instructor: "Lisa K.",
      day: "Mon-Wed",
    },
    {
      time: "7:30 PM",
      class: "Meditation",
      instructor: "Michael R.",
      day: "All Days",
    },
  ];

  const testimonials = [
    {
      name: "Emma Thompson",
      text: "Saatvik Yoga has transformed my life. The peaceful environment and expert instructors have helped me find inner balance.",
      rating: 5,
      age: 32,
    },
    {
      name: "James Wilson",
      text: "The meditation classes are exceptional. I've never felt more centered and focused in my daily life.",
      rating: 5,
      age: 45,
    },
    {
      name: "Maria Garcia",
      text: "Beautiful studio with amazing energy. The Vinyasa flow classes are challenging yet accessible for all levels.",
      rating: 5,
      age: 28,
    },
    {
      name: "Robert Chen",
      text: "As a senior, I appreciate the gentle approach and personalized attention. My flexibility and balance have improved tremendously.",
      rating: 5,
      age: 67,
    },
    {
      name: "Sarah Mitchell",
      text: "The Hatha Yoga classes are perfect for beginners. The instructor's guidance and patience made me feel comfortable from day one.",
      rating: 5,
      age: 36,
    },
  ];

  return (
    <>
      {/* Loader */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-almond-light to-almond-light z-[100] flex items-center justify-center transition-transform duration-1000 ${
          isLoading ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-matcha mt-6"
            style={{
              fontFamily: "'Cinzel Decorative', 'Playfair Display', serif",
            }}
          >
            Satvik Yoga Studio
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="bg-transparent min-h-screen scroll-smooth"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg px-4 md:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-4">
              <img
                src={logo3}
                className="h-8 md:h-12 w-auto"
                alt="Saatvik Yoga"
              />
              <h1
                className="text-lg  md:text-2xl text-matcha font-bold block"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Inter', sans-serif",
                }}
              >
                Satvik Yoga Studio
              </h1>
            </div>

            {/* Right Side - Navigation + Book Now */}
            <div className="flex items-center gap-6">
              {/* Navigation - Desktop */}
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center gap-2 transition-all duration-300 font-medium ${
                      activeSection === item.href.substring(1)
                        ? "text-matcha border-b-2 border-matcha"
                        : "text-gray-600 hover:text-pistache"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Book Now Button */}
              <button className="hidden lg:block bg-gradient-to-r from-matcha to-matcha text-white px-4 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                Book Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsNavExpanded(!isNavExpanded)}
                className="lg:hidden text-matcha text-2xl"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isNavExpanded && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className={`flex items-center gap-3 transition-all duration-300 font-medium w-full py-3 px-4 rounded-lg ${
                    activeSection === item.href.substring(1)
                      ? "text-matcha bg-almond"
                      : "text-gray-600 hover:text-pistache hover:bg-almond-light"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Page Content */}
        <div className="transition-all duration-300 pt-16 md:pt-20">
          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center relative -mt-16 md:-mt-20 pt-16 md:pt-20"
          >
            {/* Mobile Background Image */}
            <div
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${yoga1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-almond-light via-almond-light to-white"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight font-bold text-white md:text-carob"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    Find Your Inner Balance
                  </h2>
                  <p
                    className="text-lg md:text-xl lg:text-2xl mb-8 text-white md:text-matcha leading-relaxed"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Discover peace, strength, and mindfulness through authentic
                    yoga practices in our serene studio
                  </p>
                  <button className="bg-gradient-to-r from-matcha to-matcha text-white px-6 md:px-10 py-3 md:py-4 text-lg md:text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    Start Your Journey
                  </button>
                </div>

                {/* Image - Desktop only with curved frame */}
                <div className="hidden md:flex w-auto flex-1 justify-center md:justify-end relative">
                  <div className="relative w-full max-w-md md:max-w-lg">
                    <div
                      className="w-full aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl"
                      style={{
                        clipPath:
                          "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <img
                        src={yoga1}
                        alt="Yoga Practice"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Decorative Dots - Bottom Left */}

                    {/* Decorative element */}
                    <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-chai-light rounded-[3rem] opacity-40"></div>
                  </div>
                  <div className="absolute bottom-8 -right-24 flex flex-col gap-4 z-10">
                    <div className="w-8 h-8 rounded-full bg-[#809671] shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#8A96A0] shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#5B4232] shadow-lg"></div>
                    <div className="w-8 h-8 rounded-full bg-[#2B2B2B] shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-white via-almond-light to-white relative rounded-b-[100px]  ">
            <div className=" mx-auto px-4 md:px-8  border-black">
              <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div
                    className="w-16 h-1 bg-gradient-to-r from-transparent to-pistache"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3
                  className="text-3xl md:text-4xl lg:text-6xl text-center text-matcha font-bold"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  About Me
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1 bg-gradient-to-l from-transparent to-pistache"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                </div>
              </div>

              <div className="relative">
                {/* Mobile: Overlapping Image & Content */}
                <div className="md:hidden relative scroll-animate">
                  <div className="relative mb-8">
                    <img
                      src={yoga2}
                      alt="Meenakshi - Yoga Instructor"
                      className="w-full h-80 object-cover rounded-3xl shadow-xl"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-xl -mt-16 mx-4 relative z-10">
                    <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                      <p>
                        Hello and welcome! I'm{" "}
                        <span className="font-semibold text-matcha">
                          Meenakshi
                        </span>{" "}
                        — a RYT 500-hour certified yoga teacher whose journey
                        began in a completely different world: Electrical
                        Engineering. After earning my degree and working in a
                        structured, logic-driven field, I began to feel a quiet
                        pull toward something that spoke to my heart — something
                        more connected, balanced, and fulfilling.
                      </p>
                      <p>
                        Yoga entered my life as a way to find calm and clarity
                        amidst a busy routine, but over time it became so much
                        more. It opened a doorway to self-awareness, healing,
                        and a deeper connection with life itself. What started
                        as a personal exploration soon turned into a lifelong
                        calling.
                      </p>
                      {showFullAbout && (
                        <>
                          <p>
                            To understand yoga and the human body more deeply, I
                            trained in various forms of yoga — including Hatha,
                            Ashtanga, and restorative practices — each offering
                            its own wisdom about movement, breath, and
                            alignment. Along the way, I also trained in
                            Ayurvedic cleansing and healing practices, learning
                            how ancient wisdom supports the body's natural
                            balance and renewal.
                          </p>
                          <p>
                            Transitioning from engineering to yoga wasn't an
                            easy decision, but it was the most authentic one.
                            Today, I bring both structure and sensitivity into
                            my classes — creating a space where everyone,
                            regardless of experience, can move, breathe, and
                            reconnect with themselves on a deeper level.
                          </p>
                        </>
                      )}
                      <button
                        onClick={() => setShowFullAbout(!showFullAbout)}
                        className="bg-gradient-to-r from-matcha to-matcha text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg mt-4"
                      >
                        {showFullAbout ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Desktop: Image Left, Content Right */}
                <div className="hidden md:flex gap-8 items-center justify-between w-full pt-8">
                  <div className="w-2/5 relative flex justify-start scroll-animate">
                    <div className="relative w-full max-w-lg ml-24  border-black ">
                      {/* Decorative element (move this before image and use -z-10) */}
                      <div className="absolute -z-0 top-8 -left-8 w-full h-full bg-chai-light rounded-[3rem] opacity-40"></div>

                      {/* Color dots */}
                      <div className="absolute bottom-8 -left-24 flex flex-col gap-4 z-10">
                        <div className="w-8 h-8 rounded-full bg-[#F7C282] shadow-lg"></div>
                        <div className="w-8 h-8 rounded-full bg-[#8A96A0] shadow-lg"></div>
                        <div className="w-8 h-8 rounded-full bg-[#5B4232] shadow-lg"></div>
                        <div className="w-8 h-8 rounded-full bg-[#2B2B2B] shadow-lg"></div>
                      </div>

                      {/* Image */}
                      <div
                        className="w-full aspect-[3/4] rounded-[3rem] overflow-hidden relative z-10"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 85%)",
                          boxShadow:
                            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <img
                          src={yoga2}
                          alt="Meenakshi - Yoga Instructor"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-3/5 bg-white p-8 lg:p-12 rounded-3xl shadow-xl scroll-animate">
                    <div className="space-y-6 text-gray-700 leading-relaxed text-base lg:text-lg">
                      <p>
                        Hello and welcome! I'm{" "}
                        <span className="font-semibold text-matcha">
                          Meenakshi
                        </span>{" "}
                        — a RYT 500-hour certified yoga teacher whose journey
                        began in a completely different world: Electrical
                        Engineering. After earning my degree and working in a
                        structured, logic-driven field, I began to feel a quiet
                        pull toward something that spoke to my heart — something
                        more connected, balanced, and fulfilling.
                      </p>
                      <p>
                        Yoga entered my life as a way to find calm and clarity
                        amidst a busy routine, but over time it became so much
                        more. It opened a doorway to self-awareness, healing,
                        and a deeper connection with life itself. What started
                        as a personal exploration soon turned into a lifelong
                        calling.
                      </p>
                      <p>
                        To understand yoga and the human body more deeply, I
                        trained in various forms of yoga — including Hatha,
                        Ashtanga, and restorative practices — each offering its
                        own wisdom about movement, breath, and alignment. Along
                        the way, I also trained in Ayurvedic cleansing and
                        healing practices, learning how ancient wisdom supports
                        the body's natural balance and renewal.
                      </p>
                      <p>
                        Transitioning from engineering to yoga wasn't an easy
                        decision, but it was the most authentic one. Today, I
                        bring both structure and sensitivity into my classes —
                        creating a space where everyone, regardless of
                        experience, can move, breathe, and reconnect with
                        themselves on a deeper level.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section
            id="services"
            className="py-16 md:py-24 bg-gradient-to-b from-white via-almond-light to-white- relative pt-12 md:pt-10"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div
                    className="w-16 h-1 bg-gradient-to-r from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3
                  className="text-3xl md:text-4xl lg:text-6xl text-center text-matcha font-bold"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Our Services
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1 bg-gradient-to-l from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                </div>
              </div>

              {/* Container with Tabs and Content */}
              <div className="bg-gradient-to-br from-almond-light to-almond-light rounded-3xl shadow-2xl overflow-hidden max-w-7xl mx-auto scroll-animate">
                {/* Services Navigation Tabs - Inside Container */}
                <div className="bg-black/50 backdrop-blur-sm px-0 py-0 border-b border-matcha">
                  <div
                    ref={serviceTabsRef}
                    className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                  >
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedService(index);
                          if (serviceTabsRef.current && isMobile) {
                            const button =
                              serviceTabsRef.current.children[index];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className={`flex-shrink-0 md:flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-4 font-semibold transition-all duration-300 text-xs md:text-sm lg:text-base whitespace-nowrap border-r border-matcha last:border-r-0 ${
                          selectedService === index
                            ? "bg-gradient-to-r from-matcha to-matcha text-white shadow-lg"
                            : "bg-white text-matcha hover:bg-almond"
                        }`}
                      >
                        <span className="text-base md:text-lg lg:text-xl">
                          {service.icon}
                        </span>
                        <span>{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Service Detail with Transitions */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Image Section */}
                  <div className="lg:col-span-2 relative h-64 md:h-96 lg:h-full min-h-[400px] overflow-hidden">
                    <img
                      key={selectedService}
                      src={services[selectedService].image}
                      alt={services[selectedService].name}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                      style={{
                        animation: "fadeIn 0.5s ease-in-out",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-6xl md:text-7xl mb-2 animate-bounce-slow">
                        {services[selectedService].icon}
                      </div>
                    </div>

                    {/* Navigation Arrows - Mobile Only */}
                    <div className="lg:hidden absolute inset-0 flex items-center justify-between px-4">
                      <button
                        onClick={() => {
                          const newIndex =
                            selectedService === 0
                              ? services.length - 1
                              : selectedService - 1;
                          setSelectedService(newIndex);
                          if (serviceTabsRef.current) {
                            const button =
                              serviceTabsRef.current.children[newIndex];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className="bg-white/80 hover:bg-white text-matcha rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronLeft className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          const newIndex =
                            selectedService === services.length - 1
                              ? 0
                              : selectedService + 1;
                          setSelectedService(newIndex);
                          if (serviceTabsRef.current) {
                            const button =
                              serviceTabsRef.current.children[newIndex];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className="bg-white/80 hover:bg-white text-matcha rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronRight className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-3 p-6 md:p-8 lg:p-12 bg-white">
                    <div
                      key={`content-${selectedService}`}
                      className="transition-all duration-500 ease-in-out"
                      style={{
                        animation: "slideInRight 0.5s ease-in-out",
                      }}
                    >
                      <div className="flex items-center justify-between mb-4 md:mb-6">
                        <h4
                          className="text-2xl md:text-3xl lg:text-4xl text-matcha font-bold"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {services[selectedService].name}
                        </h4>
                        <span className="bg-matcha text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold whitespace-nowrap ml-4">
                          {services[selectedService].duration}
                        </span>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-lg">
                        {services[selectedService].fullDesc}
                      </p>

                      {/* Schedule */}
                      <div className="mb-6 bg-almond-light p-4 rounded-2xl border border-pistache">
                        <h5 className="text-base md:text-xl font-semibold text-matcha mb-3 flex items-center gap-2">
                          <FaCalendarAlt className="text-pistache" />
                          Class Schedule:
                        </h5>
                        <ul className="space-y-2">
                          {services[selectedService].schedule.map(
                            (time, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-gray-700 font-medium text-sm md:text-base"
                              >
                                <span className="text-pistache"></span>
                                <span>{time}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h5 className="text-base md:text-xl font-semibold text-matcha mb-4">
                          Key Benefits:
                        </h5>
                        <ul className="space-y-2">
                          {services[selectedService].benefits.map(
                            (benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-600 text-sm md:text-base"
                              >
                                <span className="text-pistache mt-1">✓</span>
                                <span>{benefit}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-r from-matcha to-matcha text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                          Book This Class
                        </button>
                        {/* <button className="bg-white border-2 border-matcha text-matcha px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:bg-almond-light">
                        Learn More
                      </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Animation Styles */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              @keyframes slideInRight {
                from {
                  opacity: 0;
                  transform: translateX(30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }

              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </section>

          {/* Special Services Section */}
          <section
            id="special-services"
            className="py-16 md:py-24 bg-gradient-to-b from-white via-almond-light to-almond-light relative pt-12 md:pt-10"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div
                    className="w-16 h-1 bg-gradient-to-r from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3
                  className="text-3xl md:text-4xl lg:text-5xl text-center text-matcha font-bold"
                  style={{ fontFamily: "'Dancing Script', serif" }}
                >
                  Special Services
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1 bg-gradient-to-l from-transparent to-pistache"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                </div>
              </div>

              {/* Container with Tabs and Content */}
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl 
            mx-auto scroll-animate"
              >
                {/* Services Navigation Tabs - Inside Container */}
                <div className="bg-gradient-to-r from-almond-light to-almond-light backdrop-blur-sm px-0 py-0  border-b border-matcha">
                  <div
                    ref={specialServiceTabsRef}
                    className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                  >
                    {specialServices.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSpecialService(index);
                          if (specialServiceTabsRef.current && isMobile) {
                            const button =
                              specialServiceTabsRef.current.children[index];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className={`flex-shrink-0 md:flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-3 md:py-4 font-semibold transition-all duration-300 text-xs md:text-sm lg:text-base whitespace-nowrap border-r border-matcha last:border-r-0 ${
                          selectedSpecialService === index
                            ? "bg-gradient-to-r from-matcha to-matcha text-white shadow-lg"
                            : "bg-white text-matcha hover:bg-almond"
                        }`}
                      >
                        <span className="text-base md:text-lg lg:text-xl">
                          {service.icon}
                        </span>
                        <span>{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Service Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-96 lg:h-full min-h-[400px] overflow-hidden">
                    <img
                      key={selectedSpecialService}
                      src={specialServices[selectedSpecialService].image}
                      alt={specialServices[selectedSpecialService].name}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
                      style={{
                        animation: "fadeIn 0.5s ease-in-out",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-6xl md:text-7xl mb-2">
                        {specialServices[selectedSpecialService].icon}
                      </div>
                    </div>

                    {/* Navigation Arrows - Mobile Only */}
                    <div className="lg:hidden absolute inset-0 flex items-center justify-between px-4">
                      <button
                        onClick={() => {
                          const newIndex =
                            selectedSpecialService === 0
                              ? specialServices.length - 1
                              : selectedSpecialService - 1;
                          setSelectedSpecialService(newIndex);
                          if (specialServiceTabsRef.current) {
                            const button =
                              specialServiceTabsRef.current.children[newIndex];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className="bg-white/80 hover:bg-white text-matcha rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronLeft className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          const newIndex =
                            selectedSpecialService ===
                            specialServices.length - 1
                              ? 0
                              : selectedSpecialService + 1;
                          setSelectedSpecialService(newIndex);
                          if (specialServiceTabsRef.current) {
                            const button =
                              specialServiceTabsRef.current.children[newIndex];
                            button?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                              inline: "center",
                            });
                          }
                        }}
                        className="bg-white/80 hover:bg-white text-matcha rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <FaChevronRight className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 lg:p-12 bg-gradient-to-b from-white to-white">
                    <div
                      key={`special-content-${selectedSpecialService}`}
                      className="transition-all duration-500 ease-in-out"
                      style={{
                        animation: "slideInRight 0.5s ease-in-out",
                      }}
                    >
                      <h4
                        className="text-2xl md:text-3xl lg:text-4xl text-matcha mb-4 md:mb-6 font-bold"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {specialServices[selectedSpecialService].name}
                      </h4>

                      <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-lg">
                        {specialServices[selectedSpecialService].fullDesc}
                      </p>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h5 className="text-base md:text-xl font-semibold text-matcha mb-4">
                          Key Benefits:
                        </h5>
                        <ul className="space-y-2">
                          {specialServices[selectedSpecialService].benefits.map(
                            (benefit, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-600 text-sm md:text-base"
                              >
                                <span className="text-pistache mt-1">✓</span>
                                <span>{benefit}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <button className="bg-gradient-to-r from-matcha to-matcha text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                        Book This Service
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section
            id="reviews"
            className="py-16 md:py-24 bg-gradient-to-b from-almond-light to-white relative rounded-b-[100px]  pt-32 md:pt-40"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div
                    className="w-16 h-1 bg-gradient-to-r from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3 className="font-inter text-3xl md:text-4xl lg:text-5xl text-center text-matcha font-bold">
                  Reviews
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1 bg-gradient-to-l from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                </div>
              </div>

              {/* Carousel Container */}
              <div className="relative max-w-5xl mx-auto">
                {/* Navigation Arrows */}
                {/* <button
                onClick={() =>
                  setCurrentTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 bg-matcha text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <FaChevronLeft className="text-xl" />
              </button> */}

                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 bg-matcha text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                {/* Review Card */}
                <div className="bg-gradient-to-br from-white to-almond-light rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-vanilla transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] scroll-animate">
                  <div
                    key={currentTestimonial}
                    className="transition-all duration-500 ease-in-out"
                    style={{ animation: "fadeIn 0.5s ease-in-out" }}
                  >
                    {/* Quote Icon */}
                    <div className="text-7xl text-chai-light mb-6 font-serif leading-none">
                      “
                    </div>

                    {/* Review Text */}
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-700 mb-8 italic text-center max-w-3xl mx-auto">
                      {testimonials[currentTestimonial].text}
                    </p>

                    {/* Rating Stars */}
                    <div className="flex justify-center mb-8">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <FaStar
                            key={i}
                            className="text-pistache text-xl md:text-2xl mx-1 drop-shadow-sm"
                          />
                        )
                      )}
                    </div>

                    {/* Reviewer Info */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-matcha to-pistache rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
                        {testimonials[currentTestimonial].name.charAt(0)}
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-matcha text-lg md:text-xl tracking-wide">
                          {testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-500 text-sm md:text-base">
                          Age {testimonials[currentTestimonial].age}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentTestimonial === index
                          ? "bg-matcha w-8 h-3"
                          : "bg-chai-light w-3 h-3 hover:bg-pistache"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="py-16 md:py-24 bg-gradient-to-b from-white via-almond-light to-almond-light -mt-24 pt-32 md:pt-40"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex items-center justify-center gap-4 mb-12 md:mb-16 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div
                    className="w-16 h-1 bg-gradient-to-r from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3 className="font-Inter text-3xl md:text-4xl lg:text-5xl text-center text-matcha font-bold">
                  Contact Us
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1 bg-gradient-to-l from-transparent to-matcha"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-matcha"></div>
                  <div className="w-2 h-2 rounded-full bg-matcha"></div>
                </div>
              </div>

              {/* Grid Layout for Desktop - Form and Location side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Contact Form */}
                <form
                  onSubmit={handleContactSubmit}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-almond scroll-animate"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-matcha font-semibold mb-2 text-sm md:text-base">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={contactFormData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full p-4 border-2 border-matcha rounded-xl text-base md:text-lg focus:outline-none focus:border-pistache transition-all duration-300 hover:border-carob"
                      />
                    </div>
                    <div>
                      <label className="block text-matcha font-semibold mb-2 text-sm md:text-base">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={contactFormData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full p-4 border-2 border-matcha rounded-xl text-base md:text-lg focus:outline-none focus:border-pistache transition-all duration-300 hover:border-carob"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-matcha font-semibold mb-2 text-sm md:text-base">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={contactFormData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-4 border-2 border-matcha rounded-xl text-base md:text-lg focus:outline-none focus:border-pistache transition-all duration-300 hover:border-carob"
                      />
                    </div>
                    <div>
                      <label className="block text-matcha font-semibold mb-2 text-sm md:text-base">
                        Category *
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          required
                          value={contactFormData.category}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-matcha rounded-xl text-base md:text-lg focus:outline-none focus:border-pistache transition-all duration-300 hover:border-carob bg-gradient-to-r from-white to-almond-light appearance-none cursor-pointer pr-12 font-medium text-gray-700 shadow-sm hover:shadow-md"
                          style={{
                            backgroundImage: "none",
                          }}
                        >
                          <option
                            value=""
                            className="bg-white text-gray-400 hover:bg-almond"
                          >
                            Select a category
                          </option>
                          <option
                            value="booking"
                            className="bg-white text-gray-700 py-2 hover:bg-almond"
                          >
                            Booking
                          </option>
                          <option
                            value="enquiry"
                            className="bg-white text-gray-700 py-2 hover:bg-almond"
                          >
                            Enquiry
                          </option>
                          <option
                            value="feedback"
                            className="bg-white text-gray-700 py-2 hover:bg-almond"
                          >
                            Feedback
                          </option>
                          <option
                            value="other"
                            className="bg-white text-gray-700 py-2 hover:bg-almond"
                          >
                            Other
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-pistache"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-matcha font-semibold mb-2 text-sm md:text-base">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      value={contactFormData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows="6"
                      className="w-full p-4 border-2 border-matcha rounded-xl text-base md:text-lg resize-vertical focus:outline-none focus:border-carob transition-all duration-300 hover:border-carob"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-matcha to-matcha text-white px-10 md:px-14 py-4 md:py-5 rounded-full text-lg md:text-xl font-semibold mx-auto block transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl hover:from-pistache hover:to-pistache disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>

                {/* Location Section - Desktop Side Panel, Hidden on Mobile */}
                <div className="hidden lg:block space-y-6 scroll-animate">
                  {/* Address Card */}
                  <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-almond">
                    <h4 className="font-serif text-xl md:text-2xl text-matcha mb-4 font-semibold">
                      Studio Address
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                      123 Peaceful Lane
                      <br />
                      Serenity Gardens
                      <br />
                      Mindful City, MC 12345
                    </p>
                    <p className="text-gray-700 mb-6 text-base md:text-lg">
                      Phone: (555) 123-YOGA
                      <br />
                      Email: hello@saatvikyoga.com
                    </p>

                    <button
                      onClick={() =>
                        window.open(
                          "https://www.google.com/maps/place/Bangalore,+Karnataka/@12.9767936,77.590082,11z",
                          "_blank"
                        )
                      }
                      className="bg-gradient-to-r from-matcha to-matcha text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 w-fit"
                    >
                      <FaMapMarkerAlt className="text-lg" />
                      Get Directions
                    </button>
                  </div>

                  {/* Map */}
                  <div
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/place/Bangalore,+Karnataka/@12.9767936,77.590082,11z",
                        "_blank"
                      )
                    }
                    className="bg-almond rounded-3xl h-64 md:h-80 overflow-hidden cursor-pointer relative group transition-all duration-300 hover:shadow-2xl"
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9973874144!2d77.35074421903857!3d12.95384772557775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-3xl"
                    ></iframe>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-3xl flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                        <span className="text-matcha font-semibold flex items-center gap-2">
                          <FaMapMarkerAlt />
                          Click to Open in Google Maps
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Popup */}
              {showContactPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md mx-4 text-center transform transition-all duration-300 scale-100"
                    style={{ animation: "slideInRight 0.3s ease-in-out" }}
                  >
                    <div className="w-20 h-20 bg-pistache rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-matcha mb-4">
                      Thank You!
                    </h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Your query has been registered successfully. We will
                      contact you shortly.
                    </p>
                    <button
                      onClick={() => setShowContactPopup(false)}
                      className="mt-6 bg-gradient-to-r from-matcha to-pistache text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Location Section - Mobile Only */}
          <section
            id="location"
            className="py-20 md:py-28 bg-gradient-to-b md:hidden from-almond-light via-almond-light to-white"
          >
            <div className="max-w-7xl mx-auto px-4 md:px-10">
              {/* Heading */}
              <div className="flex items-center justify-center gap-4 mb-14 md:mb-20 scroll-animate">
                {/* Left decorations */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pistache"></div>
                  <div className="w-3 h-3 rounded-full bg-pistache"></div>
                  <div
                    className="w-16 h-[2px] bg-gradient-to-r from-transparent to-pistache"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  ></div>
                </div>

                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center text-matcha font-bold tracking-wide">
                  Location
                </h3>

                {/* Right decorations */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-[2px] bg-gradient-to-l from-transparent to-pistache"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  ></div>
                  <div className="w-3 h-3 rounded-full bg-pistache"></div>
                  <div className="w-2 h-2 rounded-full bg-pistache"></div>
                </div>
              </div>

              {/* Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Address card */}
                <div className="scroll-animate">
                  <div className="bg-white border border-almond p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-300">
                    <h4 className="font-serif text-2xl md:text-3xl text-matcha mb-5 font-semibold">
                      Studio Address
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
                      123 Peaceful Lane
                      <br />
                      Serenity Gardens
                      <br />
                      Mindful City, MC 12345
                    </p>
                    <p className="text-gray-700 mb-6 text-base md:text-lg">
                      Phone: (555) 123-YOGA
                      <br />
                      Email: hello@saatvikyoga.com
                    </p>

                    <button
                      onClick={() =>
                        window.open(
                          "https://www.google.com/maps/place/Bangalore,+Karnataka/@12.9767936,77.590082,11z",
                          "_blank"
                        )
                      }
                      className="bg-gradient-to-r from-matcha to-pistache text-white px-7 md:px-10 py-3.5 md:py-4 rounded-full text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 w-fit"
                    >
                      <FaMapMarkerAlt className="text-lg" />
                      Get Directions
                    </button>
                  </div>
                </div>

                {/* Map section */}
                <div
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/Bangalore,+Karnataka/@12.9767936,77.590082,11z",
                      "_blank"
                    )
                  }
                  className="bg-almond rounded-3xl h-72 md:h-[28rem] overflow-hidden cursor-pointer relative group transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] scroll-animate"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9973874144!2d77.35074421903857!3d12.95384772557775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  ></iframe>

                  {/* Overlay hover effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 rounded-3xl flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-md px-7 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                      <span className="text-matcha font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt />
                        Open in Google Maps
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
