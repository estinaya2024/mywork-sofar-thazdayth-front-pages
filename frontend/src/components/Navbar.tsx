/**
 * NAVBAR COMPONENT
 * Main navigation bar present on every page.
 * Current Version: Static for the first-semester submission.
 * Handles links to created pages (Home, Process, Dishes, etc.)
 * and the implementation of multi-language support (i18n).
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Globe, Check, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";



// Configuration for site-wide links
const getLeftLinks = (t: any) => [
  { to: "/", label: t("nav.home") },
  { to: "/processus", label: t("nav.process") },
  { to: "/plats", label: t("nav.dishes") },
];

const getRightLinks = (t: any) => [
  { to: "/region", label: t("nav.region") },
  { to: "/a-propos", label: t("nav.about") },
];

const languages = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "kab", label: "Kabyle" },
];

const Navbar = ({ className = "", onNotificationClick }: { className?: string, onNotificationClick?: (type: 'order' | 'pressing', id: string) => void }) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false); // Controls background transparency on scroll
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [langMenuOpen, setLangMenuOpen] = useState(false); // Language dropdown state
  const location = useLocation();

  // Change navbar appearance when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set up the notification checker (olls every 30 seconds)
  // Cleanup: Removed notification polling as backend is ignored for this push.

  // Close mobile menu when user clicks a link (navigates)
  useEffect(() => setMenuOpen(false), [location]);

  const currentLang = i18n.language || "fr";
  const leftLinks = getLeftLinks(t);
  const rightLinks = getRightLinks(t);
  const allLinks = [...leftLinks, ...rightLinks];

  // Language switching function via i18next
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${className} ${scrolled
          ? "bg-background/60 backdrop-blur-md shadow-sm"
          : "bg-background/30 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-14 lg:h-16 relative">

          {/* Left area: Logo */}
          <div className="flex items-center z-10 flex-1">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="TAZDAYTH Logo"
                className="h-14 lg:h-16 w-auto object-contain mt-0.5"
                style={{ transform: "scale(1.2)", transformOrigin: "left center" }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-xl lg:text-2xl font-bold tracking-tight text-foreground hidden">
                TAZDAYTH
              </span>
            </Link>
          </div>

          {/* Absolute Center Area: Links */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center w-full pointer-events-none">
            <div className="hidden lg:flex items-center justify-center gap-8 max-w-4xl mx-auto pointer-events-auto">
              {allLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-primary whitespace-nowrap ${location.pathname === l.to ? "text-primary font-semibold" : "text-foreground/70"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right area: Icons */}
          <div className="flex items-center justify-end gap-4 z-10 flex-1">


            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-sm text-foreground/70 hover:text-primary transition-colors focus:outline-none"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">{currentLang.toUpperCase()}</span>
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { handleLanguageChange(lang.code); setLangMenuOpen(false); }}
                        className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      >
                        <span>{lang.label}</span>
                        {currentLang === lang.code && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


            <button onClick={() => setMenuOpen(true)} className="lg:hidden text-foreground">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} // The menu slides in from the right
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden pt-24 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-14">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="TAZDAYTH Logo"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="text-xl font-bold tracking-tight text-foreground hidden">TAZDAYTH</span>
              </Link>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-5">
              {allLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={l.to}
                    className={`text-2xl font-medium tracking-tight transition-colors ${location.pathname === l.to ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: allLinks.length * 0.08 }}
                className="flex flex-col items-center gap-6 mt-3 w-full"
              >
                <div className="flex gap-5 mt-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`text-base font-medium transition-colors ${currentLang === lang.code ? "text-primary" : "text-foreground/60"
                        }`}
                    >
                      {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Cleanup: NotificationDrawer removed for this push */}
    </>
  );
};

export default Navbar;