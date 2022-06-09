import { FC, useEffect, useRef } from "react"
import { DialogProps } from "common/components/dialog/types/dialog.type"

import "./styles/dialog.style.scss"
import { objToString } from "common/helper/string.helper"

/**
 * Dialog HTML5 Component
 * @param {DialogProps} props
 * @returns {FC}
 */
const DialogComponent: FC<DialogProps> = ({ children, open, onClose }) => {
  const ref: any = useRef(null)

  const className = {
    "ui-dialog": true,
    "ui-dialog--hide": !open,
  }

  useEffect(() => {
    if (open) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [open])

  const handleClickOutside = (event: any): void => {
    if (!onClose) return

    const rect = event.target.getBoundingClientRect()
    var isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    if (!isInDialog) {
      onClose()
    }
  }

  return (
    <dialog
      ref={ref}
      className={objToString(className)}
      onClick={handleClickOutside}
    >
      {children}
    </dialog>
  )
}

export default DialogComponent
