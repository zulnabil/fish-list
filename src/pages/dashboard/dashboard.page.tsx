import LayoutComponent from "layouts/layout.component"
import FishListContainer from "modules/fish-list/containers/fish-list.container"
import "./styles/dashboard.style.scss"

const DashboardPage = () => {
  return (
    <LayoutComponent>
      <div className="ui-page">
        <FishListContainer />
      </div>
    </LayoutComponent>
  )
}

export default DashboardPage
