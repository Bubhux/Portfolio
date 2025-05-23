// app/routes/home/intro.jsx
import { Suspense, lazy, useEffect, useState, startTransition } from 'react';

import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { useTheme } from '~/components/theme-provider';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Link as RouterLink } from '@remix-run/react';
import { useInterval, usePrevious, useScrollToHash } from '~/hooks';
import { motion } from 'framer-motion';
import { cssProps } from '~/utils/style';
import { useHydrated } from '~/hooks/useHydrated';

import config from '~/config.json';
import styles from './intro.module.css';


const DisplacementParticles = lazy(() =>
    import('./displacement-particules').then(module => ({ default: module.DisplacementParticles }))
);

export function Intro({ id, sectionRef, scrollIndicatorHidden, ...rest }) {
    const { theme } = useTheme();
    const { disciplines } = config;
    const [disciplineIndex, setDisciplineIndex] = useState(0);
    const prevTheme = usePrevious(theme);
    const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
        ', and '
    );
    const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
    const titleId = `${id}-title`;
    const scrollToHash = useScrollToHash();
    const isHydrated = useHydrated();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [preloadedResources, setPreloadedResources] = useState(null);

    useEffect(() => {
        import('./displacement-particules').then(module => {
            const { preloadDisplacementParticlesResources } = module;
            preloadDisplacementParticlesResources()
                .then((resources) => {
                    startTransition(() => {
                        setPreloadedResources(resources);
                        setIsReady(true);
                        setIsAnimating(true);
                    });
                })
                .catch((error) => console.error('Failed to preload resources:', error));
        });
    }, []);

    useInterval(
        () => {
            const index = (disciplineIndex + 1) % disciplines.length;
            setDisciplineIndex(index);
        },
        6000,
        theme
    );

    useEffect(() => {
        if (prevTheme && prevTheme !== theme) {
            setDisciplineIndex(0);
        }
    }, [theme, prevTheme]);

    const handleScrollClick = event => {
        event.preventDefault();
        scrollToHash(event.currentTarget.href);
    };

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 5500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Section
            className={styles.intro}
            as="section"
            ref={sectionRef}
            id={id}
            aria-labelledby={titleId}
            tabIndex={-1}
            {...rest}
        >
            <Transition in key={theme} timeout={3000}>
                {({ visible, status }) => (
                    <>
                        {isHydrated && isReady && preloadedResources && (
                            <Suspense fallback={null}>
                                <DisplacementParticles preloadedResources={preloadedResources} />
                            </Suspense>
                        )}
                        <header className={styles.text}>
                            <h1 className={styles.name} data-visible={visible} id={titleId}>
                                <DecoderText key={disciplineIndex} text={config.name} delay={500} />
                            </h1>
                            <Heading level={0} as="h2" className={styles.title}>
                                <VisuallyHidden className={styles.label}>
                                    {`${config.role} + ${introLabel}`}
                                </VisuallyHidden>
                                <span aria-hidden className={styles.row}>
                                    <span
                                        className={styles.word}
                                        data-status={status}
                                        style={cssProps({ delay: tokens.base.durationXS })}
                                    >
                                        <span
                                            className={styles.bar}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        <span
                                            className={styles.bar1}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        <span
                                            className={styles.bar2}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        <span
                                            className={styles.bar3}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        <span
                                            className={styles.bar4}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        <span
                                            className={styles.bar5}
                                            data-status={status}
                                            style={cssProps({ delay: tokens.base.durationXS })}
                                        />
                                        {config.role}
                                    </span>
                                    <span className={styles.line} data-status={status} />
                                </span>
                                <div className={styles.row}>
                                    {disciplines.map(item => (
                                        <Transition
                                            unmount
                                            in={item === currentDiscipline}
                                            timeout={{ enter: 2000, exit: 1000 }}
                                            key={item}
                                        >
                                            {({ status, nodeRef }) => (
                                                <motion.span
                                                    aria-hidden
                                                    ref={nodeRef}
                                                    className={styles.word}
                                                    data-plus={true}
                                                    data-status={status}
                                                    style={cssProps({ delay: tokens.base.durationL })}
                                                    initial={{ opacity: 1, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 1, scale: 0 }}
                                                    transition={{ duration: 0 }}
                                                >
                                                    <motion.span
                                                        className={styles.bar}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={styles.bar1}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={styles.bar2}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={styles.bar3}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={styles.bar4}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={styles.bar5}
                                                        data-status={status}
                                                        transition={{ duration: 1 }}
                                                    />
                                                    <motion.span
                                                        className={`${styles.barVertical} ${isAnimating ? styles.animate : ''}`}
                                                        data-status={status}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                    <span className={`${styles.barVertical} ${isAnimating ? styles.animate : ''}`} data-status={status} data-plus="true"></span>
                                                    {item}
                                                </motion.span>
                                            )}
                                        </Transition>
                                    ))}
                                </div>
                            </Heading>
                        </header>
                        <RouterLink
                            to="/#project-1"
                            className={styles.scrollIndicator}
                            data-status={status}
                            data-hidden={scrollIndicatorHidden}
                            onClick={handleScrollClick}
                        >
                            <VisuallyHidden>Scroll to projects</VisuallyHidden>
                        </RouterLink>
                        <RouterLink
                            to="/#project-1"
                            className={styles.mobileScrollIndicator}
                            data-status={status}
                            data-hidden={scrollIndicatorHidden}
                            onClick={handleScrollClick}
                        >
                            <VisuallyHidden>Scroll to projects</VisuallyHidden>
                            <svg
                                aria-hidden
                                stroke="currentColor"
                                width="43"
                                height="15"
                                viewBox="0 0 43 15"
                            >
                                <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
                            </svg>
                        </RouterLink>
                    </>
                )}
            </Transition>
        </Section>
    );
}