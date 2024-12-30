// app/components/particles.jsx
import { useEffect, useRef } from 'react';

import styles from './particles.module.css';


export function ParticlesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.2/particles.min.js";
        script.async = true;

        script.onload = () => {
            console.log("Particles.js script loaded");

            if (canvasRef.current) {
                console.log("Initializing particles");

                window.Particles.init({
                    selector: `.${styles.skillsBackground}`,
                    color: ['#393939', '#535151', '#8d8d8d'],
                    connectParticles: true,
                    sizeVariations: 5,
                    maxParticles: 250,
                    speed: 2,
                    minDistance: 200,
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.skillsBackground} />;
}
