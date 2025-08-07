// Rainlove.js - Main animation script
console.log("💖 Rainlove.js loaded");

// Base64 decode function
function base64DecodeUnicode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

// URL parameter handling
const urlParams = new URLSearchParams(window.location.search);

let inputText = "";
let gif = "";
let music = "";
let hasValidData = false;

// Check for URL parameter
if (urlParams.has("id")) {
  try {
    const paramId = urlParams.get("id");
    console.log("🔍 Found parameter ID:", paramId);

    // Try localStorage first (shortId system from input.html)
    const localKey = `data_${paramId}`;
    const localData = localStorage.getItem(localKey);

    if (localData) {
      console.log("💾 Found data in localStorage");
      const data = JSON.parse(localData);
      console.log("📦 User data:", data);

      if (data.msg && data.msg.trim()) {
        inputText = data.msg;
        gif = data.gif || "";
        music = data.music || "";
        hasValidData = true;

        console.log("✅ Valid user data loaded:");
        console.log("  Text:", inputText);
        console.log("  GIF:", gif);
        console.log("  Music:", music);
      }
    } else {
      console.log("🔄 Trying base64 decode...");
      const decodedData = base64DecodeUnicode(paramId);
      const data = JSON.parse(decodedData);

      if (data.msg && data.msg.trim()) {
        inputText = data.msg;
        gif = data.gif || "";
        music = data.music || "";
        hasValidData = true;

        console.log("✅ Valid base64 data loaded");
      }
    }
  } catch (error) {
    console.error("❌ Error loading user data:", error);
  }
}

// If no valid data found, show welcome message
if (!hasValidData) {
  console.log("🚫 No valid user data - showing welcome message");

  const elementsToHide = ["canvas", "sticker", "pinkboard", "bigHeart"];
  elementsToHide.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });

  document.body.innerHTML += `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255,255,255,0.95);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 1000;
      max-width: 500px;
    ">
      <h2 style="color: #ff69b4; margin-bottom: 20px;">💕 Chào mừng đến với Rainlove!</h2>
      <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
        Bạn cần tạo một link tin nhắn tình yêu trước khi có thể xem hiệu ứng.
      </p>
      <a href="input.html" style="
        display: inline-block;
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-weight: bold;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(255,105,180,0.4);
      ">
        🚀 Tạo tin nhắn ngay
      </a>
    </div>
  `;
  throw new Error("No user data found");
}

console.log("🎬 Starting animation with user data");

// Set up music
const bgm = document.getElementById("bgm");
if (music && music.trim() !== "") {
  bgm.src = music;
  bgm.play().catch(() => {
    console.warn("🎵 Cannot play music due to browser restrictions");
  });

  document.addEventListener("click", () => {
    if (bgm.paused && music && music.trim() !== "") {
      bgm.play().catch(() => {
        console.warn("🎵 Browser not yet allowing auto music playback");
      });
    }
  });
}

// Set up sticker (GIF/image)
const sticker = document.getElementById("sticker");
if (gif && gif.trim() !== "" && gif !== "heart-effect") {
  sticker.src = gif.startsWith("http") ? gif : gif;
  sticker.style.display = "block";
  console.log("🖼️ Sticker set to:", sticker.src);
}

// Simple text display
const canvas = document.getElementById("canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  // Simple centered text
  ctx.fillStyle = "#ff69b4";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(inputText, canvas.width / 2, canvas.height / 2);
}
