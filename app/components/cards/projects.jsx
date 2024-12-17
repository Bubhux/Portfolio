// app/components/cards/projects.jsx
import React, { useState } from "react";
import { Cards } from './project-cards';

import styles from './cards.module.css';
import { Transition } from '~/components/transition';
import { media } from '~/utils/style';
import { useWindowSize } from '~/hooks';
import { Divider } from '~/components/divider';
import { Section } from '~/components/section';


export function Projects({ id, visible: sectionVisible, title, description, imgPath, ghLink, demoLink, isBlog, alternate, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= media.tablet;

    function renderDetails(visible) {
        return (
            <div className={styles.details} data-visible={visible}>
                <div aria-hidden className={styles.index}>
                    <Divider
                        notchWidth="64px"
                        notchHeight="0px"
                        collapsed={!visible}
                        collapseDelay={1000}
                        hideLine={true}
                    />
                </div>
            </div>
        );
    }

    function renderProjectCard(visible) {
        return (
            <Cards
                imgPath={imgPath}
                title={title}
                description={description}
                ghLink={ghLink}
                demoLink={demoLink}
                visible={visible}
            />
        );
    }

    return (
        <div className={styles.projectCardsContainer}>
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
    );
}

export default Projects;
