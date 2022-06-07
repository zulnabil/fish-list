import { CardProps } from "common/components/card/types/card.type"
import { FC } from "react"

import "./styles/card.style.scss"

const CardComponent: FC<CardProps> = ({ children }) => {
  return <div className="ui-card">{children}</div>
}

export default CardComponent
