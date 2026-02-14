const TabItem = ({details, isActive, clickTab}) => {
  const menuCategoryId = details.menu_category_id || details.menuCategoryId
  const menuCategory = details.menu_category || details.menuCategory

  const activeClass = isActive ? 'tab-item active' : 'tab-item'

  return (
    <li className={activeClass} onClick={() => clickTab(menuCategoryId)}>
      <button type="button" className="tab-button">
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
