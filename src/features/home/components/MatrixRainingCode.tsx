// source: https://github.com/Mif2006/MatrixWebsite
import { useEffect, useRef } from "react";

import { useTheme } from "@/providers/theme";

const MatrixRainingCode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let columns = Math.floor(width / 20);
    const characters =
      "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const charArray = characters.split("");
    let drops: number[] = Array(columns).fill(1);

    const frameRate = 25;
    let lastFrameTime = Date.now();

    const draw = () => {
      const isDark = theme === "dark";

      const backgroundColor = isDark
        ? "rgba(0, 0, 0, 0.1)"
        : "rgba(255, 255, 255, 0.1)";
      const rootStyles = getComputedStyle(document.documentElement);
      const coinPink = rootStyles.getPropertyValue("--coin-pink").trim();
      const textColor = isDark ? coinPink : "#1a1a1a";

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = textColor;
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastFrameTime;

      if (elapsedTime > 1000 / frameRate) {
        draw();
        lastFrameTime = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const resetCanvas = () => {
      ctx.clearRect(0, 0, width, height);
      drops = Array(columns).fill(1);
    };

    resetCanvas();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 20);
      drops = Array(columns).fill(1);
    };

    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    if (!isMobileDevice) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (!isMobileDevice) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [theme]);

  return (
    <canvas
      className="matrix-canvas fixed left-0 top-0 z-[-1]"
      ref={canvasRef}
    ></canvas>
  );
};

export default MatrixRainingCode;
