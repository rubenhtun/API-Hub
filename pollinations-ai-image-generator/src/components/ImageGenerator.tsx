import React, { useState } from "react";
import "../App.css";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState(""); // string
  const [imgUrl, setImgUrl] = useState(""); // string

  const pollinateImage = () => {
    // whitespace လုံးဝမပါလာစေရန် **
    if (prompt.trim()) {
      // encode လုပ်ခြင်းဖြင့် URL အတွင်း သင်သုံးလိုသော string များကို လုံခြုံစေသည်။ **
      const pollinatedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}`;
      setImgUrl(pollinatedUrl);
    }
  };

  const enterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      pollinateImage();
    }
  };

  return (
    
  );
};

export default ImageGenerator;
