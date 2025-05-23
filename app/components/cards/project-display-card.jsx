// app/components/cards/project-display-card.jsx
import { useState } from 'react';

import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { media } from '~/utils/style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import styles from './project-card.module.css';


export function ProjectDisplayCard({
    visible: sectionVisible, title, description, imgPath, ghLink, demoLink, isBlog, alternate, showDetails, isVisible, svgBadge, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= media.tablet;

    function renderDetailsProjectCard(visible) {
        return (
            <div className={styles.projectCardView} data-visible={visible}>
                <div className={styles.cardImgTop} data-visible={visible}>
                    <object
                        type="image/svg+xml"
                        data={imgPath}
                        aria-label="Project laptop animation"
                    />
                </div>
                <div className={styles.cardBody} data-visible={visible}>
                    <Text className={styles.cardTitle} data-visible={visible} as="div">
                        <Heading level={4} as="h2" className={styles.heading}>
                            <DecoderText text={title} start={visible} delay={3000} />
                        </Heading>
                    </Text>
                    {showDetails && (
                        <>
                            <Text className={`${styles.cardText} ${!isVisible ? styles.hidden : ''}`} data-visible={visible} as="p">
                                {description}
                            </Text>
                            {svgBadge && (
                                <div className={`${styles.svgBadgeContainer} ${!isVisible ? styles.hidden : ''}`} data-visible={visible}>
                                    {svgBadge}
                                </div>
                            )}
                            <div className={`${styles.buttonContainer} ${!isVisible ? styles.hidden : ''}`} data-visible={visible}>
                                <a href={ghLink} target="_blank" className={styles.button} data-visible={visible} rel="noreferrer">
                                    <FontAwesomeIcon icon={faGithub} />
                                    GitHub
                                </a>
                                {!isBlog && demoLink && (
                                    <a href={demoLink} target="_blank" className={styles.button} data-visible={visible} rel="noreferrer">
                                        <FontAwesomeIcon icon={faLink} />
                                        Demo
                                    </a>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles.projectCardsContent}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            tabIndex={-1}
            {...rest}
        >
            <Transition in={sectionVisible || focused}>
                {({ visible }) => (
                    <>
                        {!alternate && !isMobile && (
                            <>
                                {renderDetailsProjectCard(visible)}
                            </>
                        )}
                        {(alternate || isMobile) && (
                            <>
                                {renderDetailsProjectCard(visible)}
                            </>
                        )}
                    </>
                )}
            </Transition>
        </div>
    );
}

export default ProjectDisplayCard;
