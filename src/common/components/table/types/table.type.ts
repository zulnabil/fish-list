export interface TableProps {
  rows: any[]
  columns: ColumnObjectType[]
}

export type ColumnObjectType = {
  key: string
  align?: "left" | "right" | "center"
  label?: string
  width?: number
}
