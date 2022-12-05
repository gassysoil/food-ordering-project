import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  function showCartHandler() {
    setCartIsShown(true);
  }

  function hideCartHandler() {
    setCartIsShown(false);
  }

  return (
    // Every component in App.js needs access to the Cart component
    // thus, wrap everything with CartProvider component
    <CartProvider>
      {/* Cart will show is below logics are true */}
      {cartIsShown && <Cart onClickClose={hideCartHandler}></Cart>}
      <Header onClickCart={showCartHandler}>Let's get started!</Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
