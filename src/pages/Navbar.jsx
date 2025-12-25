import { Link } from "react-router-dom";
import { ShoppingCart, House, Store } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = ({ cartCount }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MockStore</div>
      <ul className={styles.links}>
        <li>
          <Link to="/">
            <House size={20} /> Home
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <Store size={20} /> Shop
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.cartLink}>
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
