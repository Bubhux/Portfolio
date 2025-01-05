// app/routes/home/displacement-particules.jsx
import { startTransition, useEffect, useRef, useState } from 'react';

import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from '~/hooks';
import { AmbientLight, DirectionalLight, LinearSRGBColorSpace, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, PlaneGeometry, UniformsUtils, Vector2, WebGLRenderer, TextureLoader } from 'three';
import { media } from '~/utils/style';
import { throttle } from '~/utils/throttle';
import { cleanRenderer, cleanScene, removeLights } from '~/utils/three';

import fragmentShader from './displacement-particules-fragment.glsl?raw';
import vertexShader from './displacement-particules-vertex.glsl?raw';
import styles from './displacement-particules.module.css';


const springConfig = {
    stiffness: 30,
    damping: 20,
    mass: 2,
};

export const preloadDisplacementParticlesResources = () => {
    return new Promise((resolve, reject) => {
        const textureLoader = new TextureLoader();

        const texture = textureLoader.load(
            '/static/img/particules.png',
            () => {
                texture.flipY = false;
                texture.premultiplyAlpha = false;
                resolve({ texture });
            },
            undefined,
            error => {
                reject(error);
            }
        );
    });
};

export const DisplacementParticles = ({ preloadedResources, ...props }) => {
    const { texture } = preloadedResources;
    const { theme } = useTheme();
    const start = useRef(Date.now());
    const canvasRef = useRef();
    const mouse = useRef();
    const renderer = useRef();
    const camera = useRef();
    const scene = useRef();
    const lights = useRef();
    const uniforms = useRef();
    const material = useRef();
    const geometry = useRef();
    const sphere = useRef();
    const reduceMotion = useReducedMotion();
    const isInViewport = useInViewport(canvasRef);
    const windowSize = useWindowSize();
    const rotationX = useSpring(0, springConfig);
    const rotationY = useSpring(0, springConfig);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!texture) {
            console.error('Texture not loaded');
        }
    }, [texture]);

    if (!texture) {
        return null;
    }

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const { innerWidth, innerHeight } = window;
        mouse.current = new Vector2(0.8, 0.5);
        renderer.current = new WebGLRenderer({
            canvas: canvasRef.current,
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
            failIfMajorPerformanceCaveat: true,
        });
        renderer.current.setSize(innerWidth, innerHeight);
        renderer.current.setPixelRatio(1);
        renderer.current.outputColorSpace = LinearSRGBColorSpace;

        camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
        camera.current.position.z = 52;

        scene.current = new Scene();

        material.current = new MeshPhongMaterial({
            map: texture,
            onBeforeCompile: shader => {
                uniforms.current = UniformsUtils.merge([
                    shader.uniforms,
                    { time: { type: 'f', value: 0 } },
                ]);

                shader.uniforms = uniforms.current;
                shader.vertexShader = vertexShader;
                shader.fragmentShader = fragmentShader;
            },
        });

        startTransition(() => {
            geometry.current = new PlaneGeometry(60, 40, 20, 20);

            sphere.current = new Mesh(geometry.current, material.current);
            sphere.current.position.z = 0;
            scene.current.add(sphere.current);
        });

        return () => {
            cleanScene(scene.current);
            cleanRenderer(renderer.current);
        };
    }, [texture]);

    useEffect(() => {
        const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.4 : 1.5);
        const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.0 : 0.2);

        dirLight.position.z = 200;
        dirLight.position.x = 100;
        dirLight.position.y = 100;

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

        // Render a single frame on resize when not animating
        if (reduceMotion) {
            renderer.current.render(scene.current, camera.current);
        }

        if (width <= media.mobile) {
            sphere.current.position.x = 14;
            sphere.current.position.y = 10;
        } else if (width <= media.tablet) {
            sphere.current.position.x = 18;
            sphere.current.position.y = 14;
        } else {
            sphere.current.position.x = 22;
            sphere.current.position.y = 16;
        }
    }, [reduceMotion, windowSize]);

    useEffect(() => {
        const sensitivity = 0.2;

        const onMouseMove = throttle(event => {
            const position = {
                x: (event.clientX / window.innerWidth) * sensitivity,
                y: (event.clientY / window.innerHeight) * sensitivity,
            };

            rotationX.set(position.y / 2);
            rotationY.set(position.x / 2);
        }, 200);

        if (!reduceMotion && isInViewport) {
            window.addEventListener('mousemove', onMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [isInViewport, reduceMotion, rotationX, rotationY]);

    useEffect(() => {
        let animation;
        let lastRender = 0;

        const animate = () => {
            const now = Date.now();

            if (now - lastRender < 1000 / 30) {
                animation = requestAnimationFrame(animate);
                return;
            }
            lastRender = now;

            if (uniforms.current) {
                uniforms.current.time.value = 0.00005 * (now - start.current);
            }
            sphere.current.rotation.z += 0.001;
            sphere.current.rotation.x = rotationX.get();
            sphere.current.rotation.y = rotationY.get();

            renderer.current.render(scene.current, camera.current);
            animation = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (!animation) {
                animation = requestAnimationFrame(animate);
            }
        };

        const stopAnimation = () => {
            if (animation) {
                cancelAnimationFrame(animation);
                animation = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && isInViewport && !reduceMotion) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        if (!reduceMotion && isInViewport && document.visibilityState === "visible") {
            startAnimation();
        } else {
            renderer.current.render(scene.current, camera.current);
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            stopAnimation();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isInViewport, reduceMotion, rotationX, rotationY]);

    return (
        <Transition in={isReady} timeout={3000} nodeRef={canvasRef}>
            {({ visible, nodeRef }) => (
                <canvas
                    aria-hidden
                    className={styles.canvas}
                    data-visible={visible}
                    ref={nodeRef}
                    {...props}
                />
            )}
        </Transition>
    );
};
