// TIM.HTML HEART EFFECT - Complete exact copy for heart-effect
console.log("💖 Tim.html heart effect loaded");

// Add mobile viewport meta tag if not exists
if (!document.querySelector('meta[name="viewport"]')) {
  const viewport = document.createElement("meta");
  viewport.name = "viewport";
  viewport.content =
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
  document.head.appendChild(viewport);
}

// Add mobile-optimized styles
const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
  /* Mobile optimizations */
  @media (max-width: 768px) {
    body {
      overflow-x: hidden;
      -webkit-text-size-adjust: none;
      -moz-text-size-adjust: none;
      -ms-text-size-adjust: none;
      text-size-adjust: none;
    }
    
    canvas {
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: optimize-contrast;
    }
    
    /* Prevent zooming on input elements */
    input, select, textarea {
      font-size: 16px !important;
    }
  }
  
  /* Landscape orientation optimization */
  @media (max-width: 768px) and (orientation: landscape) {
    body {
      height: 100vh;
      overflow: hidden;
    }
  }
`;
document.head.appendChild(mobileStyles);

// Import Google Fonts for beautiful typography - Optimized for mobile readability
if (!document.querySelector('link[href*="Quicksand"]')) {
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Pacifico&family=Inter:wght@400;500;600;700&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);
}

// Mobile orientation check and rotation prompt
function checkOrientation() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (
    isMobile &&
    window.innerWidth < window.innerHeight &&
    window.innerWidth < 768
  ) {
    showRotationPrompt();
  } else {
    hideRotationPrompt();
  }
}

function showRotationPrompt() {
  if (document.getElementById("rotation-prompt")) return;

  const rotationPrompt = document.createElement("div");
  rotationPrompt.id = "rotation-prompt";
  rotationPrompt.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #ff9ec7, #ff69b4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      color: white;
      font-family: 'Inter', 'Quicksand', sans-serif;
    ">
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 4rem; margin-bottom: 20px; animation: rotatePhone 2s infinite;">📱</div>
        <h2 style="font-size: 1.5rem; margin-bottom: 15px; font-weight: 600;">Xoay ngang điện thoại</h2>
        <p style="font-size: 1rem; opacity: 0.9; line-height: 1.4;">Để có trải nghiệm tốt nhất, vui lòng xoay điện thoại theo chiều ngang</p>
      </div>
    </div>
    <style>
      @keyframes rotatePhone {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-90deg); }
        50% { transform: rotate(-90deg); }
        75% { transform: rotate(-90deg); }
      }
    </style>
  `;
  document.body.appendChild(rotationPrompt);
}

function hideRotationPrompt() {
  const rotationPrompt = document.getElementById("rotation-prompt");
  if (rotationPrompt) {
    rotationPrompt.remove();
  }
}

// Add orientation change listener
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", () => {
  setTimeout(checkOrientation, 100);
});

// Initial orientation check
checkOrientation();

// Canvas setup cho hiệu ứng chữ và trái tim
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Đặt khai báo isMobile lên trên để tránh lỗi ReferenceError
const isMobile =
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  window.innerWidth < 768;

