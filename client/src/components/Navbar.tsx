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
                    <Link href="/graph" className={styles.a}>
                        Graph
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;