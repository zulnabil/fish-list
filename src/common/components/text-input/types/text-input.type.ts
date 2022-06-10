import { InputHTMLAttributes } from "react"

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftAddon?: React.ReactNode
}