// Mobile-specific canvas optimizations
if (isMobile) {
  // Use lower resolution for mobile to improve performance
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.scale(pixelRatio, pixelRatio);

  // Optimize canvas context for mobile
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
} else {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Ensure canvas is properly configured
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "100";
canvas.style.pointerEvents = "none";

// Enhanced mobile performance detection
const isLowEndDevice =
  navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
const gap = isMobile ? 4 : 8; // Reduced gap for better mobile performance

// Performance optimization settings
const performanceMode = isMobile || isLowEndDevice;
const maxParticles = performanceMode ? 800 : 2000;
const animationFPS = performanceMode ? 30 : 60;
const sparkleFrequency = performanceMode ? 0.01 : 0.03;

const shapeCanvas = document.createElement("canvas");
if (isMobile) {
  // Use device-appropriate resolution for mobile
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  shapeCanvas.width = canvas.width;
  shapeCanvas.height = canvas.height;
} else {
  shapeCanvas.width = canvas.width;
  shapeCanvas.height = canvas.height;
}
const shapeCtx = shapeCanvas.getContext("2d");

// Optimize shape context for performance
if (isMobile) {
  shapeCtx.imageSmoothingEnabled = false;
  shapeCtx.webkitImageSmoothingEnabled = false;
}

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
let heartText = "";
let hasValidData = false;

// Check for URL parameter
if (urlParams.has("data")) {
  try {
    // Direct data parameter (new system)
    const encodedData = urlParams.get("data");
    console.log(
      "🔍 Found direct data parameter:",
      encodedData.substring(0, 50) + "..."
    );

    const decodedData = decodeURIComponent(atob(encodedData));
    console.log("📄 Decoded data:", decodedData);
    const data = JSON.parse(decodedData);

    if (data.msg && data.msg.trim()) {
      inputText = data.msg;
      gif = data.gif || "";
      music = data.music || "";
      heartText = data.heartText || "I Love You";
      hasValidData = true;

      console.log("✅ Valid user data loaded from direct parameter:");
      console.log("  Text:", inputText);
      console.log("  GIF:", gif);
      console.log("  Music:", music);
      console.log("  HeartText:", heartText);
    } else {
      console.log("❌ Data found but msg is empty or invalid:", data.msg);
    }
  } catch (error) {
    console.error("❌ Error parsing direct data parameter:", error);
  }
} else if (urlParams.has("id")) {
  try {
    const paramId = urlParams.get("id");
    console.log("🔍 Found parameter ID:", paramId);

    // Try localStorage first (shortId system from input.html)
    const localKey = `data_${paramId}`;
    console.log("🔑 Looking for localStorage key:", localKey);
    const localData = localStorage.getItem(localKey);
    console.log("💾 LocalStorage data:", localData);

    if (localData) {
      console.log("💾 Found data in localStorage");
      const data = JSON.parse(localData);
      console.log("📦 User data:", data);

      if (data.msg && data.msg.trim()) {
        inputText = data.msg;
        gif = data.gif || "";
        music = data.music || "";
        heartText = data.heartText || "I Love You";
        hasValidData = true;

        console.log("✅ Valid user data loaded:");
        console.log("  Text:", inputText);
        console.log("  GIF:", gif);
        console.log("  Music:", music);
        console.log("  HeartText:", heartText);
      } else {
        console.log("❌ Data found but msg is empty or invalid:", data.msg);
      }
    } else {
      console.log("🔍 No localStorage data found, trying base64 decode...");
      // Fallback: try base64 decode
      console.log("🔄 Trying base64 decode...");
      const decodedData = base64DecodeUnicode(paramId);
      console.log("📄 Decoded data:", decodedData);
      const data = JSON.parse(decodedData);

      if (data.msg && data.msg.trim()) {
        inputText = data.msg;
        gif = data.gif || "";
        music = data.music || "";
        heartText = data.heartText || "I Love You";
        hasValidData = true;

        console.log("✅ Valid base64 data loaded");
      } else {
        console.log(
          "❌ Base64 data found but msg is empty or invalid:",
          data.msg
        );
      }
    }
  } catch (error) {
    console.error("❌ Error loading user data:", error);
  }
}

// If no valid data found, show welcome message
if (!hasValidData) {
  console.log("🚫 No valid user data - showing welcome message");

  // Hide all elements
  const elementsToHide = ["canvas", "sticker", "pinkboard", "bigHeart"];
  elementsToHide.forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.style.display = "none";
  });

  // Show welcome message
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
      font-family: 'Inter', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

  // Stop execution
  throw new Error("No user data found");
}

// Continue with animation only if we have valid data
console.log("🎬 Starting animation with user data");
console.log("🔧 Performance settings:", {
  isMobile,
  isLowEndDevice,
  performanceMode,
  maxParticles,
  animationFPS,
  sparkleFrequency,
});

// Set up sticker (GIF/image)
const stickerImg = document.getElementById("gif-sticker");
const stickerContainer = document.getElementById("sticker");
if (
  gif &&
  gif.trim() !== "" &&
  gif !== "heart-effect" &&
  gif !== "sparkle-heart-effect"
) {
  stickerImg.src = gif.startsWith("http") ? gif : gif;
  stickerContainer.style.display = "block";
  console.log("🖼️ Sticker set to:", stickerImg.src);
}

// Set up music
const audio = document.getElementById("audio");
if (music && music.trim() !== "") {
  const source = audio.querySelector("source");
  source.src = music;
  audio.load();
  audio.play().catch(() => {
    console.warn("🎵 Cannot play music due to browser restrictions");
  });

  document.addEventListener("click", () => {
    if (audio.paused && music && music.trim() !== "") {
      audio.play().catch(() => {
        console.warn("🎵 Browser not yet allowing auto music playback");
      });
    }
  });
}

// Split text into lines và thêm countdown
const originalTexts = inputText.split("|").filter((text) => text.trim() !== "");
const countdownTexts = ["3", "2", "1"];
const texts = [...countdownTexts, ...originalTexts]; // Thêm countdown trước messages
console.log("📄 Animation texts with countdown:", texts);

