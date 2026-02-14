import {IoCartOutline} from 'react-icons/io5'

const Header = ({cartCount, restaurantName}) => {
  return (
    <nav className="header">
      <h1 className="logo">{restaurantName}</h1>
      <div className="cart-container">
        <p className="my-orders">My Orders</p>
        <div className="cart-icon-wrapper">
          <IoCartOutline size={30} />
          <span className="cart-badge">{cartCount}</span>
        </div>
      </div>
    </nav>
  )
}

export default Header
