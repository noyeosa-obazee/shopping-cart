import { useOutletContext } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useOutletContext();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <h2>Your cart is empty!</h2>;

  return (
    <div className={styles.container}>
      <h2>Your Shopping Cart</h2>
      <div className={styles.cartList}>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.images[0]} alt={item.name} />
            <div className={styles.details}>
              <h4>{item.name}</h4>
              <p>${item.price}</p>
            </div>

            <div className={styles.quantity}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h3>Total: ${total}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
