import Link from 'next/link';
import styles from '@/styles/Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                    <Link href="/" className={styles.a}>
                        Home
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/about" className={styles.a}>
                        About
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/contact" as="/contact" className={styles.a}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;