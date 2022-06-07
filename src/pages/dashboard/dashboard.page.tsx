import TableComponent from "common/components/table/table.component"
import LayoutComponent from "layouts/layout.component"
import useFishList from "modules/fish-list/hooks/fish-list.hook"
import "./styles/dashboard.style.scss"

const columns = [
  {
    key: "komoditas",
    label: "Komoditas",
  },
  {
    key: "size",
    label: "Ukuran",
  },
  {
    key: "price",
    label: "Harga",
  },
  {
    key: "tgl_parsed",
    label: "Tgl. diperbarui",
  },
]

const Dashboard = () => {
  const { fishes } = useFishList({ limit: 200 })

  return (
    <LayoutComponent>
      <div className="ui-page">
        <TableComponent columns={columns} rows={fishes}></TableComponent>
      </div>
    </LayoutComponent>
  )
}

export default Dashboard
