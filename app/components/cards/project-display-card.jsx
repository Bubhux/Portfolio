// app/components/cards/project-display-card.jsx
import { useState } from 'react';

import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { media } from '~/utils/style';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import styles from './project-card.module.css';


export function ProjectDisplayCard({
    visible: sectionVisible, title, description, imgPath, ghLink, demoLink, isBlog, alternate, ...rest }) {

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
                    //style={{ width: 'auto', height: '100%', maxWidth: '700px' }}
                />
                </div>
                <div className={styles.cardBody} data-visible={visible}>
                    <Text className={styles.cardTitle} data-visible={visible} as="div">
                        <Heading level={4} as="h2" className={styles.heading}>
                            <DecoderText text={title} start={visible} delay={3000} />
                        </Heading>
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