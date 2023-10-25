import React, { useState } from "react";

import './ImageGenerationForm.css'; 

const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "generated_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container al-c mt-3">
      <h1>AI <span>Image Generator</span></h1>
      <p>Generate image from text using this website.</p>
      <form className="gen-form" onSubmit={handleSubmit}>
        <input type="text" name="input" placeholder="Type your prompt here..." />
        <button type="submit" className="generate-button">
          <span role="img" aria-label="Search Icon">🔍</span> Generate
        </button>
      </form>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
          <div className="result-image">
            <img src={output} alt="art" />
            <br />
            <button onClick={handleDownload} className="download-button">
              Download Image
              <span role="img" aria-label="Download Icon">⬇</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



export default ImageGenerationForm;
