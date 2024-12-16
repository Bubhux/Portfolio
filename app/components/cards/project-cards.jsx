// app/components/cards/project-cards.jsx
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { useState } from 'react';
import { media } from '~/utils/style';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import styles from './cards.module.css';


export function Cards({
    id, visible: sectionVisible, sectionRef, index, title, description, imgPath, ghLink, demoLink, isBlog, alternate, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const titleId = `${id}-title`;
    const isMobile = width <= media.tablet;

    function renderDetails(visible) {
        return (
            <div className={styles.details} data-visible={visible}>
                <div aria-hidden className={styles.index}>
                    <Divider
                        notchWidth="64px"
                        notchHeight="8px"
                        collapsed={!visible}
                        collapseDelay={1000}
                    />
                </div>
            </div>
        );
    }

    function ProjectCards(visible) {
        return (
            <div className={styles.projectCardView} data-visible={visible}>
                <div className={styles.cardImgTop} data-visible={visible}>
                    <img
                        src={imgPath}
                        alt="Project card view"
                        style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
                    />
                </div>
                <div className={styles.cardBody} data-visible={visible}>
                    <Text className={styles.cardTitle} data-visible={visible} as="p">
                        {title}
                    </Text>
                    <Text className={styles.cardText} data-visible={visible} as="p">
                        {description}
                    </Text>
                    <div className={styles.buttonContainer} data-visible={visible}>
                        <a href={ghLink} target="_blank" className={styles.button} data-visible={visible}>
                            <FontAwesomeIcon icon={faGithub} />
                            GitHub
                        </a>
                        {!isBlog && demoLink && (
                            <a href={demoLink} target="_blank" className={styles.button} data-visible={visible}>
                                <FontAwesomeIcon icon={faLink} />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Section
            className={styles.projectCards}
            data-alternate={alternate}
            data-first={index === 1}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            as="section"
            ref={sectionRef}
            id={id}
            tabIndex={-1}
            {...rest}
        >
            <div className={styles.projectCardsContent}>
                <Transition in={sectionVisible || focused}>
                    {({ visible }) => (
                        <>
                            {!alternate && !isMobile && (
                                <>
                                    {renderDetails(visible)}
                                    {ProjectCards(visible)}
                                </>
                            )}
                            {(alternate || isMobile) && (
                                <>
                                    {renderDetails(visible)}
                                    {ProjectCards(visible)}
                                </>
                            )}
                        </>
                    )}
                </Transition>
            </div>
        </Section>
    );
}
