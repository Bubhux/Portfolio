// app/routes/home/displacement-sphere.jsx
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from '~/hooks';
import { startTransition, useEffect, useRef } from 'react';
import { AmbientLight, DirectionalLight, LinearSRGBColorSpace, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute, PerspectiveCamera, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three';
import { media } from '~/utils/style';
import { throttle } from '~/utils/throttle';
import { cleanRenderer, cleanScene, removeLights } from '~/utils/three';
import fragmentShader from './displacement-sphere-fragment.glsl?raw';
import vertexShader from './displacement-sphere-vertex.glsl?raw';
import styles from './displacement-sphere.module.css';
import galaxyTexture from '/static/img/smoke.png';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';


const springConfig = {
    stiffness: 30,
    damping: 20,
    mass: 2,
};

const DisplacementParticlesMaterial = shaderMaterial(
    {
        time: 0,
        texture: new THREE.TextureLoader().load(galaxyTexture),
    },
    vertexShader,
    fragmentShader
);

const DisplacementParticles = () => {
    const pointsRef = useRef();

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.material.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <points ref={pointsRef} material={DisplacementParticlesMaterial}>
            <bufferGeometry />
        </points>
    );
};

const createCircularTexture = (imageUrl, size) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 0, 0, size, size);
            resolve(canvas.toDataURL());
        };

        img.onerror = (error) => reject(error);
    });
};

export const GalaxyEffect = (props) => {
    const { theme } = useTheme();
    const start = useRef(Date.now());
    const canvasRef = useRef();
    const mouse = useRef();
    const renderer = useRef();
    const camera = useRef();
    const scene = useRef();
    const lights = useRef([]);
    const uniforms = useRef();
    const reduceMotion = useReducedMotion();
    const isInViewport = useInViewport(canvasRef);
    const windowSize = useWindowSize();
    const rotationX = useSpring(0, springConfig);
    const rotationY = useSpring(0, springConfig);
    const geometry = useRef();

    useEffect(() => {
        const { innerWidth, innerHeight } = window;
        mouse.current = new Vector2(0.8, 0.5);
        renderer.current = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: true,
        });
        renderer.current.setSize(innerWidth, innerHeight);
        renderer.current.setPixelRatio(1);
        renderer.current.outputColorSpace = LinearSRGBColorSpace;

        camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
        camera.current.position.z = 52;

        scene.current = new Scene();

        // Créez la texture circulaire
        createCircularTexture(galaxyTexture, 256) // Ajuste la taille souhaitée
            .then((circularTexture) => {
                // Applique la texture circulaire au matériau de particules
                const pointMaterial = new PointsMaterial({
                    size: 1, // Augmente la taille
                    transparent: true,
                    opacity: 0.9, // Ajustez si nécessaire
                    alphaTest: 0.5, // Tester pour la transparence
                    map: new TextureLoader().load(circularTexture),
                });

                startTransition(() => {
                    geometry.current = new BufferGeometry();
                    const positions = [];
                    const numParticles = 1000; // Ajuste le nombre de particules
                    const cloudSize = 30; // Nouvelle taille du nuage

                    for (let i = 0; i < numParticles; i++) {
                        const x = (Math.random() - 0.5) * cloudSize; // Utilise cloudSize pour réduire la taille
                        const y = (Math.random() - 0.5) * cloudSize;
                        const z = (Math.random() - 0.5) * cloudSize;
                        positions.push(x, y, z);
                    }

                    geometry.current.setAttribute('position', new Float32BufferAttribute(positions, 3));

                    // Utilise Points pour les particules
                    const particles = new Points(geometry.current, pointMaterial);

                    // Déplace le nuage de particules
                    particles.position.set(25, 5, 0); 
                    scene.current.add(particles);
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la création de la texture circulaire :', error);
            });

        return () => {
            cleanScene(scene.current);
            cleanRenderer(renderer.current);
        };
    }, []);

    useEffect(() => {
        // Configuration des lumières
        const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.8 : 2.0);
        const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.7 : 0.4);

        dirLight.position.set(100, 100, 200);
        lights.current = [dirLight, ambientLight];
        lights.current.forEach(light => scene.current.add(light));

        return () => {
            removeLights(lights.current);
        };
    }, [theme]);

    useEffect(() => {
        const { width, height } = windowSize;
        const adjustedHeight = height + height * 0.3;

        renderer.current.setSize(width, adjustedHeight);
        camera.current.aspect = width / adjustedHeight;
        camera.current.updateProjectionMatrix();

        // Ajuste la position des particules selon la taille de la fenêtre
        const particles = scene.current.children.find(child => child instanceof Points);
        if (particles) {
            if (width <= media.mobile) {
                particles.position.set(14, 10, 0);
            } else if (width <= media.tablet) {
                particles.position.set(18, 14, 0);
            } else {
                particles.position.set(22, 16, 0);
            }
        }
    }, [reduceMotion, windowSize]);

    useEffect(() => {
        const onMouseMove = throttle(event => {
            const position = {
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight,
            };

            rotationX.set(position.y / 2);
            rotationY.set(position.x / 2);
        }, 100);

        if (!reduceMotion && isInViewport) {
            window.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isInViewport, reduceMotion, rotationX, rotationY]);

    useEffect(() => {
        let animation;

        const animate = () => {
            animation = requestAnimationFrame(animate);

            if (uniforms.current) {
                uniforms.current.time.value = 0.00005 * (Date.now() - start.current);
            }

            // Animation des particules
            const particles = scene.current.children.find(child => child instanceof Points);
            if (particles) {
                particles.rotation.z += 0.001;
                particles.rotation.x = rotationX.get();
                particles.rotation.y = rotationY.get();
            }

            renderer.current.render(scene.current, camera.current);
        };

        if (!reduceMotion && isInViewport) {
            animate();
        } else {
            renderer.current.render(scene.current, camera.current);
        }

        return () => {
            cancelAnimationFrame(animation);
        };
    }, [isInViewport, reduceMotion, rotationX, rotationY]);

    return (
        <Transition in timeout={3000} nodeRef={canvasRef}>
            {({ visible, nodeRef }) => (
                <canvas
                    aria-hidden
                    className={styles.canvas}
                    data-visible={visible}
                    ref={nodeRef}
                    {...props}
                >
                    <Canvas>
                        <ambientLight />
                        <directionalLight />
                        <DisplacementParticles />
                    </Canvas>
                </canvas>
            )}
        </Transition>
    );
};
