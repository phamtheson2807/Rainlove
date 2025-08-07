// Heart Particle Storm Effect - Hàng ngàn particles nhỏ tạo thành hình trái tim
console.log("💖 Loading Heart Particle Storm Effect...");

function startPerfectHeartEffect() {
  console.log("💖 Starting Heart Particle Storm Effect");

  const canvas = document.getElementById("pinkboard");
  if (!canvas) {
    console.error("Canvas pinkboard not found!");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  canvas.style.background =
    "linear-gradient(135deg, #0a0a1e, #1a0a2e, #2a1845)";

  // Particle storm array
  const particles = [];
  const maxParticles = 1500;

  // Heart shape mathematics (parametric equation)
  function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return { x: x * 6, y: -y * 6 };
  }

  // Generate heart outline points
  function generateHeartOutline() {
    const points = [];
    const steps = 100;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const point = getHeartPoint(t);
      points.push({
        x: canvas.width / 2 + point.x,
        y: canvas.height / 2 + point.y + 20,
      });
    }
    return points;
  }

  // Particle class for heart storm
  class Particle {
    constructor(targetX, targetY, delay = 0) {
      // Start from random positions around the screen
      const angle = Math.random() * Math.PI * 2;
      const distance = 300 + Math.random() * 200;

      this.startX = canvas.width / 2 + Math.cos(angle) * distance;
      this.startY = canvas.height / 2 + Math.sin(angle) * distance;

      this.x = this.startX;
      this.y = this.startY;

      this.targetX = targetX + (Math.random() - 0.5) * 8; // Slight randomness
      this.targetY = targetY + (Math.random() - 0.5) * 8;

      this.vx = 0;
      this.vy = 0;
      this.speed = 0.008 + Math.random() * 0.012;
      this.delay = delay;
      this.life = 0;

      // Visual properties
      this.size = 1.5 + Math.random() * 2;
      this.opacity = 0.6 + Math.random() * 0.4;
      this.hue = 300 + Math.random() * 60; // Pink to magenta range

      this.reached = false;
      this.glowPhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.life += 0.016;

      if (this.life < this.delay) return;

      if (!this.reached) {
        // Move towards target with easing
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
          this.reached = true;
          this.x = this.targetX;
          this.y = this.targetY;
        } else {
          this.vx += dx * this.speed;
          this.vy += dy * this.speed;
          this.vx *= 0.95; // Damping for smooth movement
          this.vy *= 0.95;
          this.x += this.vx;
          this.y += this.vy;
        }
      } else {
        // Subtle floating when reached
        this.glowPhase += 0.02;
        this.y += Math.sin(this.glowPhase) * 0.1;
        this.size = 1.5 + Math.random() * 2 + Math.sin(this.glowPhase) * 0.3;
        this.opacity = 0.4 + Math.sin(this.glowPhase * 0.5) * 0.4;
      }
    }

    draw() {
      if (this.life < this.delay) return;

      ctx.save();
      ctx.globalAlpha = this.opacity;

      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 3
      );
      gradient.addColorStop(0, `hsl(${this.hue}, 100%, 70%)`);
      gradient.addColorStop(0.5, `hsl(${this.hue}, 100%, 50%)`);
      gradient.addColorStop(1, `hsl(${this.hue}, 100%, 30%)`);

      // Draw glowing particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add extra glow
      ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Create particle storm
  function createParticleStorm() {
    const outline = generateHeartOutline();

    // Create particles for heart outline
    outline.forEach((point, index) => {
      const delay = (index / outline.length) * 2; // Staggered appearance

      // Create multiple particles per outline point for density
      for (let i = 0; i < 8; i++) {
        particles.push(
          new Particle(point.x, point.y, delay + Math.random() * 0.5)
        );
      }
    });

    // Fill inside of heart with particles
    for (let i = 0; i < 600; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * 80; // Random radius inside heart
      const point = getHeartPoint(t);
      const scale = r / 100;

      const targetX = canvas.width / 2 + point.x * scale;
      const targetY = canvas.height / 2 + point.y * scale + 20;

      particles.push(new Particle(targetX, targetY, Math.random() * 3));
    }

    console.log(`💖 Created ${particles.length} particles for heart storm`);
  }

  // Animation loop
  function animate() {
    // Clear with dark gradient background
    ctx.fillStyle = "rgba(10, 10, 30, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw all particles
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  // Handle window resize
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recreate particles with new center
    particles.length = 0;
    createParticleStorm();
  }

  window.addEventListener("resize", handleResize);

  // Start the magic
  createParticleStorm();
  animate();

  // Show "I Love You" text after particles form heart
  setTimeout(() => {
    const bigHeart = document.getElementById("bigHeart");
    if (bigHeart) {
      bigHeart.style.display = "block";
      bigHeart.innerHTML = "I Love You";
      bigHeart.style.position = "fixed";
      bigHeart.style.top = "50%";
      bigHeart.style.left = "50%";
      bigHeart.style.transform = "translate(-50%, -50%)";
      bigHeart.style.fontSize = "4rem";
      bigHeart.style.color = "transparent";
      bigHeart.style.background =
        "linear-gradient(45deg, #ff69b4, #ff1493, #c71585)";
      bigHeart.style.backgroundClip = "text";
      bigHeart.style.webkitBackgroundClip = "text";
      bigHeart.style.textShadow = "0 0 30px rgba(255,105,180,0.8)";
      bigHeart.style.fontWeight = "bold";
      bigHeart.style.zIndex = "1000";
      bigHeart.style.animation = "heartPulse 2s infinite";

      // Add CSS animation for text
      if (!document.getElementById("heartAnimation")) {
        const style = document.createElement("style");
        style.id = "heartAnimation";
        style.textContent = `
          @keyframes heartPulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, 4000);
}

// Preview version for input.html
function startPerfectHeartPreview() {
  console.log("💖 Starting Heart Storm Preview");

  const canvas = document.getElementById("pinkboard");
  if (!canvas) {
    console.error("Preview canvas not found!");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Smaller canvas for preview
  canvas.width = 400;
  canvas.height = 300;
  canvas.style.display = "block";
  canvas.style.background =
    "linear-gradient(135deg, #0a0a1e, #1a0a2e, #2a1845)";
  canvas.style.borderRadius = "20px";

  const particles = [];

  // Smaller heart for preview
  function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return { x: x * 3, y: -y * 3 }; // Smaller scale for preview
  }

  function generateHeartOutline() {
    const points = [];
    const steps = 50; // Fewer points for preview

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const point = getHeartPoint(t);
      points.push({
        x: canvas.width / 2 + point.x,
        y: canvas.height / 2 + point.y + 10,
      });
    }
    return points;
  }

  class PreviewParticle {
    constructor(targetX, targetY, delay = 0) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 50;

      this.startX = canvas.width / 2 + Math.cos(angle) * distance;
      this.startY = canvas.height / 2 + Math.sin(angle) * distance;

      this.x = this.startX;
      this.y = this.startY;

      this.targetX = targetX + (Math.random() - 0.5) * 4;
      this.targetY = targetY + (Math.random() - 0.5) * 4;

      this.vx = 0;
      this.vy = 0;
      this.speed = 0.01 + Math.random() * 0.01;
      this.delay = delay;
      this.life = 0;

      this.size = 1 + Math.random() * 1.5;
      this.opacity = 0.6 + Math.random() * 0.4;
      this.hue = 300 + Math.random() * 60;

      this.reached = false;
      this.glowPhase = Math.random() * Math.PI * 2;
    }

    update() {
      this.life += 0.016;

      if (this.life < this.delay) return;

      if (!this.reached) {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
          this.reached = true;
          this.x = this.targetX;
          this.y = this.targetY;
        } else {
          this.vx += dx * this.speed;
          this.vy += dy * this.speed;
          this.vx *= 0.95;
          this.vy *= 0.95;
          this.x += this.vx;
          this.y += this.vy;
        }
      } else {
        this.glowPhase += 0.02;
        this.opacity = 0.4 + Math.sin(this.glowPhase * 0.5) * 0.4;
      }
    }

    draw() {
      if (this.life < this.delay) return;

      ctx.save();
      ctx.globalAlpha = this.opacity;

      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 2
      );
      gradient.addColorStop(0, `hsl(${this.hue}, 100%, 70%)`);
      gradient.addColorStop(1, `hsl(${this.hue}, 100%, 30%)`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.restore();
    }
  }

  function createPreviewStorm() {
    const outline = generateHeartOutline();

    // Create particles for outline
    outline.forEach((point, index) => {
      const delay = (index / outline.length) * 1.5;

      for (let i = 0; i < 4; i++) {
        particles.push(
          new PreviewParticle(point.x, point.y, delay + Math.random() * 0.3)
        );
      }
    });

    // Fill inside
    for (let i = 0; i < 150; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * 40;
      const point = getHeartPoint(t);
      const scale = r / 50;

      const targetX = canvas.width / 2 + point.x * scale;
      const targetY = canvas.height / 2 + point.y * scale + 10;

      particles.push(new PreviewParticle(targetX, targetY, Math.random() * 2));
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(10, 10, 30, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  createPreviewStorm();
  animate();
}

// Export functions
if (typeof window !== "undefined") {
  window.startPerfectHeartEffect = startPerfectHeartEffect;
  window.startPerfectHeartPreview = startPerfectHeartPreview;
}
