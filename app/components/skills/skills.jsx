// app/components/skills.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { media } from '~/utils/style';

import { skillsData } from "~/utils/skills";
import { skillsImage } from "~/utils/skills-image";
import { skillLinks } from "~/utils/skills-links";

import styles from './skills.module.css';
import Marquee from "react-fast-marquee";


export function Skills({
    id, visible: sectionVisible, sectionRef, index, title, description, buttonText, buttonLink, alternate, ...rest }) {

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

    function skillsDetails(visible) {
        return (
            <div className={styles.skillsItemsList} data-visible={visible}>
                <div className={styles.skillItemsWrapper} data-visible={visible}>
                    {skillsData.map((skill, index) => {
                        const skillLink = skillLinks[skill];
                        const isExternal = skillLink ? skillLink.isExternal : false;
                        const url = skillLink ? skillLink.url : '#';

                        return (
                            <div className={styles.skillItem} key={`${skill}-${index}`}>
                                <div className={styles.skillCard} data-visible={visible}>
                                    <div className={styles.skillContent} data-visible={visible}>
                                        <div className={styles.skillImage}>
                                            {isExternal ? (
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.skillImage}
                                                >
                                                    <img
                                                        src={skillsImage(skill)}
                                                        alt={skill}
                                                        width={40}
                                                        height={40}
                                                        className={styles.skillImage}
                                                    />
                                                </a>
                                            ) : (
                                                <Link to={url} className={styles.skillImage}>
                                                    <img
                                                        src={skillsImage(skill)}
                                                        alt={skill}
                                                        width={40}
                                                        height={40}
                                                        className={styles.skillImage}
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                        <span className={styles.skillTitle} data-visible={visible}>
                                            {skill}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <Section
            className={styles.skills}
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
            <div className={styles.skillsContent}>
                <Transition in={sectionVisible || focused}>
                    {({ visible }) => (
                        <>
                            {!alternate && !isMobile && (
                                <>
                                    {renderDetails(visible)}
                                    {skillsDetails(visible)}
                                </>
                            )}
                            {(alternate || isMobile) && (
                                <>
                                    {renderDetails(visible)}
                                    {skillsDetails(visible)}
                                </>
                            )}
                        </>
                    )}
                </Transition>
            </div>
        </Section>
    );
}
