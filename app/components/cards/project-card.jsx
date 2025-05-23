// app/components/cards/project-card.jsx
import { useState } from "react";

import { Transition } from '~/components/transition';
import { media } from '~/utils/style';
import { useWindowSize } from '~/hooks';
import { ProjectDisplayCard } from './project-display-card';

import styles from './project-card.module.css';


export function ProjectCard({ id, visible: sectionVisible, title, description, imgPath, ghLink, demoLink, isBlog, alternate, showDetails, svgBadge, ...rest }) {

    const [focused, setFocused] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width <= media.tablet;

    function renderProjectCard(visible) {
        return (
            <ProjectDisplayCard
                imgPath={imgPath}
                title={title}
                description={description}
                ghLink={ghLink}
                demoLink={demoLink}
                visible={visible}
                showDetails={showDetails}
                svgBadge={svgBadge}
            />
        );
    }

    return (
        <div
            className={styles.projectCardsContainer}
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
                                {renderProjectCard(visible)}
                            </>
                        )}
                        {(alternate || isMobile) && (
                            <>
                                {renderProjectCard(visible)}
                            </>
                        )}
                    </>
                )}
            </Transition>
        </div>
    );
}

export default ProjectCard;
