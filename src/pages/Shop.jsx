import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import styles from "./Shop.module.css";

const Shop = () => {
  const { addToCart, loading, productsData, removeFromCart, cart } =
    useOutletContext();

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.grid}>
      {productsData.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product, addToCart, removeFromCart, cart }) => {
  const currentProduct = cart.find((p) => p.id === product.id);
  const productQuantityCount = currentProduct ? currentProduct.quantity : 0;
  const [quantity, setQuantity] = useState(
    currentProduct ? currentProduct.quantity : 1
  );

  const handleAdd = () => {
    addToCart(product, quantity);
    // setQuantity(1);
    // alert("Added to cart!");
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    // alert("Removed from cart!");
  };

  return (
    <div className={styles.card}>
      {productQuantityCount > 0 && (
        <button
          className={styles.trashBtn}
          onClick={handleRemove}
          title="Remove from cart"
        >
          <Trash2 size={20} color="red" />
        </button>
      )}
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      {/* {productQuantityCount > 0 && (
        <div className={styles.inCartBadge}>{productQuantityCount} in Cart</div>
      )} */}

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
        {productQuantityCount > 0 ? "Add to Existing Items" : "Add to Cart"}
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
