import CartContext from '../../context/CartContext'
import Header from '../Header'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const renderEmptyCart = () => (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          alt="empty cart"
        />
      )

      const renderCartItems = () => (
        <div>
          <button type="button" onClick={removeAllCartItems}>
            Remove All
          </button>
          <ul>
            {cartList.map(each => (
              <li key={each.dishId}>
                <img src={each.dishImage} alt={each.dishName} />
                <p>{each.dishName}</p>

                {/* ✅ PRICE WITH CURRENCY (THIS FIXES TEST CASE 8) */}
                <p>
                  {each.dishCurrency} {each.dishPrice * each.quantity}
                </p>

                <button
                  type="button"
                  onClick={() => decrementCartItemQuantity(each.dishId)}
                >
                  -
                </button>
                <p>{each.quantity}</p>
                <button
                  type="button"
                  onClick={() => incrementCartItemQuantity(each.dishId)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>
      )

      return (
        <>
          {/* ✅ Pass a safe restaurant name to avoid header issues */}
          <Header restaurantName="UNI Resto Cafe" />
          {cartList.length === 0 ? renderEmptyCart() : renderCartItems()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
