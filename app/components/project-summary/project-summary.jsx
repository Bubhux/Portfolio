// app/components/project-summary.jsx
import { useState } from 'react';

import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { media } from '~/utils/style';
import { ProjectCard } from '~/components/cards/project-card';

import styles from './project-summary.module.css';


export function ProjectSummary({ id, visible: sectionVisible, sectionRef, index, title, cardTitle, description, cardDescription, buttonText, buttonLink, imgPath, ghLink, demoLink, alternate, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const titleId = `${id}-title`;
    const isMobile = width <= media.tablet;
    const indexText = index < 10 ? `0${index}` : index;

    function renderDetails(visible) {
        return (
            <div className={styles.details}>
                <div aria-hidden className={styles.index}>
                    <Divider
                        notchWidth="64px"
                        notchHeight="8px"
                        collapsed={!visible}
                        collapseDelay={1000}
                    />
                    <span className={styles.indexNumber} data-visible={visible}>
                        {indexText}
                    </span>
                </div>
                <Heading
                    level={3}
                    as="h2"
                    className={styles.title}
                    data-visible={visible}
                    id={titleId}
                >
                    {title}
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                    {description}
                </Text>
                <div className={styles.button} data-visible={visible}>
                    <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
                        {buttonText}
                    </Button>
                </div>
            </div>
        );
    }

    function renderProjectCard(visible) {

        if (!cardTitle || !imgPath || !cardDescription) {
            return null;
        }

        return (
            <ProjectCard
                imgPath={imgPath}
                title={cardTitle}
                description={cardDescription}
                ghLink={ghLink}
                demoLink={demoLink}
                visible={visible}
            />
        );
    }

    return (
        <Section
            className={styles.summary}
            data-alternate={alternate}
            data-first={index === 1}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            as="section"
            aria-labelledby={titleId}
            ref={sectionRef}
            id={id}
            tabIndex={-1}
            {...rest}
        >
            <div className={styles.content}>
                <Transition in={sectionVisible || focused}>
                    {({ visible }) => (
                        <>
                            {!alternate && !isMobile && (
                                <>
                                    {renderDetails(visible)}
                                    {renderProjectCard(visible)}
                                </>
                            )}
                            {(alternate || isMobile) && (
                                <>
                                    {renderDetails(visible)}
                                    {renderProjectCard(visible)}
                                </>
                            )}
                        </>
                    )}
                </Transition>
            </div>
        </Section>
    );
}
