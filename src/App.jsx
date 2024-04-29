import "./App.css";
import axios from "axios";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
// Components
import Category from "./components/Category";
import Cart from "./components/Cart";

const calculateTotal = (cart) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity * cart[i].price;
  }
  return total;
};

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("white");

  const myInput = useRef();

  console.log("App render");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--5ytnmfswy69s.code.run/",
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = useCallback((meal) => {
    setCart((prev) => {
      const cartCopy = structuredClone(prev);
      const mealPresent = cartCopy.find((elem) => elem.id === meal.id);
      if (mealPresent) {
        mealPresent.quantity++;
      } else {
        cartCopy.push({ ...meal, quantity: 1 });
      }
      return cartCopy;
    });
  }, []);

  const handleRemoveFromCart = useCallback((meal) => {
    setCart((prev) => {
      const cartCopy = structuredClone(prev);
      const mealPresent = cartCopy.find((elem) => elem.id === meal.id);
      if (mealPresent.quantity === 1) {
        const index = cartCopy.indexOf(mealPresent);
        cartCopy.splice(index, 1);
      } else {
        mealPresent.quantity--;
      }
      return cartCopy;
    });
  }, []);

  let total = useMemo(() => calculateTotal(cart), [cart]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={`App ${theme === "white" ? "theme-white" : "theme-red"}`}>
      <div className="hero container">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <img src={data.restaurant.picture} alt="" />
        <button
          className="theme-button"
          onClick={() => {
            setTheme((prev) => (prev === "white" ? "red" : "white"));
          }}
        >
          Switch theme
        </button>
      </div>
      <div className="content">
        <div className="sections-container container">
          <section className="left-section">
            <input type="text" ref={myInput} />
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return (
                  <Category
                    key={index}
                    category={category}
                    handleAddToCart={handleAddToCart}
                  />
                );
              } else {
                return null;
              }
            })}
            <button
              onClick={() => {
                myInput.current.focus();
              }}
            >
              Met le focus sur l'input
            </button>
          </section>
          <section className="right-section">
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
              total={total}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
