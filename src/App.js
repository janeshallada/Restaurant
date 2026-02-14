import {useState, useEffect} from 'react'
import Header from './components/Header'
import TabItem from './components/TabItem'
import DishItem from './components/DishItem'
import './App.css'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [menuList, setMenuList] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetch(
          'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
        )
        const data = await response.json()
        const apiData = data[0]

        setRestaurantName(apiData.restaurant_name)
        setMenuList(apiData.table_menu_list)

        if (apiData.table_menu_list && apiData.table_menu_list.length > 0) {
          const firstCategory = apiData.table_menu_list[0]
          // Handle ID from API (snake_case) or Test (camelCase)
          const firstId =
            firstCategory.menu_category_id || firstCategory.menuCategoryId
          setActiveCategoryId(String(firstId))
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching menu:', error)
        setIsLoading(false)
      }
    }
    getMenu()
  }, [])

  const onUpdateCart = (dishId, change) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.dishId === dishId)

      if (existingItem) {
        const updatedCart = prevCartItems.map(item => {
          if (item.dishId === dishId) {
            return {...item, quantity: item.quantity + change}
          }
          return item
        })
        return updatedCart.filter(item => item.quantity > 0)
      } else if (change > 0) {
        return [...prevCartItems, {dishId, quantity: 1}]
      }
      return prevCartItems
    })
  }

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }

  const getDishQuantity = dishId => {
    const item = cartItems.find(cartItem => cartItem.dishId === dishId)
    return item ? item.quantity : 0
  }

  const getActiveDishes = () => {
    const activeCategory = menuList.find(each => {
      const categoryId = each.menu_category_id || each.menuCategoryId
      return String(categoryId) === String(activeCategoryId)
    })

    if (!activeCategory) return []

    // FIX: Check for both snake_case (API) and camelCase (Tests)
    // The test might use 'categoryDishes', API uses 'category_dishes'
    return activeCategory.category_dishes || activeCategory.categoryDishes || []
  }

  return (
    <div className="app-container">
      <Header cartCount={getCartCount()} restaurantName={restaurantName} />

      {isLoading ? (
        <div className="loader-container">
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <>
          <ul className="tabs-container">
            {menuList.map(category => {
              const keyId = category.menu_category_id || category.menuCategoryId
              return (
                <TabItem
                  key={keyId}
                  details={category}
                  isActive={String(activeCategoryId) === String(keyId)}
                  clickTab={id => setActiveCategoryId(String(id))}
                />
              )
            })}
          </ul>

          <ul className="dishes-container">
            {getActiveDishes().map(dish => {
              const dishId = dish.dish_id || dish.dishId
              return (
                <DishItem
                  key={dishId}
                  details={dish}
                  quantity={getDishQuantity(dishId)}
                  updateCart={onUpdateCart}
                />
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
