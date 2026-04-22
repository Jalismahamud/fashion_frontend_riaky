"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

const LanguageSection = ({ className }) => {
  // Hardcode the default to 'en' as per client request
  const DEFAULT_LANG = "en";
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANG);
  const [googleTranslateLoaded, setGoogleTranslateLoaded] = useState(false);
  const googleTranslateRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "it", name: "Italian" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
  ];

  // 1. Initialize component and set the hardcoded default language.
  //    This intentionally ignores localStorage for the initial state,
  //    fulfilling the client's "always want en to default" request.
  useEffect(() => {
    setMounted(true);
    // Setting state to the hardcoded default 'en'
    setSelectedLanguage(DEFAULT_LANG);

    // Crucial step: Clear localStorage on load to prevent the Arabic glitch
    // from re-appearing due to a stored value on the initial page load.
    if (localStorage.getItem("selectedLanguage")) {
      localStorage.removeItem("selectedLanguage");
    }
  }, []);

  // Helper to set the Google Translate select value (tries a few selectors)
  const setGoogleSelectValue = (langCode) => {
    const select =
      document.querySelector("#google_translate_element select.goog-te-combo") ||
      document.querySelector(".goog-te-combo") ||
      document.querySelector("#google_translate_element select");
    if (select) {
      try {
        select.value = langCode;
        // Dispatch the change event to force Google Translate to switch language
        select.dispatchEvent(new Event("change", { bubbles: true }));
      } catch (e) {
        console.warn("Failed to dispatch change on Google select:", e);
      }
      return true;
    }
    return false;
  };

  // 2. Initialize Google Translate safely
  useEffect(() => {
    if (!mounted) return;

    let retries = 0;
    const maxRetries = 40;

    const createTranslate = () => {
      try {
        if (window.google && window.google.translate && !googleTranslateRef.current) {
          googleTranslateRef.current = new window.google.translate.TranslateElement(
            {
              pageLanguage: DEFAULT_LANG, // Base language for the widget
              includedLanguages: languages.map((lang) => lang.code).join(","),
              layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
              autoDisplay: false,
            },
            "google_translate_element"
          );

          // Give the widget a moment to render DOM, then force 'en' to start
          setTimeout(() => {
            // Force the widget to start at 'en' regardless of any quick flash
            setGoogleSelectValue(DEFAULT_LANG);
          }, 500);

          setGoogleTranslateLoaded(true);
          return;
        }
      } catch (err) {
        console.error("Google Translate init error (will retry):", err);
      }

      retries += 1;
      if (retries <= maxRetries) {
        setTimeout(createTranslate, 250);
      } else {
        console.warn("Google Translate failed to initialize after retries.");
      }
    };

    window.googleTranslateElementInit = createTranslate;

    const existingScript = document.querySelector(
      'script[src*="translate_a/element.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      createTranslate();
    }

    return () => {
      try {
        delete window.googleTranslateElementInit;
      } catch {
        /* ignore */
      }
    };
  }, [mounted]);

  // 3. Keep widget in sync when selectedLanguage changes (user interaction)
  useEffect(() => {
    // Only save the language if it's NOT the default, 
    // or if the user actively changed it. 
    // You may decide to remove saving to localStorage entirely if the client wants 
    // the site to ALWAYS reset to 'en' on every visit.
    if (selectedLanguage !== DEFAULT_LANG) {
      localStorage.setItem("selectedLanguage", selectedLanguage);
    } else {
      localStorage.removeItem("selectedLanguage");
    }

    if (googleTranslateLoaded) {
      let tries = 0;
      const trySet = () => {
        const ok = setGoogleSelectValue(selectedLanguage);
        tries += 1;
        if (!ok && tries < 20) {
          setTimeout(trySet, 200);
        }
      };
      trySet();
    }
  }, [selectedLanguage, googleTranslateLoaded]);

  // Handle user changes from the custom dropdown
  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    setSelectedLanguage(langCode);

    // Also try to update Translate's select right away
    setGoogleSelectValue(langCode);
  };

  if (!mounted) return null;

  return (
    <div className={cn("language-selector flex items-center gap-2", className)}>
      {/* Google Translate element (isolated style to avoid global CSS interference) */}
      {/* IMPORTANT: This element is hidden via CSS in the final step */}
      <div
        id="google_translate_element"
        className="translate-container"
        style={{ all: "initial" }}
      ></div>

      {/* Custom language selector */}
      <select
        translate="no"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="custom-language-select w-full px-3 py-2 rounded-md border bg-white text-sm cursor-pointer focus:outline-none"
      >
        {languages.map((language) => (
          <option translate="no" key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSection;