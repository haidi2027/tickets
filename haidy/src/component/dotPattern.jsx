import React, { useCallback, useEffect, useRef } from "react";

const DotPattern = ({
    children,
    className = "",
    dotSize = 4,
    gap = 25,
    baseColor = "#444444",
    glowColor = "#ff3333",
    proximity = 120,
    glowIntensity = 1,
    waveSpeed = 0.015,
    waveOpacity = 0.8,
    waveScale = 1,
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const mouseRef = useRef({
        x: -1000,
        y: -1000,
    });

    const dotsRef = useRef([]);
    const timeRef = useRef(0);

    const hexToRgb = (hex) => {
        const value = hex.replace("#", "");

        const bigint = parseInt(value, 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    const baseRgb = hexToRgb(baseColor);
    const glowRgb = hexToRgb(glowColor);

    const baseR = baseRgb.r;
    const baseG = baseRgb.g;
    const baseB = baseRgb.b;

    const glowR = glowRgb.r;
    const glowG = glowRgb.g;
    const glowB = glowRgb.b;

    // Create dots
    const buildGrid = useCallback(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        if (!container || !canvas) return;

        const rect = container.getBoundingClientRect();

        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext("2d");

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const dots = [];

        for (let y = 0; y < rect.height; y += gap) {
            for (let x = 0; x < rect.width; x += gap) {
                dots.push({
                    x,
                    y,
                    phase: Math.random() * Math.PI * 2,
                });
            }
        }

        dotsRef.current = dots;
    }, [gap]);

    // Draw animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = useCallback(() => {
    const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        ctx.clearRect(0, 0, rect.width, rect.height);

        timeRef.current += waveSpeed;

        const mouse = mouseRef.current;

        dotsRef.current.forEach((dot) => {
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            let opacity = 0.35;
            let scale = 1;
            let glow = 0;

            // Mouse interaction
            if (distance < proximity) {
                const t = 1 - distance / proximity;

                // Smooth easing
                const easedT = t * t * (3 - 2 * t);

                opacity = Math.min(1, waveOpacity + easedT * 0.7);

                scale = waveScale + easedT * 0.8;

                glow = easedT * glowIntensity;
            }

            // Small wave animation
            const wave =
                Math.sin(timeRef.current + dot.phase) * 0.15 + 0.85;

            opacity *= wave;

            const radius = (dotSize / 2) * scale;

            // Glow
            if (glow > 0) {
                const gradient = ctx.createRadialGradient(
                    dot.x,
                    dot.y,
                    0,
                    dot.x,
                    dot.y,
                    radius * 4
                );

                gradient.addColorStop(
                    0,
                    `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4
                    })`
                );

                gradient.addColorStop(
                    0.5,
                    `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1
                    })`
                );

                gradient.addColorStop(
                    1,
                    `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`
                );

                ctx.beginPath();

                ctx.arc(
                    dot.x,
                    dot.y,
                    radius * 4,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = gradient;

                ctx.fill();
            }

            // Dot
            ctx.beginPath();

            ctx.arc(
                dot.x,
                dot.y,
                radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}, ${opacity})`;

            ctx.fill();
        });

        animationRef.current = requestAnimationFrame(draw);
    }, [
    proximity,
    dotSize,
    glowIntensity,
    waveSpeed,
    waveOpacity,
    waveScale,
    baseR,
    baseG,
    baseB,
    glowR,
    glowG,
    glowB,
]);

    // Build grid
    useEffect(() => {
        buildGrid();
        const container = containerRef.current;

        if (!container) return;

        const resizeObserver = new ResizeObserver(() => {
            buildGrid();
        });

        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
        };
    }, [buildGrid]);

    // Animation
    useEffect(() => {
        animationRef.current = requestAnimationFrame(draw);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [draw]);

    // Mouse
    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();

            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = {
                x: -1000,
                y: -1000,
            };
        };

        container.addEventListener(
            "mousemove",
            handleMouseMove
        );

        container.addEventListener(
            "mouseleave",
            handleMouseLeave
        );

        return () => {
            container.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            container.removeEventListener(
                "mouseleave",
                handleMouseLeave
            );
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 overflow-hidden ${className}`}
            style={{
                background: "#06111f",
            }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
            />

            {/* Vignette */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.6) 100%)",
                }}
            />

            {/* Content */}
            {children && (
                <div className="relative z-10 h-full w-full">
                    {children}
                </div>
            )}
        </div>
    );
};

export default DotPattern;