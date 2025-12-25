import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import styles from "./Shop.module.css";

const Shop = () => {
  const { addToCart, loading, productsData } = useOutletContext();

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.grid}>
      {productsData.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
    setQuantity(1);
    alert("Added to cart!");
  };

  return (
    <div className={styles.card}>
      <img src={product.images[0]} alt={product.slug} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <div className={styles.controls}>
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
      </div>

      <button className={styles.addBtn} onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
};

const Loading = () => {
  return (
    <div className={styles.spinnerContainer}>
      <h3>Fetching Products</h3>

      <Loader2 className={styles.spinner} size={48} />
    </div>
  );
};
export default Shop;
