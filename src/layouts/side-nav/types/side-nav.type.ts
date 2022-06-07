export interface SideNavProps {
  menus: SideNavMenuItem[]
  onClickMenu?: (menu?: SideNavMenuItem) => void
}

export type SideNavMenuItem = {
  icon: string
  label: string
  to: string
}
