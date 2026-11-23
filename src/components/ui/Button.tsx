import type { ComponentProps, ReactNode } from 'react';
import { cx } from '../../utils/classNames';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ícono antes del texto. */
  startIcon?: ReactNode;
  /** Ícono después del texto (se desplaza un poco al pasar el mouse). */
  endIcon?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  className,
  children,
  type = 'button',
  ...buttonProps
}: ButtonProps) => (
  <button type={type} className={cx(styles.button, styles[variant], styles[size], className)} {...buttonProps}>
    {startIcon && (
      <span className={styles.icon} aria-hidden="true">
        {startIcon}
      </span>
    )}
    <span>{children}</span>
    {endIcon && (
      <span className={cx(styles.icon, styles.endIcon)} aria-hidden="true">
        {endIcon}
      </span>
    )}
  </button>
);
