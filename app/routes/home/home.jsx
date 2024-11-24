// app/routes/home/home.jsx
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
    return [
        {
            rel: 'prefetch',
            href: '/draco/draco_wasm_wrapper.js',
            as: 'script',
            type: 'text/javascript',
            importance: 'low',
        },
        {
            rel: 'prefetch',
            href: '/draco/draco_decoder.wasm',
            as: 'fetch',
            type: 'application/wasm',
            importance: 'low',
        },
    ];
};

export const meta = () => {
    return baseMeta({
        title: 'Designer + Developer',
        description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
    });
};

export const Home = () => {
    const [visibleSections, setVisibleSections] = useState([]);
    const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
    const intro = useRef();

    useEffect(() => {
        const sections = [intro];  // Observe uniquement intro
    
        const sectionObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = entry.target;
                        observer.unobserve(section);
                        if (visibleSections.includes(section)) return;
                        setVisibleSections(prevSections => [...prevSections, section]);
                    }
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
        );
    
        const indicatorObserver = new IntersectionObserver(
            ([entry]) => {
                setScrollIndicatorHidden(!entry.isIntersecting);
            },
            { rootMargin: '-100% 0px 0px 0px' }
        );
    
        sections.forEach(section => {
            if (section.current) {  // Vérification que le ref est bien défini
                sectionObserver.observe(section.current);
            }
        });
    
        if (intro.current) {  // Vérification que intro est bien défini
            indicatorObserver.observe(intro.current);
        }
    
        return () => {
            sectionObserver.disconnect();
            indicatorObserver.disconnect();
        };
    }, [visibleSections]);
    

    return (
        <div className={styles.home}>
            <Intro
                id="intro"
                sectionRef={intro}
                scrollIndicatorHidden={scrollIndicatorHidden}
            />
        </div>
    );
};
