import { CardProps } from "common/components/card/types/card.type"
import { FC } from "react"

import "./styles/card.style.scss"

/**
 * Card Component
 * @param {CardProps} props
 * @returns {FC}
 */
const CardComponent: FC<CardProps> = ({ children }) => {
  return <div className="ui-card">{children}</div>
}

export default CardComponent
