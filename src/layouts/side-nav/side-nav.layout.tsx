import { FC, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { SideNavProps } from "layouts/side-nav/types/side-nav.type"
import IconComponent from "common/components/icon/icon.component"
import { NavLink } from "react-router-dom"
import { MENUS } from "common/config/menus.config"

import "./styles/side-nav.style.scss"
import ButtonComponent from "common/components/button/button.component"

export const MapMenu = ({ menus, onClickMenu }: SideNavProps) => {
  return (
    <>
      <p className="side-nav-layout__subtitle">MENU</p>
      <div className="side-nav-layout__menus">
        {menus.map(({ icon, label, to }) => {
          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "side-nav-layout__menu active"
                  : "side-nav-layout__menu"
              }
              onClick={(): void => onClickMenu && onClickMenu()}
            >
              <IconComponent color="blackSoft" size={20}>
                {icon}
              </IconComponent>
              <p className="side-nav-layout__menu--label">{label}</p>
            </NavLink>
          )
        })}
      </div>
    </>
  )
}

export const SideNavLayout: FC<SideNavProps> = (props) => {
  const { menus: menusProp } = props
  const menus = menusProp || MENUS

  const location = useLocation()

  const activeLabel = useMemo(() => {
    const menu = menus.find((menu) => menu.to === location.pathname)

    return menu ? menu.label : "Home"
  }, [location.pathname, menus])

  return (
    <div className="side-nav-layout">
      <ButtonComponent size="large" theme="secondary" variant="text">
        {activeLabel}
      </ButtonComponent>
      <div className="m-d-none">
        <MapMenu menus={menus} />
      </div>
    </div>
  )
}

export default SideNavLayout
