"use client";
import { useState } from "react";

export default function HomePage() {
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("en");

  const originalText = "Welcome to the Temple";

  const handleTranslate = async () => {
    const res = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        text: originalText,
        target: "hi",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setTranslated(data.translatedText);
    setLanguage("hi");
  };

  return (
    <div className="p-6 text-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        onClick={() => {
          setLanguage("en");
          setTranslated("");
        }}
      >
        English
      </button>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleTranslate}
      >
        हिंदी में देखें
      </button>

      <h1 className="mt-6 text-2xl font-bold">
        {language === "en" ? originalText : translated || "Translating..."}
      </h1>
    </div>
  );
}