// Text animation variables
let currentIndex = 0;
let particles = [];
const morphDelay = 500;
let lastMorphTime = Date.now();
let stopAnimation = false;
let isCountdownPhase = true; // Track nếu đang trong phase countdown

// Font fitting function - Enhanced for mobile readability
function getFittedFont(text) {
  const isCountdown = ["3", "2", "1"].includes(text.trim());
  let fontSize = isCountdown ? 400 : 300;

  // Use modern, readable fonts instead of system fonts
  const fontFamily = isCountdown
    ? '"Inter", "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    : '"Quicksand", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  shapeCtx.font = `bold ${fontSize}px ${fontFamily}`;
  let textWidth = shapeCtx.measureText(text.replace("\n", "")).width;

  // Adjust for mobile screens
  const maxWidth = isMobile
    ? 0.85 * shapeCanvas.width
    : 0.9 * shapeCanvas.width;
  const maxHeight = isMobile
    ? 0.7 * shapeCanvas.height
    : 0.8 * shapeCanvas.height;

  while (
    (textWidth > maxWidth || fontSize > maxHeight) &&
    fontSize > (isMobile ? 20 : 10)
  ) {
    fontSize -= isMobile ? 8 : 5;
    shapeCtx.font = `bold ${fontSize}px ${fontFamily}`;
    textWidth = shapeCtx.measureText(text.replace("\n", "")).width;
  }

  return { fontSize, fontFamily };
}

// Generate dots from text - Enhanced with better fonts
function generateDots(text) {
  shapeCtx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);

  const textLines = text.split("\n");
  const { fontSize, fontFamily } = getFittedFont(text);
  const isCountdown = ["3", "2", "1"].includes(text.trim());

  shapeCtx.font = `bold ${fontSize}px ${fontFamily}`;
  shapeCtx.fillStyle = "#fff";
  shapeCtx.textAlign = "center";
  shapeCtx.textBaseline = "middle";

  // Add text shadow for better readability on mobile
  if (isMobile) {
    shapeCtx.shadowColor = "rgba(0,0,0,0.5)";
    shapeCtx.shadowBlur = 4;
    shapeCtx.shadowOffsetX = 2;
    shapeCtx.shadowOffsetY = 2;
  }

  const lineHeight = fontSize * (isCountdown ? 1.1 : 1.2);
  const totalHeight = lineHeight * textLines.length;
  const startY = shapeCanvas.height / 2 - totalHeight / 2 + lineHeight / 2;

  for (let i = 0; i < textLines.length; i++) {
    shapeCtx.fillText(
      textLines[i],
      shapeCanvas.width / 2,
      startY + i * lineHeight
    );
  }

  const imageData = shapeCtx.getImageData(
    0,
    0,
    shapeCanvas.width,
    shapeCanvas.height
  ).data;
  const dots = [];

  for (let y = 0; y < shapeCanvas.height; y += gap) {
    for (let x = 0; x < shapeCanvas.width; x += gap) {
      const alpha = imageData[(y * shapeCanvas.width + x) * 4 + 3];
      if (alpha > 128) {
        dots.push({ x: x, y: y });
      }
    }
  }

  return dots;
}

