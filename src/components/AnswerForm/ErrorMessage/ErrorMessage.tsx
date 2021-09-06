import styles from './ErrorMessage.module.scss';
interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className={styles.ErrorMessage}>
    {message}
  </p>
);