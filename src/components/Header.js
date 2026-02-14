import {IoCartOutline} from 'react-icons/io5'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../context/CartContext'

// import './.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartCount = cartList.length

      const {restaurantName, history} = props

      const onClickCart = () => {
        history.push('/cart')
      }

      const onClickHome = () => {
        history.push('/')
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <nav className="header">
          <h1 className="logo" onClick={onClickHome}>
            {restaurantName}
          </h1>
          <div className="cart-container">
            <p className="my-orders">My Orders</p>

            {/* ✅ Cart Button must be a BUTTON for tests */}
            <button
              type="button"
              className="cart-icon-wrapper"
              data-testid="cart"
              onClick={onClickCart}
            >
              <IoCartOutline size={30} />
            </button>

            {/* ✅ Count must be rendered AFTER cart button */}
            <span className="cart-badge">{cartCount}</span>

            <button type="button" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
