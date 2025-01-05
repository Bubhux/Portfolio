// app/utils/three.js
import { Cache, TextureLoader } from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';


// Enable caching for all loaders
Cache.enabled = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader;
export const textureLoader = new TextureLoader();

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = scene => {
    scene?.traverse(object => {
        if (!object.isMesh) return;

        // Dispose geometry only if it's available
        if (object.geometry) {
            object.geometry.dispose();
        }

        if (object.material) {
            if (object.material.isMaterial) {
                cleanMaterial(object.material);
            } else {
                // If it's an array of materials
                for (const material of object.material) {
                    cleanMaterial(material);
                }
            }
        }
    });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
    if (material) {
        material.dispose();

        if (material.map) {
            material.map.dispose();
        }
        if (material.bumpMap) {
            material.bumpMap.dispose();
        }
        if (material.normalMap) {
            material.normalMap.dispose();
        }
        if (material.emissiveMap) {
            material.emissiveMap.dispose();
        }
        if (material.specularMap) {
            material.specularMap.dispose();
        }

        // Dispose textures associated with the material
        for (const key of Object.keys(material)) {
            const value = material[key];
            if (value && typeof value === 'object' && 'minFilter' in value) {
                value.dispose();

                // Close GLTF bitmap textures
                value.source?.data?.close?.();
            }
        }
    }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = renderer => {
    renderer.dispose();
    renderer = null;
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = lights => {
    for (const light of lights) {
        if (light && light.parent) {
            light.parent.remove(light);
        }
    }
};

/**
 * Get child by name
 */
export const getChild = (name, object) => {
    let node;

    object.traverse(child => {
        if (child.name === name) {
            node = child;
        }
    });

    return node;
};