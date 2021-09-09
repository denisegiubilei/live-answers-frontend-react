import styles from './ErrorMessage.module.scss';
interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p data-testid="error-message" className={styles.ErrorMessage}>
    {message}
  </p>
);