// Text particle functions
function interpolateParticles(newDots) {
  const maxParticles = Math.max(particles.length, newDots.length);
  const newParticles = [];

  for (let i = 0; i < maxParticles; i++) {
    const oldParticle = particles[i % particles.length] || {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
    const newDot = newDots[i % newDots.length];

    newParticles.push({
      x: oldParticle.x,
      y: oldParticle.y,
      tx: newDot.x,
      ty: newDot.y,
      progress: 0,
      speed: 0.02 + 0.02 * Math.random(),
    });
  }

  particles = newParticles;
}

function updateParticles() {
  for (let particle of particles) {
    if (particle.progress < 1) {
      particle.progress += particle.speed;
      if (particle.progress > 1) {
        particle.progress = 1;
      }
    }

    // Sử dụng lerp chậm hơn để mượt mà
    const lerp = 0.06; // Giảm từ 0.1 xuống 0.06
    particle.x += (particle.tx - particle.x) * lerp;
    particle.y += (particle.ty - particle.y) * lerp;
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Performance optimization for mobile
  if (performanceMode) {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();

    // Batch draw particles for better performance
    for (let particle of particles) {
      ctx.rect(particle.x - 1, particle.y - 1, 2, 2);
    }
    ctx.fill();
  } else {
    // Desktop version with circles
    ctx.fillStyle = "#FFFFFF";
    for (let particle of particles) {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1.8, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Reduced sparkle frequency for mobile
  const sparkleCondition = performanceMode
    ? animationFrameCount % 60 === 0 && Math.random() < sparkleFrequency
    : animationFrameCount % 30 === 0 && Math.random() < sparkleFrequency;

  if (!isCountdownPhase && sparkleCondition) {
    createWhiteSparkle();
  }

  // Limit sparkles on mobile
  if (performanceMode) {
    drawWhiteSparklesOptimized();
  } else {
    drawWhiteSparkles();
  }
}

// EXACT TIM.HTML HEART EFFECT CODE
/*
 * Settings - Optimized for mobile performance
 */
var settings = {
  particles: {
    length: maxParticles, // Dynamic based on device performance
    duration: performanceMode ? 2.5 : 2, // Slightly longer duration for mobile
    velocity: performanceMode ? 80 : 100, // Reduced velocity for mobile
    effect: -1.3, // play with this for a nice effect
    size: performanceMode ? 10 : 13, // Smaller particles for mobile
  },
};

/*
 * RequestAnimationFrame polyfill by Erik Möller
 */
(function () {
  var b = 0;
  var c = ["ms", "moz", "webkit", "o"];
  for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
    window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[c[a] + "CancelAnimationFrame"] ||
      window[c[a] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (h, e) {
      var d = new Date().getTime();
      var f = Math.max(0, 16 - (d - b));
      var g = window.setTimeout(function () {
        h(d + f);
      }, f);
      b = d + f;
      return g;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (d) {
      clearTimeout(d);
    };
  }
})();

/*
 * Point class
 */
var Point = (function () {
  function Point(x, y) {
    this.x = typeof x !== "undefined" ? x : 0;
    this.y = typeof y !== "undefined" ? y : 0;
  }
  Point.prototype.clone = function () {
    return new Point(this.x, this.y);
  };
  Point.prototype.length = function (length) {
    if (typeof length == "undefined")
      return Math.sqrt(this.x * this.x + this.y * this.y);
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  };
  Point.prototype.normalize = function () {
    var length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  };
  return Point;
})();

/*
 * Particle class
 */
var Particle = (function () {
  function Particle() {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
  }
  Particle.prototype.initialize = function (x, y, dx, dy) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  };
  Particle.prototype.update = function (deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  };
  Particle.prototype.draw = function (context, image) {
    function ease(t) {
      return --t * t * t + 1;
    }
    var size = image.width * ease(this.age / settings.particles.duration);
    context.globalAlpha = 1 - this.age / settings.particles.duration;
    context.drawImage(
      image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size
    );
  };
  return Particle;
})();

/*
 * ParticlePool class
 */
var ParticlePool = (function () {
  var particles,
    firstActive = 0,
    firstFree = 0,
    duration = settings.particles.duration;
  function ParticlePool(length) {
    // create and populate particle pool
    particles = new Array(length);
    for (var i = 0; i < particles.length; i++) particles[i] = new Particle();
  }
  ParticlePool.prototype.add = function (x, y, dx, dy) {
    particles[firstFree].initialize(x, y, dx, dy);
    // handle circular queue
    firstFree++;
    if (firstFree == particles.length) firstFree = 0;
    if (firstActive == firstFree) firstActive++;
    if (firstActive == particles.length) firstActive = 0;
  };
  ParticlePool.prototype.update = function (deltaTime) {
    var i;
    // update active particles
    if (firstActive < firstFree) {
      for (i = firstActive; i < firstFree; i++) particles[i].update(deltaTime);
    }
    if (firstFree < firstActive) {
      for (i = firstActive; i < particles.length; i++)
        particles[i].update(deltaTime);
      for (i = 0; i < firstFree; i++) particles[i].update(deltaTime);
    }
    // remove inactive particles
    while (particles[firstActive].age >= duration && firstActive != firstFree) {
      firstActive++;
      if (firstActive == particles.length) firstActive = 0;
    }
  };
  ParticlePool.prototype.draw = function (context, image) {
    // draw active particles
    if (firstActive < firstFree) {
      for (i = firstActive; i < firstFree; i++)
        particles[i].draw(context, image);
    }
    if (firstFree < firstActive) {
      for (i = firstActive; i < particles.length; i++)
        particles[i].draw(context, image);
      for (i = 0; i < firstFree; i++) particles[i].draw(context, image);
    }
  };
  return ParticlePool;
})();

// Heart particle effect function
function startParticleHeart() {
  console.log("💖 Starting exact tim.html heart effect");

  const pinkboard = document.getElementById("pinkboard");
  const context = pinkboard.getContext("2d");
  pinkboard.width = window.innerWidth;
  pinkboard.height = window.innerHeight;
  pinkboard.style.display = "block";

  const particles = new ParticlePool(settings.particles.length);
  const particleRate = settings.particles.length / settings.particles.duration; // particles/sec
  let time;

  // get point on heart with -PI <= t <= PI
  function pointOnHeart(t) {
    return new Point(
      160 * Math.pow(Math.sin(t), 3),
      130 * Math.cos(t) -
        50 * Math.cos(2 * t) -
        20 * Math.cos(3 * t) -
        10 * Math.cos(4 * t) +
        25
    );
  }

  // creating the particle image using a dummy canvas
  const image = (function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = settings.particles.size;
    canvas.height = settings.particles.size;

    // helper function to create the path
    function to(t) {
      const point = pointOnHeart(t);
      point.x =
        settings.particles.size / 2 + (point.x * settings.particles.size) / 350;
      point.y =
        settings.particles.size / 2 - (point.y * settings.particles.size) / 350;
      return point;
    }

    // create the path
    ctx.beginPath();
    let t = -Math.PI;
    let point = to(t);
    ctx.moveTo(point.x, point.y);
    while (t < Math.PI) {
      t += 0.01; // baby steps!
      point = to(t);
      ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();

    // create the fill
    ctx.fillStyle = "#FF5CA4";
    ctx.fill();

    // create the image
    const image = new Image();
    image.src = canvas.toDataURL();
    return image;
  })();

  // render that thing!
  function render() {
    // next animation frame
    requestAnimationFrame(render);

    // update time
    const newTime = new Date().getTime() / 1000;
    const deltaTime = newTime - (time || newTime);
    time = newTime;

    // clear canvas
    context.clearRect(0, 0, pinkboard.width, pinkboard.height);

    // create new particles
    const amount = particleRate * deltaTime;
    for (let i = 0; i < amount; i++) {
      const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
      const dir = pos.clone().length(settings.particles.velocity);
      particles.add(
        pinkboard.width / 2 + pos.x,
        pinkboard.height / 2 - pos.y,
        dir.x,
        -dir.y
      );
    }

    // update and draw particles
    particles.update(deltaTime);
    particles.draw(context, image);

    // Draw heart text in the center
    if (heartText && heartText.trim() !== "") {
      context.save();

      // Split heartText by | to get multiple messages
      const heartMessages = heartText
        .split("|")
        .filter((msg) => msg.trim() !== "");
      const currentMessage =
        heartMessages[Math.floor((time * 0.5) % heartMessages.length)];

      // Enhanced gradient text styling với màu sắc đẹp hơn
      const gradient = context.createLinearGradient(
        0,
        pinkboard.height / 2 - 40,
        0,
        pinkboard.height / 2 + 40
      );
      gradient.addColorStop(0, "#FF1493"); // Deep Pink
      gradient.addColorStop(0.3, "#FF69B4"); // Hot Pink
      gradient.addColorStop(0.6, "#FFB6C1"); // Light Pink
      gradient.addColorStop(1, "#FFC0CB"); // Pink

      context.fillStyle = gradient;
      context.textAlign = "center";
      context.textBaseline = "middle";

      // Calculate font size để vừa với trái tim (nhỏ hơn)
      const maxWidth = Math.min(pinkboard.width * 0.25, 200); // Giảm từ 0.5 xuống 0.25
      let fontSize = Math.min(40, (maxWidth / currentMessage.length) * 2); // Giảm từ 72 xuống 40
      fontSize = Math.max(fontSize, 16); // Giảm minimum từ 24 xuống 16

      // Beautiful font with fallbacks from input.html
      // Better font for mobile readability
      context.font = `bold ${fontSize}px "Inter", "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

      // Add text stroke for better visibility on mobile
      if (isMobile) {
        context.lineWidth = 2;
        context.strokeStyle = "rgba(255,255,255,0.8)";
        context.strokeText(
          heartText,
          canvas.width / 2,
          canvas.height / 2 + fontSize / 6
        );
      }

      const centerX = pinkboard.width / 2;
      const centerY = pinkboard.height / 2;

      // Add multiple shadow layers for depth
      context.shadowColor = "rgba(255, 255, 255, 0.9)";
      context.shadowBlur = 15;
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;

      // Add glow effect bằng cách vẽ nhiều lần với alpha thấp
      context.save();
      context.shadowColor = "rgba(255, 182, 193, 0.8)";
      context.shadowBlur = 25;
      context.fillText(currentMessage, centerX, centerY);
      context.restore();

      // Add main text fill
      context.fillText(currentMessage, centerX, centerY);

      context.restore();
    }
  }

  // handle (re-)sizing of the canvas
  function onResize() {
    pinkboard.width = pinkboard.clientWidth;
    pinkboard.height = pinkboard.clientHeight;
  }
  window.addEventListener("resize", onResize);

  // delay rendering bootstrap
  setTimeout(function () {
    onResize();
    render();
  }, 10);

  // Add sparkle effects for heart-effect
  addHeartSparkles();

  // Don't show the big heart element - only keep particles
  // const bigHeart = document.getElementById("bigHeart");
  // if (bigHeart) {
  //   bigHeart.style.display = "block";
  // }
}

// Add sparkle effects to heart particles
function addHeartSparkles() {
  // Create sparkle container if not exists
  let sparkleContainer = document.getElementById("heartSparkleContainer");
  if (!sparkleContainer) {
    sparkleContainer = document.createElement("div");
    sparkleContainer.id = "heartSparkleContainer";
    sparkleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 5000;
      pointer-events: none;
    `;
    document.body.appendChild(sparkleContainer);
  }

  // Add sparkle CSS if not exists
  if (!document.getElementById("heartSparkleStyles")) {
    const styles = document.createElement("style");
    styles.id = "heartSparkleStyles";
    styles.textContent = `
      .heart-sparkle {
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, currentColor 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor;
        animation: sparkleGlow 2s ease-in-out infinite alternate;
      }
      @keyframes sparkleGlow {
        0% { transform: scale(0.8); opacity: 0.8; }
        100% { transform: scale(1.2); opacity: 1; }
      }
      .heart-sparkle.pink { background: radial-gradient(circle, #FF69B4 0%, transparent 70%); color: #FF69B4; }
      .heart-sparkle.blue { background: radial-gradient(circle, #87CEEB 0%, transparent 70%); color: #87CEEB; }
      .heart-sparkle.white { background: radial-gradient(circle, #FFFFFF 0%, transparent 70%); color: #FFFFFF; }
      .heart-sparkle.gold { background: radial-gradient(circle, #FFD700 0%, transparent 70%); color: #FFD700; }
    `;
    document.head.appendChild(styles);
  }

  // Create sparkle particles continuously
  function createHeartSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("heart-sparkle");

    // Random sparkle colors
    const colors = ["gold", "pink", "blue", "white"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.classList.add(randomColor);

    // Random position around the heart center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angle = Math.random() * Math.PI * 2;
    const radius = 60 + Math.random() * 80; // Close to heart area

    const startX = centerX + Math.cos(angle) * radius;
    const startY = centerY + Math.sin(angle) * radius;

    sparkle.style.left = startX + "px";
    sparkle.style.top = startY + "px";

    // Random velocity - sparkles move outward
    const speed = 1 + Math.random() * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    sparkleContainer.appendChild(sparkle);

    // Animate sparkle moving outward
    let posX = startX;
    let posY = startY;
    let opacity = 1;
    let scale = 0.5 + Math.random() * 0.5;
    let time = 0;

    function animateHeartSparkle() {
      time += 16; // ~60fps
      posX += vx * 0.5; // Chậm hơn để ở gần trái tim
      posY += vy * 0.5;

      // Twinkle effect vĩnh viễn - không fade out
      const twinkle = Math.sin(time * 0.008) * 0.3 + 0.7;
      opacity = twinkle; // Không giảm opacity theo thời gian

      // Slight scale variation for twinkling
      const scaleVariation = Math.sin(time * 0.015) * 0.3 + 1;

      sparkle.style.left = posX + "px";
      sparkle.style.top = posY + "px";
      sparkle.style.opacity = Math.max(0.3, opacity); // Minimum opacity để luôn nhìn thấy
      sparkle.style.transform = `scale(${scale * scaleVariation})`;

      // Respawn sparkle nếu đi quá xa - tạo hiệu ứng vĩnh viễn
      if (
        posX < -100 ||
        posX > window.innerWidth + 100 ||
        posY < -100 ||
        posY > window.innerHeight + 100
      ) {
        // Reset position về gần trái tim
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newAngle = Math.random() * Math.PI * 2;
        const newRadius = 60 + Math.random() * 80;

        posX = centerX + Math.cos(newAngle) * newRadius;
        posY = centerY + Math.sin(newAngle) * newRadius;

        // Reset velocity
        const speed = 1 + Math.random() * 2;
        vx = Math.cos(newAngle) * speed;
        vy = Math.sin(newAngle) * speed;
      }

      requestAnimationFrame(animateHeartSparkle);
    }

    animateHeartSparkle();
  }

  // Create sparkles continuously
  const heartSparkleInterval = setInterval(() => {
    // Create 2-4 sparkles at once
    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      setTimeout(createHeartSparkle, i * 100);
    }
  }, 300);

  // Lấp lánh vĩnh viễn - không cleanup
  // heartSparkleInterval sẽ chạy mãi mãi
}

// Text morphing
function morphToNextText() {
  currentIndex++;

  // Kiểm tra nếu vừa kết thúc countdown (index 2 = "1")
  if (currentIndex === 3) {
    isCountdownPhase = false;
    console.log("🎯 Countdown finished, starting main messages");
  }

  if (currentIndex >= texts.length) {
    // Animation finished
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";

    // Check what to show after text animation
    if (gif === "heart-effect") {
      startParticleHeart();
    } else if (gif === "sparkle-heart-effect") {
      startSparkleHeart();
    } else if (sticker.src && sticker.src.trim() !== "") {
      sticker.style.display = "block";
      console.log("🖼️ Showing sticker:", sticker.src);
    } else {
      startParticleHeart();
    }

    stopAnimation = true;
    return;
  }

  interpolateParticles(generateDots(texts[currentIndex]));
  lastMorphTime = Date.now();
}

// Array để lưu các lấp lánh trắng
let whiteSparkles = [];

// Function tạo hiệu ứng lấp lánh trắng
function createWhiteSparkle() {
  const sparkle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.8, // Nhỏ hơn để giảm lag
    alpha: 1,
    life: 30 + Math.random() * 20, // Tuổi thọ ngắn hơn
  };
  whiteSparkles.push(sparkle);
}

// Function vẽ và cập nhật lấp lánh trắng
function drawWhiteSparkles() {
  // Giới hạn cực mạnh số lượng sparkles
  if (whiteSparkles.length > 4) {
    whiteSparkles.splice(4);
  }

  for (let i = whiteSparkles.length - 1; i >= 0; i--) {
    const sparkle = whiteSparkles[i];

    // Vẽ đơn giản nhất có thể, không dùng save/restore
    const oldAlpha = ctx.globalAlpha;
    ctx.globalAlpha = sparkle.alpha;
    ctx.fillStyle = "#FFFFFF";

    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size * 0.8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.globalAlpha = oldAlpha; // Reset alpha

    // Cập nhật rất nhanh
    sparkle.life -= 3;
    sparkle.alpha = sparkle.life / 30;

    // Xóa khi hết thời gian
    if (sparkle.life <= 0) {
      whiteSparkles.splice(i, 1);
    }
  }
}

// Optimized sparkles for mobile performance
function drawWhiteSparklesOptimized() {
  // Limit sparkles more aggressively on mobile
  if (whiteSparkles.length > 2) {
    whiteSparkles.splice(2);
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";

  for (let i = whiteSparkles.length - 1; i >= 0; i--) {
    const sparkle = whiteSparkles[i];

    // Simple rectangle instead of complex shapes for performance
    ctx.globalAlpha = sparkle.alpha;
    ctx.fillRect(sparkle.x - 1, sparkle.y - 1, 2, 2);
    ctx.fillRect(sparkle.x - 3, sparkle.y, 6, 1);
    ctx.fillRect(sparkle.x, sparkle.y - 3, 1, 6);

    sparkle.life -= 4; // Faster decay
    sparkle.alpha = sparkle.life / 30;

    if (sparkle.life <= 0) {
      whiteSparkles.splice(i, 1);
    }
  }

  ctx.globalAlpha = 1;
}

// Main text animation loop
let animationFrameCount = 0;
function animate() {
  if (stopAnimation) {
    console.log("🛑 Animation stopped");
    return;
  }

  animationFrameCount++;

  updateParticles();
  drawParticles();

  const allParticlesReached = particles.every(
    (p) => Math.abs(p.x - p.tx) < 0.5 && Math.abs(p.y - p.ty) < 0.5
  );

  // Dynamic delay: nhanh cho countdown, chậm cho messages
  const currentDelay = isCountdownPhase ? 800 : morphDelay; // 800ms cho countdown, 500ms cho messages

  if (allParticlesReached && Date.now() - lastMorphTime > currentDelay) {
    console.log(
      "🔄 Morphing to next text...",
      isCountdownPhase ? "(Countdown)" : "(Message)"
    );
    morphToNextText();
  }

  // Adaptive FPS based on device performance
  const frameDelay = performanceMode ? Math.floor(1000 / animationFPS) : 16;

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, frameDelay);
}

// Initialize animation
console.log("🎬 Initializing animation with first text:", texts[0]);
const firstDots = generateDots(texts[0]);
particles = firstDots.map((dot) => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
  tx: dot.x,
  ty: dot.y,
  progress: 0,
  speed: 0.1 + 0.08 * Math.random(),
}));

canvas.style.display = "none";

// Start animation
setTimeout(() => {
  console.log("🎬 Starting canvas animation!");
  console.log("🎨 Canvas element:", canvas);
  console.log("📏 Canvas dimensions:", canvas.width, "x", canvas.height);
  console.log("🔤 First text to animate:", texts[0]);
  console.log("🔵 Number of particles:", particles.length);

  canvas.style.display = "block";
  canvas.style.zIndex = "1000";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";

  console.log("✅ Canvas should be visible now with styles:", {
    display: canvas.style.display,
    zIndex: canvas.style.zIndex,
    position: canvas.style.position,
  });

  lastMorphTime = Date.now();
  animate();
}, 1000);

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  shapeCanvas.width = canvas.width;
  shapeCanvas.height = canvas.height;
});

