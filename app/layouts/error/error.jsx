// app/layouts/error/error.jsx
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Transition } from '~/components/transition';

import styles from './error.module.css';
import errorBenderSvg from './error-bender.svg';


export function Error({ error }) {
    const flatlined = !error.status;

    const getMessage = () => {
        switch (error.status) {
            case 404:
                return {
                    summary: 'Error: redacted',
                    message:
                        'This page could not be found. It either doesn’t exist or was deleted. Or perhaps you don’t exist and this webpage couldn’t find you.',
                };
            case 405:
                return {
                    summary: 'Error: method denied',
                    message: error.data,
                };
            default:
                return {
                    summary: 'Error: anomaly',
                    message: error.statusText || error.data || error.toString(),
                };
        }
    };

    const { summary, message } = getMessage();

    return (
        <section className={styles.page}>
            {flatlined && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
            [data-theme='dark'] {
              --primary: oklch(69.27% 0.242 25.41);
              --accent: oklch(69.27% 0.242 25.41);
            }
            [data-theme='light'] {
              --primary: oklch(56.29% 0.182 26.5);
              --accent: oklch(56.29% 0.182 26.5);
            }
          `,
                    }}
                />
            )}
            <Transition in>
                {({ visible }) => (
                    <>
                        <div className={styles.details}>
                            <div className={styles.text}>
                                {!flatlined && (
                                    <Heading
                                        className={styles.title}
                                        data-visible={visible}
                                        level={0}
                                        weight="bold"
                                    >
                                        <svg width="100" height="100" viewBox="0 0 100 100">
                                            <use href={`${errorBenderSvg}#bender`} />
                                        </svg>
                                        {error.status}
                                    </Heading>
                                )}
                                {flatlined && (
                                    <Heading
                                        className={styles.titleFlatline}
                                        data-visible={visible}
                                        level={2}
                                        as="h1"
                                    >
                                        <svg width="100" height="100" viewBox="0 0 100 100">
                                            <use href={`${errorBenderSvg}#bender`} />
                                        </svg>
                                        <DecoderText text="Error" start={visible} delay={300} />
                                    </Heading>
                                )}
                                {!flatlined && (
                                    <Heading
                                        aria-hidden
                                        className={styles.subheading}
                                        data-visible={visible}
                                        as="h2"
                                        level={4}
                                    >
                                        <DecoderText text={summary} start={visible} delay={300} />
                                    </Heading>
                                )}
                                <p className={styles.description} data-visible={visible}>
                                    {message}
                                </p>
                                <a
                                    className={styles.button}
                                    data-visible={visible}
                                    href="/"
                                >
                                    Back to homepage
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </Transition>
        </section>
    );
}
