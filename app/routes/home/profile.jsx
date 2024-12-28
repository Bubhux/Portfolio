// app/routes/home/profile.jsx
import profileImgLarge from '~/assets/img-profile/profile-large.png';
import profileImg from '~/assets/img-profile/profile.png';

import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';

import totoroKatakana from './totoro-katakana.svg';
import styles from './profile.module.css';


const ProfileText = ({ visible, titleId }) => (
    <Fragment>
        <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
            <DecoderText text="Hello world !" start={visible} delay={500} />
        </Heading>
        <Text className={styles.description} data-visible={visible} size="m" as="p">
            I’m Bubhux Paindépice. I currently live in France, where I work as a junior full-stack developer.
            My projects include back-end development (Python, Django) and front-end development (React, Bootstrap, SASS).
        </Text>
        <Text className={styles.description} data-visible={visible} size="m" as="p">
            Passionate about technology since a young age, I also enjoy working on systems and network administration.
            My passion and determination for coding drive me to develop innovative projects and experiment with new technologies.
            You can explore my projects on <Link href="https://github.com/Bubhux">GitHub</Link>.
        </Text>
        <Text className={styles.description} data-visible={visible} size="m" as="p">
            In my free time, I enjoy drawing, diving into the wonders of science and technology, and exploring literature.
            I’m always open to discussing new ideas or collaborating on exciting projects, so feel free to reach out !
        </Text>
    </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
    const [focused, setFocused] = useState(false);
    const titleId = `${id}-title`;

    return (
        <Section
            className={styles.profile}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            as="section"
            id={id}
            ref={sectionRef}
            aria-labelledby={titleId}
            tabIndex={-1}
        >
            <Transition in={visible || focused} timeout={0}>
                {({ visible, nodeRef }) => (
                    <div className={styles.content} ref={nodeRef}>
                        <div className={styles.column}>
                            <ProfileText visible={visible} titleId={titleId} />
                            <Button
                                secondary
                                className={styles.button}
                                data-visible={visible}
                                href="/contact"
                                icon="send"
                            >
                                Send me a message
                            </Button>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.tag} aria-hidden>
                                <Divider
                                    lineWidth="50%"
                                    notchWidth="64px"
                                    notchHeight="8px"
                                    collapsed={!visible}
                                    collapseDelay={1000}
                                />
                                <div className={styles.tagText} data-visible={visible}>
                                    About me
                                </div>
                            </div>
                            <div className={styles.image}>
                                <Image
                                    reveal
                                    delay={100}
                                    srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                                    width={960}
                                    height={1280}
                                    sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                                    alt="totoro is the best pillow in the world !"
                                />
                                <svg className={styles.svg} data-visible={visible} viewBox="0 0 136 766">
                                    <use href={`${totoroKatakana}#katakana-profile`} />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </Section>
    );
};
