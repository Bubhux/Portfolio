// hooks/usePreloadDisplacementParticles.js
import { useEffect, useRef, useState } from 'react';
import { TextureLoader, WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, MeshPhongMaterial, Mesh } from 'three';


export const usePreloadDisplacementParticles = () => {
    const isPreloaded = useRef(false);
    const [isTextureLoaded, setIsTextureLoaded] = useState(false);

    useEffect(() => {
        if (isPreloaded.current) return;

        const preloadCanvas = document.createElement('canvas');
        const renderer = new WebGLRenderer({ canvas: preloadCanvas });
        const scene = new Scene();
        const camera = new PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 52;

        const textureLoader = new TextureLoader();
        const texture = textureLoader.load('/static/img/particules.png', () => {
            const material = new MeshPhongMaterial({ map: texture });
            const geometry = new PlaneGeometry(64, 44, 80, 80);
            const mesh = new Mesh(geometry, material);
            scene.add(mesh);

            renderer.render(scene, camera);
            // Cleanup after preloading
            renderer.dispose();
            geometry.dispose();
            material.dispose();

            setIsTextureLoaded(true);
        });

        isPreloaded.current = true;
    }, []);

    return isTextureLoaded;
};
