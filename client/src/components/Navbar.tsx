import Link from 'next/link';
import styles from '@/styles/Navbar.module.css'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                <UserButton/>
                </li>
                <li className={styles.li}>
                    <Link href="/" className={styles.a}>
                        Home
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/graph2" className={styles.a}>
                        Graph
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link href="/contact" as="/contact" className={styles.a}>
                        Journal Entries
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;