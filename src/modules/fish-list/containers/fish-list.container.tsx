import { useMemo, useState } from "react"
import PaginationComponent from "common/components/pagination/pagination.component"
import TableComponent from "common/components/table/table.component"
import useFishList from "modules/fish-list/hooks/fish-list.hook"
import {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  COLUMNS,
  TOTAL_PAGE,
} from "modules/fish-list/constants/fish-list.constant"

const FishListContainer = () => {
  const [page, setPage] = useState(1)

  const offset = useMemo(() => {
    return DEFAULT_OFFSET + (page - 1) * DEFAULT_LIMIT
  }, [page])

  const { fishes, isLoading } = useFishList({ limit: DEFAULT_LIMIT, offset })

  return (
    <>
      <TableComponent
        isLoading={isLoading}
        columns={COLUMNS}
        rows={fishes}
        rowCount={DEFAULT_LIMIT}
      ></TableComponent>
      <div className="flex">
        <PaginationComponent
          page={page}
          range={5}
          totalPage={TOTAL_PAGE}
          onChange={setPage}
        />
      </div>
    </>
  )
}

export default FishListContainer
