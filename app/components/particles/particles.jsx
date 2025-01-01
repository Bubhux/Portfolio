// app/components/particles.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

import styles from "./particles.module.css";


export function ParticlesBackground({ isActive = false, sectionId }) {
    const [isClient, setIsClient] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isAutoClicking, setIsAutoClicking] = useState(false);
    const particlesRef = useRef();
    const containerRef = useRef();

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback((container) => {
        //console.log(container);
    }, []);

    useEffect(() => {
        if (!isActive) return;

        setIsClient(typeof window !== "undefined");

        const handleScroll = () => {
            const section = document.getElementById(sectionId);
            const rect = section.getBoundingClientRect();
            const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
            setIsVisible(isInViewport);

            if (isInViewport) {
                setIsAutoClicking(true);
            } else {
                setIsAutoClicking(false);
            }
        };

        if (isClient) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isClient, isActive, sectionId]);

    useEffect(() => {
        if (isAutoClicking && containerRef.current) {
            const interval = setInterval(() => {
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                containerRef.current.dispatchEvent(clickEvent);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isAutoClicking]);

    if (!isClient) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={styles.skillsBackground}
            data-visible={isVisible ? 'true' : 'false'}
        >
            <Particles
                id={`tsparticles-${sectionId}`}
                init={particlesInit}
                loaded={particlesLoaded}
                ref={particlesRef}
                options={{
                    fpsLimit: 60,                                                                                         // Limite du nombre de frames par seconde
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,                                                                             // Permet d'activer l'événement de clic
                                mode: "push",                                                                             // Mode de l'événement : "push" ajoute des particules
                                position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight } // Position aléatoire pour chaque clic
                            },
                            onHover: {
                                enable: false,                                                                            // Désactive l'effet de survol
                                mode: "repulse"                                                                           // Mode survol : "repulse" fait éloigner les particules
                            },
                            resize: false                                                                                 // Désactive le redimensionnement dynamique des particules
                        },
                        modes: {
                            push: {
                                quantity: 4                                                                               // Nombre de particules ajoutées à chaque clic
                            },
                            repulse: {
                                distance: 200,                                                                            // Distance maximale pour l'effet "repulse"
                                duration: 0.4                                                                             // Durée de l'effet "repulse"
                            }
                        }
                    },
                    particles: {
                        color: { value: ["#8d8d8d", "#535151"] },    // Couleur des particules, avec une alternance entre gris
                        links: {
                            color: ["#8d8d8d", "#535151"],           // Couleur des liens entre les particules
                            distance: 300,                           // Distance maximale à laquelle les particules sont reliées
                            enable: true,                            // Active les liens entre les particules
                            opacity: 0.8,                            // Opacité des liens
                            width: 1,                                // Largeur des liens
                            blink: true,                             // Fait clignoter les liens
                            triangles: {
                                enable: false,                       // Désactive les triangles entre les liens
                                opacity: 0.2,                        // Opacité des triangles
                                color: "#ffff"                       // Couleur des triangles
                            }
                        },
                        collisions: {
                            enable: true                             // Active les collisions entre particules
                        },
                        move: {
                            direction: "none",                       // Aucune direction prédéfinie pour les particules
                            enable: true,                            // Permet le mouvement des particules
                            outModes: {
                                default: "bounce"                    // Les particules rebondissent lorsqu'elles sortent du cadre
                            },
                            random: false,                           // Les particules ne se déplacent pas de manière aléatoire
                            speed: 1,                                // Vitesse de mouvement des particules
                            straight: false                          // Les particules ne se déplacent pas en ligne droite
                        },
                        number: {
                            density: {
                                enable: true,                        // Active la densité de particules
                                area: 800                            // Surface sur laquelle les particules sont réparties
                            },
                            value: 30                                // Nombre total de particules générées
                        },
                        opacity: {
                            animation: {
                                enable: true,                        // Active l'animation d'opacité des particules
                                speed: 1,                            // Vitesse de l'animation d'opacité
                                minimumValue: 0.4,                   // Valeur minimale d'opacité
                                sync: false                          // L'animation n'est pas synchronisée entre toutes les particules
                            },
                            value: 0.8                               // Opacité de base des particules
                        },
                        shape: {
                            type: "circle"                           // Forme des particules : ici, un cercle
                        },
                        size: {
                            value: { min: 2, max: 8 },               // Taille des particules, avec une plage entre 2 et 8
                            animation: {
                                enable: true,                        // Active l'animation de taille des particules
                                speed: 5,                            // Vitesse de l'animation de taille
                                minimumValue: 2,                     // Valeur minimale de taille
                                sync: false                          // L'animation de taille n'est pas synchronisée entre toutes les particules
                            }
                        }
                    },
                    detectRetina: true                               // Active la détection de rétine pour des particules plus nettes sur les écrans haute résolution
                }}
            />
        </div>
    );
}
