// app/routes/home/displacement-particules.jsx
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '~/components/theme-provider';
import { Transition } from '~/components/transition';
import { useReducedMotion, useSpring } from 'framer-motion';
import { useInViewport, useWindowSize } from '~/hooks';
import { AmbientLight, DirectionalLight, LinearSRGBColorSpace, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, PlaneGeometry, UniformsUtils, WebGLRenderer, TextureLoader, LinearFilter } from 'three';
import { media } from '~/utils/style';
import { throttle } from '~/utils/throttle';

import fragmentShader from './displacement-particules-fragment.glsl?raw';
import vertexShader from './displacement-particules-vertex.glsl?raw';
import styles from './displacement-particules.module.css';


const springConfig = {
    stiffness: 30,
    damping: 20,
    mass: 2,
};

const cleanUpThreeResources = (resources) => {
    if (!resources) return;

    try {
        if (resources.scene?.dispose) resources.scene.dispose();
        if (resources.renderer?.dispose) resources.renderer.dispose();
        if (resources.geometry?.dispose) resources.geometry.dispose();
        if (resources.material?.dispose) resources.material.dispose();
        if (resources.texture?.dispose) resources.texture.dispose();
        resources.lights?.forEach(light => {
            if (light.dispose) light.dispose();
        });
    } catch (e) {
        console.error('Error during cleanup:', e);
    }
};

export const preloadDisplacementParticlesResources = () => {
    return new Promise((resolve, reject) => {
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(
            '/static/img/particules.webp',
            (texture) => {
                texture.flipY = false;
                texture.premultiplyAlpha = false;
                texture.minFilter = LinearFilter;
                texture.magFilter = LinearFilter;
                texture.generateMipmaps = false;
                resolve({ texture });
            },
            undefined,
            (error) => {
                console.error('Texture loading failed:', error);
                reject(error);
            }
        );
    });
};

export const DisplacementParticles = ({ preloadedResources, ...props }) => {
    const { texture } = preloadedResources;
    const { theme } = useTheme();
    const resources = useRef({
        renderer: null,
        scene: null,
        camera: null,
        lights: [],
        uniforms: null,
        material: null,
        geometry: null,
        sphere: null,
        texture: null
    });

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef();
    const reduceMotion = useReducedMotion();
    const isInViewport = useInViewport(canvasRef);
    const windowSize = useWindowSize();
    const rotationX = useSpring(0, springConfig);
    const rotationY = useSpring(0, springConfig);
    const animationFrame = useRef(null);
    const startTime = useRef(0);

    useEffect(() => {
        if (!texture) return;

        const initThreeJS = () => {
            resources.current.texture = texture;

            // Renderer
            resources.current.renderer = new WebGLRenderer({
                canvas: canvasRef.current,
                antialias: false,
                alpha: true,
                powerPreference: 'high-performance'
            });
            resources.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            resources.current.renderer.outputColorSpace = LinearSRGBColorSpace;

            // Camera
            resources.current.camera = new PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 100);
            resources.current.camera.position.z = 52;

            // Scene
            resources.current.scene = new Scene();

            // Material
            resources.current.material = new MeshPhongMaterial({
                map: texture,
                onBeforeCompile: (shader) => {
                    resources.current.uniforms = UniformsUtils.merge([
                        shader.uniforms,
                        { time: { type: 'f', value: 0 } }
                    ]);
                    shader.uniforms = resources.current.uniforms;
                    shader.vertexShader = vertexShader;
                    shader.fragmentShader = fragmentShader;
                },
            });

            // Geometry
            resources.current.geometry = new PlaneGeometry(60, 40, 20, 20);
            resources.current.sphere = new Mesh(resources.current.geometry, resources.current.material);
            resources.current.sphere.position.z = 0;
            resources.current.scene.add(resources.current.sphere);

            // Lights
            const dirLight = new DirectionalLight(0xffffff, theme === 'light' ? 1.6 : 1.8);
            const ambientLight = new AmbientLight(0xffffff, theme === 'light' ? 2.5 : 0.2);
            dirLight.position.set(100, 100, 200);
            resources.current.lights = [dirLight, ambientLight];
            resources.current.lights.forEach(light => resources.current.scene.add(light));

            // First render
            resources.current.renderer.render(resources.current.scene, resources.current.camera);
            setIsLoading(false);
            setIsReady(true);
            startTime.current = performance.now();
        };

        initThreeJS();

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
            cleanUpThreeResources(resources.current);
        };
    }, [texture, theme]);

    useEffect(() => {
        if (!windowSize.width || !windowSize.height || !resources.current.sphere) return;

        const { width, height } = windowSize;
        const adjustedHeight = height + height * 0.3;
        resources.current.renderer.setSize(width, adjustedHeight);
        resources.current.camera.aspect = width / adjustedHeight;
        resources.current.camera.updateProjectionMatrix();

        if (reduceMotion) {
            resources.current.renderer.render(resources.current.scene, resources.current.camera);
        }

        // Position responsive
        if (width <= media.mobile) {
            resources.current.sphere.position.set(14, 10, 0);
        } else if (width <= media.tablet) {
            resources.current.sphere.position.set(18, 14, 0);
        } else {
            resources.current.sphere.position.set(22, 16, 0);
        }
    }, [reduceMotion, windowSize]);

    useEffect(() => {
        const sensitivity = 1.0;

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
        if (!isReady || !resources.current.uniforms || !resources.current.sphere) return;

        const animate = (timestamp) => {
            resources.current.uniforms.time.value = 0.00005 * (timestamp - startTime.current);
            resources.current.sphere.rotation.z += 0.001;
            resources.current.sphere.rotation.x = rotationX.get();
            resources.current.sphere.rotation.y = rotationY.get();

            resources.current.renderer.render(resources.current.scene, resources.current.camera);
            animationFrame.current = requestAnimationFrame(animate);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && isInViewport && !reduceMotion) {
                animationFrame.current = requestAnimationFrame(animate);
            } else if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };

        if (!reduceMotion && isInViewport) {
            handleVisibilityChange();
            document.addEventListener("visibilitychange", handleVisibilityChange);
        }

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isReady, isInViewport, reduceMotion, rotationX, rotationY]);

    return (
        <>
            {isLoading && (
                <div className={styles.canvas} aria-hidden style={{ background: 'transparent' }} />
            )}
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
        </>
    );
};