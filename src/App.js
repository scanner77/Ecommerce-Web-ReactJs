import React, {useState, useEffect} from 'react'
import { Products, Navbar, Cart } from './Components'
import {commerce} from './lib/commerce'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Checkout from './Components/CheckoutForm/Checkout/Checkout'
const App = () => {

  const[products, setProducts] = useState([])
  const[cart, setCart] = useState({})
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    // const response = await commerce.products.list(); Here we can destructure response and it will act as our products
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const  handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity)
    setCart(response.cart); //This is the cart after the item has been added
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, {quantity})
    setCart(response.cart)
  }

  const handleRemoveFromCart = async(productId) =>{
    const response = await commerce.cart.remove(productId)
    setCart(response.cart)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  console.log("incoming order" + order)

  useEffect(() => {
      fetchProducts();
      fetchCart();
  },[])

  // console.log(cart);

  return (
    <Router>
    <div>
      <Navbar totalItems = {cart.total_items}/>
      <Switch>
        <Route exact path = "/">
        <Products products={products} onAddToCart = {handleAddToCart} /> 
        </Route>

        <Route path = "/cart" >
        <Cart 
        cart = {cart}
        handleAddToCart = {handleAddToCart}
        handleUpdateCartQty = {handleUpdateCartQty}
        handleRemoveFromCart = {handleRemoveFromCart}
        handleEmptyCart = {handleEmptyCart}
        />
        </Route>
        <Route path = "/checkout">
          <Checkout  
          cart = {cart}
          order = {order}
          onCaptureCheckout={handleCaptureCheckout}
          error = {errorMessage}
          />
        </Route>

      </Switch>
    </div>
    </Router> 
  )
}
export default App
