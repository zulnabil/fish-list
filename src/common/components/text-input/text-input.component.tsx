import { FC } from "react"
import { TextInputProps } from "common/components/text-input/types/text-input.type"

import "./styles/text-input.style.scss"

const TextInput: FC<TextInputProps> = ({ leftAddon, ...props }) => {
  return (
    <div className="ui-text-input__wrapper">
      {Boolean(leftAddon) && (
        <span className="ui-text-input__left-addon">{leftAddon}</span>
      )}
      <input
        className="ui-text-input"
        data-addon={Boolean(leftAddon)}
        {...props}
      />
    </div>
  )
}

export default TextInput
