export interface DialogProps {
  children?: React.ReactNode
  className?: string
  open?: boolean
  onClose?: () => void
  type?: "modal" | "drawer"
  direction?: "left" | "right" | "top" | "bottom"
  drawerInMobile?: boolean
}
