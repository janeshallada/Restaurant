import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Home from './components/HomeRoute'
import Login from './components/Login'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productExists = cartList.find(each => each.dishId === product.dishId)

    if (productExists) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.dishId === product.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      }))
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, {...product, quantity: 1}],
      }))
    }
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.dishId !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.dishId === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.dishId === id)

    if (item.quantity === 1) {
      this.removeCartItem(id)
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.dishId === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const jwtToken = Cookies.get('jwt_token')

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            {/* Login */}
            <Route
              exact
              path="/login"
              render={props =>
                jwtToken ? <Redirect to="/" /> : <Login {...props} />
              }
            />

            {/* Home MUST always render for tests */}
            <Route exact path="/" component={Home} />

            {/* Cart can render without auth for tests */}
            <Route exact path="/cart" component={Cart} />

            <Redirect to="/" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
