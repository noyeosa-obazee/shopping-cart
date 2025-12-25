import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.hero}>
      <h1>Welcome to the MockStore</h1>
      <p>The best place to buy imaginary tech.</p>
      <Link to="/shop">
        <button className={styles.cta}>Shop Now</button>
      </Link>
    </div>
  );
};

export default Home;
