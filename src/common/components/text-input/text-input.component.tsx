import { forwardRef, useState } from "react"
import { TextInputProps } from "common/components/text-input/types/text-input.type"

import "./styles/text-input.style.scss"

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ leftAddon, suggestionElement, valueInitial, ...props }, ref) => {
    const [isFocus, setIsFocus] = useState(false)

    const value = valueInitial || props.value
    return (
      <div className="ui-text-input__wrapper">
        {Boolean(leftAddon) && (
          <span className="ui-text-input__left-addon">{leftAddon}</span>
        )}
        <input
          className="ui-text-input"
          data-addon={Boolean(leftAddon)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setTimeout(() => setIsFocus(false), 100)}
          value={value}
          {...props}
          ref={ref}
        />
        {Boolean(suggestionElement) && isFocus && suggestionElement}
      </div>
    )
  }
)

export default TextInput
