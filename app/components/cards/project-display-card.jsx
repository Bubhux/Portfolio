// app/components/cards/project-display-card.jsx
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


export function ProjectDisplayCard({
    visible: sectionVisible, title, description, imgPath, ghLink, demoLink, isBlog, alternate, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= media.tablet;

    function renderDetailsProjectCard(visible) {
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