// Sparkle Heart Effect Function - Only particles effect like tim.html
function startSparkleHeart() {
  console.log("💝 Starting Sparkle Heart Effect with particles only");

  // Start the particle heart effect (same as heart-effect)
  startParticleHeart();

  // Create sparkle container for additional sparkles only
  let sparkleContainer = document.getElementById("mainSparkleContainer");
  if (!sparkleContainer) {
    sparkleContainer = document.createElement("div");
    sparkleContainer.id = "mainSparkleContainer";
    sparkleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 5000;
      pointer-events: none;
    `;
    document.body.appendChild(sparkleContainer);
  }

  // Add sparkle CSS if not exists
  if (!document.getElementById("sparkleHeartStyles")) {
    const styles = document.createElement("style");
    styles.id = "sparkleHeartStyles";
    styles.textContent = `
      .main-sparkle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, currentColor 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 15px currentColor, 0 0 30px currentColor;
        animation: mainSparkleGlow 1.5s ease-in-out infinite alternate;
      }
      @keyframes mainSparkleGlow {
        0% { transform: scale(0.7) rotate(0deg); opacity: 0.7; }
        100% { transform: scale(1.3) rotate(180deg); opacity: 1; }
      }
      .main-sparkle.pink { background: radial-gradient(circle, #FF69B4 0%, transparent 70%); color: #FF69B4; }
      .main-sparkle.blue { background: radial-gradient(circle, #87CEEB 0%, transparent 70%); color: #87CEEB; }
      .main-sparkle.white { background: radial-gradient(circle, #FFFFFF 0%, transparent 70%); color: #FFFFFF; }
    `;
    document.head.appendChild(styles);
  }

  // Create sparkle particles
  function createMainSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("main-sparkle");

    // Random sparkle colors
    const colors = ["", "pink", "blue", "white"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (randomColor) sparkle.classList.add(randomColor);

    // Random position around the heart
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angle = Math.random() * Math.PI * 2;
    const radius = 80 + Math.random() * 60;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    // Random velocity
    const vx = (Math.random() - 0.5) * 4;
    const vy = -Math.random() * 3 - 2;

    sparkleContainer.appendChild(sparkle);

    // Animate sparkle
    let posX = x;
    let posY = y;
    let opacity = 1;
    let scale = 0;

    function animateSparkle() {
      posX += vx * 0.3; // Chậm hơn để ở gần trái tim
      posY += vy * 0.3;

      // Twinkling effect thay vì fade out
      const twinkle =
        Math.sin(Date.now() * 0.005 + Math.random() * 10) * 0.3 + 0.7;
      opacity = twinkle; // Không giảm opacity
      scale = Math.sin(Date.now() * 0.003) * 0.3 + 1; // Animation scale

      sparkle.style.left = posX + "px";
      sparkle.style.top = posY + "px";
      sparkle.style.opacity = Math.max(0.4, opacity); // Minimum opacity
      sparkle.style.transform = `scale(${scale})`;

      // Respawn nếu đi quá xa
      if (
        posX < -100 ||
        posX > window.innerWidth + 100 ||
        posY < -100 ||
        posY > window.innerHeight + 100
      ) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newAngle = Math.random() * Math.PI * 2;
        const newRadius = 80 + Math.random() * 60;

        posX = centerX + Math.cos(newAngle) * newRadius;
        posY = centerY + Math.sin(newAngle) * newRadius;
        vx = (Math.random() - 0.5) * 4;
        vy = -Math.random() * 3 - 2;
      }

      requestAnimationFrame(animateSparkle);
    }

    animateSparkle();
  }

  // Create sparkles continuously
  const sparkleInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      setTimeout(createMainSparkle, i * 50);
    }
  }, 200);

  // Main sparkles cũng vĩnh viễn - không cleanup
  // sparkleInterval sẽ chạy mãi mãi
}

console.log("✅ Tim.html heart effect initialized");
