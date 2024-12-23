// app/components/button/button.jsx
import { Icon } from '~/components/icon';
import { Loader } from '~/components/loader';
import { Transition } from '~/components/transition';
import { Link } from '@remix-run/react';
import { forwardRef } from 'react';
import { classes } from '~/utils/style';

import styles from './button.module.css';


function isExternalLink(href) {
    return href?.includes('://');
}

export const Button = forwardRef(({ href, onClick, as, ...rest }, ref) => {
    const isExternal = href && isExternalLink(href);

    // Si `href` est défini et n'est pas un lien externe, utilise `Link`.
    if (href && !isExternal && !as) {
        return (
            <ButtonContent
                as={Link}
                to={href}
                data-unstable-view-transition
                prefetch="intent"
                ref={ref}
                {...rest}
            />
        );
    }

    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
        <ButtonContent
            as={Component}
            href={href}
            onClick={onClick}
            isExternal={isExternal}
            ref={ref}
            {...rest}
        />
    );
});

const ButtonContent = forwardRef(
    ({ className, as: Component = 'button', secondary, loading, loadingText = 'loading', icon, iconEnd, iconHoverShift, iconOnly, children, rel, target, href, onClick, isExternal, disabled, ...rest }, ref) => {

        return (
            <Component
                className={classes(styles.button, className)}
                data-loading={loading}
                data-icon-only={iconOnly}
                data-secondary={secondary}
                data-icon={icon}
                href={href}
                onClick={onClick}
                rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
                target={target || (isExternal ? '_blank' : undefined)}
                disabled={disabled}
                ref={ref}
                {...rest}
            >
                {!!icon && (
                    <Icon
                        className={styles.icon}
                        data-start={!iconOnly}
                        data-shift={iconHoverShift}
                        icon={icon}
                    />
                )}
                {!!children && <span className={styles.text}>{children}</span>}
                {!!iconEnd && (
                    <Icon
                        className={styles.icon}
                        data-end={!iconOnly}
                        data-shift={iconHoverShift}
                        icon={iconEnd}
                    />
                )}
                <Transition unmount in={loading}>
                    {({ visible, nodeRef }) => (
                        <Loader
                            ref={nodeRef}
                            className={styles.loader}
                            size={32}
                            text={loadingText}
                            data-visible={visible}
                        />
                    )}
                </Transition>
            </Component>
        );
    }
);
