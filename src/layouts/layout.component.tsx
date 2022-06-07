import { FC } from "react"
import { MENUS } from "common/config/menus.config"
import SideNavLayout from "layouts/side-nav/side-nav.layout"
import { LayoutProps } from "layouts/types/layout.type"
import { HeaderLayout } from "layouts/header/header.layout"

import "./styles/layout.style.scss"

const LayoutComponent: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="ui-layout background">
      <HeaderLayout logoUrl="/assets/logo.png" />
      <div className="ui-layout__body container container--full flex flex-align-start">
        <SideNavLayout menus={MENUS} />
        {children}
      </div>
    </div>
  )
}

export default LayoutComponent
