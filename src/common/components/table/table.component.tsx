import { FC } from "react"
import CardComponent from "common/components/card/card.component"
import { TableProps } from "common/components/table/types/table.type"

import "./styles/table.style.scss"

const TableComponent: FC<TableProps> = ({ columns, rows }) => {
  if (!rows || !rows.length) return null

  return (
    <CardComponent>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map(({ label }) => (
              <th>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {columns.map(({ key }) => (
                <td>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </CardComponent>
  )
}

export default TableComponent
