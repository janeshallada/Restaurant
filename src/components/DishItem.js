import CartContext from '../context/CartContext'

const DishItem = ({details, quantity, updateCart}) => {
  const dishId = details.dish_id || details.dishId
  const dishName = details.dish_name || details.dishName
  const dishPrice = details.dish_price || details.dishPrice
  const dishImage = details.dish_image || details.dishImage
  const dishCurrency = details.dish_currency || details.dishCurrency
  const dishCalories = details.dish_calories || details.dishCalories
  const dishDescription = details.dish_description || details.dishDescription
  const dishType = details.dish_Type || details.dishType

  const isAvailable =
    details.dish_Availability ||
    details.dishAvailability ||
    details.dish_availability

  const addonCat = details.addoncat || details.addonCat
  const hasAddons = addonCat && addonCat.length > 0

  return (
    <li className="dish-item">
      <div className="dish-details-side">
        <div className={`veg-border ${dishType === 1 ? 'non-veg' : 'veg'}`}>
          <div className={`veg-dot ${dishType === 1 ? 'non-veg' : 'veg'}`} />
        </div>

        <div className="dish-info">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-currency">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>

          {isAvailable ? (
            <div className="controller-container">
              <button
                type="button"
                className="control-btn"
                onClick={() => updateCart(dishId, -1)}
              >
                -
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="control-btn"
                onClick={() => updateCart(dishId, 1)}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-available">Not available</p>
          )}

          {hasAddons && (
            <p className="customization-text">Customizations available</p>
          )}

          {/* ✅ ADD TO CART BUTTON */}
          <CartContext.Consumer>
            {value => {
              const {addCartItem} = value

              const onClickAddToCart = () => {
                addCartItem({
                  dishId,
                  dishName,
                  dishPrice,
                  dishImage,
                  dishCurrency,
                })
              }

              return isAvailable && quantity > 0 ? (
                <button type="button" onClick={onClickAddToCart}>
                  ADD TO CART
                </button>
              ) : null
            }}
          </CartContext.Consumer>
        </div>
      </div>

      <div className="dish-image-side">
        <p className="calories">{dishCalories} calories</p>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
    </li>
  )
}

export default DishItem
