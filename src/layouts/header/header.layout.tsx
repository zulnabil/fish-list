import { FC, useState } from "react"
import ButtonComponent from "common/components/button/button.component"
import DialogComponent from "common/components/dialog/dialog.component"
import IconComponent from "common/components/icon/icon.component"
import { MENUS } from "common/config/menus.config"
import { HeaderProps } from "layouts/header/types/header.type"
import { MapMenu } from "layouts/side-nav/side-nav.layout"

import "./styles/header.style.scss"

export const HeaderLayout: FC<HeaderProps> = ({ logoUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="header-layout">
      <div className="header-layout__content container flex flex-align-center flex-justify-between">
        <div className="header-layout__logo">
          <img src={logoUrl} alt="logo" height="32" />
        </div>
        <div className="d-none">
          <ButtonComponent
            icon={<IconComponent color="grey">menu</IconComponent>}
            theme="secondary"
            onClick={(): void => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>
      <DialogComponent open={menuOpen} onClose={(): void => setMenuOpen(false)}>
        <MapMenu menus={MENUS} onClickMenu={(): void => setMenuOpen(false)} />
      </DialogComponent>
    </div>
  )
}
