// app/routes/home/skills.jsx
import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useWindowSize } from '~/hooks';
import { useState } from 'react';
import { media } from '~/utils/style';

import { skillsData } from "~/utils/skills";
import { skillsImage } from "~/utils/skill-image";

import styles from './project-summary.module.css';
import Image from "next/image";
import Marquee from "react-fast-marquee";


export function ProjectSummary({
    id,
    visible: sectionVisible,
    sectionRef,
    index,
    title,
    description,
    buttonText,
    buttonLink,
    alternate,
    ...rest
}) {
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

    function Skills(visible) {
        return (
            <div id={styles.skills} data-visible={visible}>
                <div className={styles.bgCircle}></div>

                <Divider
                    lineWidth="100%"
                    lineHeight="2px"
                    className={styles.divider}
                />

                <div className={styles.skillsHeader} data-visible={visible}>
                    <Heading level={2} as="h2">
                        Skills
                    </Heading>
                    <Text size="m">
                        My Skills :
                    </Text>
                </div>

                <div className={styles.marqueeWrapper} data-visible={visible}>
                    <Marquee
                        gradient={false}
                        speed={80}
                        pauseOnHover={true}
                        pauseOnClick={true}
                        delay={0}
                        play={true}
                        direction="left"
                    >
                        {skillsData.map((skill, id) => (
                            <div className={styles.skillItem} key={id}>
                                <div className={styles.skillCard} data-visible={visible}>
                                    <Divider
                                        lineWidth="100%"
                                        lineHeight="1px"
                                        collapsed={false}
                                        className={styles.skillDivider}
                                    />
                                    <div className={styles.skillContent} data-visible={visible}>
                                        <div className={styles.skillImage}>
                                            <Image
                                                src={skillsImage(skill)?.src}
                                                alt={skill}
                                                width={40}
                                                height={40}
                                                className={styles.skillImage}
                                            />
                                        </div>
                                        <Text className={styles.skillTitle}>{skill}</Text>
                                    </div>
                                    <Button href={`/skills/${skill}`} className={styles.skillButton}>
                                        For more information
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
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
                                    {Skills(visible)}
                                </>
                            )}
                            {(alternate || isMobile) && (
                                <>
                                    {renderDetails(visible)}
                                    {Skills(visible)}
                                </>
                            )}
                        </>
                    )}
                </Transition>
            </div>
        </Section>
    );
}
