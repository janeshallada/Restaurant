const TabItem = props => {
  const {tabDetails, isActive, onClickTab} = props

  if (!tabDetails) {
    return null
  }

  const menuCategoryId =
    tabDetails.menu_category_id || tabDetails.menuCategoryId

  const menuCategory = tabDetails.menu_category || tabDetails.menuCategory

  const activeClass = isActive ? 'tab-item active' : 'tab-item'

  const onClick = () => {
    onClickTab(menuCategoryId)
  }

  return (
    <li className={activeClass}>
      <button type="button" className="tab-button" onClick={onClick}>
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
