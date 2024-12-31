// app/components/particles.jsx
import { useEffect, useRef } from 'react';
import styles from './particles.module.css';


export function ParticlesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.2/particles.min.js";
        script.async = true;

        let particles = null;

        script.onload = () => {
            console.log("Particles.js script loaded");

            if (canvasRef.current) {
                console.log("Initializing particles");

                particles = window.Particles.init({
                    selector: `.${styles.skillsBackground}`,
                    color: ['#393939', '#535151', '#8d8d8d'],
                    connectParticles: true,
                    sizeVariations: 5,
                    maxParticles: 250,
                    speed: 2,
                    minDistance: 200,
                });
            }

            // Gérer la visibilité pour pause/reprendre
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    if (particles && typeof particles.pauseAnimation === 'function') {
                        particles.pauseAnimation();
                    }
                } else {
                    if (particles && typeof particles.resumeAnimation === 'function') {
                        particles.resumeAnimation();
                    }
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Cleanup
            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                if (particles && typeof particles.destroy === 'function') {
                    particles.destroy();
                }
            };
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.skillsBackground} />;
}