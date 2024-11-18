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
    <div className="container">
      <h2>Pollinations AI Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // url/prompt/ရိုက်ထည့်လိုသော စကားလုံး
        onKeyDown={enterKeyPress} // Enter ခေါက်ပြီး prompt ပို့ပေးနိုင်ရန်
        placeholder="Enter your image prompt"
      />
      <button onClick={pollinateImage}>Pollinate</button>

      {imgUrl && (
        <div>
          <h3>Pollinated Image</h3>
          <img
            src={imgUrl}
            alt="Pollinated AI result"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
