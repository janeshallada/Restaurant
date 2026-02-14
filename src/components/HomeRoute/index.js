import {Component} from 'react'
import Header from '../Header'
import TabItem from '../TabItem'
import DishItem from '../DishItem'

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

class HomeRoute extends Component {
  state = {
    restaurantData: {},
    tableMenuList: [],
    activeTabId: '',
    quantities: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const response = await fetch(dishesApiUrl)
    const data = await response.json()

    const restaurantData = Array.isArray(data) ? data[0] : data
    const tableMenuList =
      restaurantData.table_menu_list || restaurantData.tableMenuList || []

    const firstTab = tableMenuList[0]
    const firstTabId =
      (firstTab && (firstTab.menu_category_id || firstTab.menuCategoryId)) || ''

    this.setState({
      restaurantData,
      tableMenuList,
      activeTabId: firstTabId,
      isLoading: false,
    })
  }

  onClickTab = id => {
    this.setState({activeTabId: id})
  }

  updateCart = (dishId, value) => {
    this.setState(prevState => {
      const prevQty = prevState.quantities[dishId] || 0
      const newQty = prevQty + value

      if (newQty < 0) {
        return null
      }

      return {
        quantities: {
          ...prevState.quantities,
          [dishId]: newQty,
        },
      }
    })
  }

  renderDishes = () => {
    const {tableMenuList, activeTabId, quantities} = this.state

    const activeTab = tableMenuList.find(each => {
      const id = each.menu_category_id || each.menuCategoryId
      return id === activeTabId
    })

    if (!activeTab) {
      return null
    }

    const dishes = activeTab.category_dishes || activeTab.categoryDishes || []

    return (
      <ul>
        {dishes.map(eachDish => {
          const dishId = eachDish.dish_id || eachDish.dishId
          const quantity = quantities[dishId] || 0

          return (
            <DishItem
              key={dishId}
              details={eachDish}
              quantity={quantity}
              updateCart={this.updateCart}
            />
          )
        })}
      </ul>
    )
  }

  render() {
    const {restaurantData, tableMenuList, activeTabId, isLoading} = this.state

    if (isLoading) {
      return null
    }

    return (
      <div>
        <Header
          restaurantName={
            restaurantData.restaurant_name || restaurantData.restaurantName
          }
        />

        <div>
          {tableMenuList.map(eachTab => {
            const tabId = eachTab.menu_category_id || eachTab.menuCategoryId
            return (
              <TabItem
                key={tabId}
                tabDetails={eachTab}
                isActive={tabId === activeTabId}
                onClickTab={this.onClickTab}
              />
            )
          })}
        </div>

        {this.renderDishes()}
      </div>
    )
  }
}

export default HomeRoute
