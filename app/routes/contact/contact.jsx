// app/routes/contact/contact.jsx
import React, { Suspense, lazy, useEffect, useState, useRef } from 'react';

import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';

import { baseMeta } from '~/utils/meta';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { Form, useActionData } from '@remix-run/react';
import emailjs from 'emailjs-com';

import styles from './contact.module.css';


const Main = lazy(() => import('~/components/globe/main'));

export const meta = () => {
    return baseMeta({
        title: 'Contact',
        description:
            'Send me a message if you’re interested in discussing a project or if you just want to say hi',
    });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const Contact = () => {
    const errorRef = useRef();
    const email = useFormInput('');
    const message = useFormInput('');
    const actionData = useActionData();

    const initDelay = tokens.base.durationS;

    const [isClient, setIsClient] = useState(false);
    const [showMain, setShowMain] = useState(false);
    const [sending, setSending] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        setIsClient(true);

        const timer = setTimeout(() => {
            setShowMain(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setErrors(null);

        const formData = new FormData(e.target);
        const isBot = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const name = formData.get('name');
        const errors = {};

        if (isBot) return json({ success: true });

        if (!email || !EMAIL_PATTERN.test(email)) {
            setErrors({ email: 'Please enter a valid email address.' });
            setSending(false);
            return;
        }

        if (!message) {
            setErrors({ message: 'Please enter a message.' });
            setSending(false);
            return;
        }

        if (email.length > MAX_EMAIL_LENGTH) {
            errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
        }

        if (message.length > MAX_MESSAGE_LENGTH) {
            errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
        }

        try {
            await emailjs.send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATEID,
                {
                    from_name: name,
                    to_name: 'Bubhux',
                    from_email: email,
                    to_email: 'bubhuxpaindepice@gmail.com',
                    message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            setSending(false);
            setIsMessageSent(true);
            alert('Message sent successfully!');
            e.target.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            setSending(false);
            setErrors({ general: 'Failed to send email. Please try again later.' });
        }
    };

    return (
        <Section className={styles.contact}>
            {isClient && showMain && (
                <Transition unmount in={!actionData?.success} timeout={1600}>
                    {({ status, nodeRef }) => (
                        <div ref={nodeRef} data-status={status}>
                            <Suspense fallback={null}>
                                <Main />
                            </Suspense>
                        </div>
                    )}
                </Transition>
            )}

            <Transition unmount in={!actionData?.success} timeout={1600}>
                {({ status, nodeRef }) => (
                    <div className={styles.formContainer}>
                        <div className={styles.formWrapper}>
                            <Form
                                data-unstable-view-transition
                                className={styles.form}
                                onSubmit={handleSubmit}
                                ref={nodeRef}
                            >
                                <Heading
                                    className={styles.title}
                                    data-status={status}
                                    level={3}
                                    as="h1"
                                    style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
                                >
                                    <DecoderText text="Shoot a quick hello" start={status !== 'exited'} delay={1000} />
                                </Heading>
                                <Divider
                                    lineWidth="60%"
                                    className={styles.divider}
                                    data-status={status}
                                    style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
                                />
                                <Input
                                    className={styles.botkiller}
                                    label="Name"
                                    name="name"
                                    maxLength={MAX_EMAIL_LENGTH}
                                />
                                <Input
                                    required
                                    className={styles.input}
                                    data-status={status}
                                    style={getDelay(tokens.base.durationXS, initDelay)}
                                    autoComplete="email"
                                    label="Your email"
                                    type="email"
                                    name="email"
                                    maxLength={MAX_EMAIL_LENGTH}
                                    {...email}
                                />
                                <Input
                                    required
                                    multiline
                                    className={styles.input}
                                    data-status={status}
                                    style={getDelay(tokens.base.durationS, initDelay)}
                                    autoComplete="off"
                                    label="Message"
                                    name="message"
                                    maxLength={MAX_MESSAGE_LENGTH}
                                    {...message}
                                />
                                <Transition
                                    unmount
                                    in={(!sending && (errors || actionData?.errors))}
                                    timeout={msToNum(tokens.base.durationM)}
                                >
                                    {({ status: errorStatus, nodeRef }) => (
                                        <div
                                            className={styles.formError}
                                            ref={nodeRef}
                                            data-status={errorStatus}
                                            style={cssProps({
                                                height: errorStatus ? errorRef.current?.offsetHeight : 0,
                                            })}
                                        >
                                            <div className={styles.formErrorContent} ref={errorRef}>
                                                <div className={styles.formErrorMessage}>
                                                    <Icon className={styles.formErrorIcon} icon="error" />
                                                    {errors?.email || actionData?.errors?.email}
                                                    {errors?.message || actionData?.errors?.message}
                                                    {errors?.general || actionData?.errors?.general}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Transition>
                                <Button
                                    className={styles.button}
                                    data-status={status}
                                    data-sending={sending}
                                    style={getDelay(tokens.base.durationM, initDelay)}
                                    disabled={sending}
                                    loading={sending}
                                    loadingText="Sending..."
                                    icon="send"
                                    type="submit"
                                >
                                    Send message
                                </Button>
                            </Form>
                        </div>
                    </div>
                )}
            </Transition>
            <Transition unmount in={isMessageSent}>
                {({ status, nodeRef }) => (
                    <div className={styles.complete} aria-live="polite" ref={nodeRef}>
                        <Heading
                            level={3}
                            as="h3"
                            className={styles.completeTitle}
                            data-status={status}
                        >
                            Message Successfully Sent
                        </Heading>
                        <Text
                            size="l"
                            as="p"
                            className={styles.completeText}
                            data-status={status}
                            style={getDelay(tokens.base.durationXS)}
                        >
                            You’ll hear from me in the next few days, stay patient.
                        </Text>
                        <Button
                            secondary
                            iconHoverShift
                            className={styles.completeButton}
                            data-status={status}
                            style={getDelay(tokens.base.durationM)}
                            href="/"
                            icon="chevron-right"
                        >
                            Back to homepage
                        </Button>
                    </div>
                )}
            </Transition>
            <Footer className={styles.footer} />
        </Section>
    );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
    const numDelay = msToNum(delayMs) * multiplier;
    return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
