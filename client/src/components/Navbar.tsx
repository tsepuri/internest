import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            {/* Remove the <a> tag and use the Link component instead */}
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            {/* Remove the <a> tag and use the Link component instead */}
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact" passHref>
            {/* Add the passHref prop to the Link component */}
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;