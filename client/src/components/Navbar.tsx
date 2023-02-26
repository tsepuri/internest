import Link from 'next/link';
import styles from '@/styles/Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href="/">
                        <a className={styles.a}>Home</a>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/about">
                        <a className={styles.a}>About</a>
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/contact" as="/contact">
                        <a className={styles.a}>Contact</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;