import React, { useRef, useState } from 'react';
import "./ImageGenerator.css";
import default_image from "../Assets/default_image.svg";

const ImageGenerator = () => {
    const [img_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async() => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: "512x512",
                }),
            }
        );
        const data = await response.json();
        const data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

    const handleDownload = () => {
        if (img_url !== "/") {
            const a = document.createElement('a');
            a.href = img_url;
            a.download = 'generated_image.png';
            a.click();
        }
    }

    return (
        <div className='ai-image-generator'>
            <div className='header'>Ai image <span>generator</span></div>
            <div className='img-loading'>
                <div className='image'><img src={img_url === "/" ? default_image : img_url} alt=''/> </div>
                <div className='loading'>
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
                </div>
            </div>
            <div className='search-box'>
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want To see'/>
                <div className='generate-btn' onClick={imageGenerator}>Generate</div>
            </div>
            
            <div className='download-link'>
                <button onClick={handleDownload} disabled={img_url === "/"}>
                    Download Generated Image
                </button>
            </div>
        </div>
    )
}

export default ImageGenerator;
