import styles from './Header.module.scss';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <header className={styles.Header}>
    <h1>{title}</h1>
  </header>
);

export { Header };