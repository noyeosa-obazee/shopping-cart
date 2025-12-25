// App.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar.jsx";
import styles from "./App.module.css";

function App() {
  const [cart, setCart] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category/smartphones"
        );

        const data = await response.json();

        setProductsData(data.products);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsData();
  }, []);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />

      <div className={styles.content}>
        <Outlet
          context={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            loading,
            productsData,
          }}
        />
      </div>
    </div>
  );
}

export default App;
