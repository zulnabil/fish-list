import { ChangeEventHandler, useMemo, useState } from "react"
import PaginationComponent from "common/components/pagination/pagination.component"
import TableComponent from "common/components/table/table.component"
import useFishList from "modules/fish-list/hooks/fish-list.hook"
import {
  DEFAULT_OFFSET,
  DEFAULT_LIMIT,
  COLUMNS,
  TOTAL_PAGE,
} from "modules/fish-list/constants/fish-list.constant"
import TextInput from "common/components/text-input/text-input.component"
import CardComponent from "common/components/card/card.component"
import IconComponent from "common/components/icon/icon.component"

const FishListContainer = () => {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")

  const offset = useMemo(() => {
    return DEFAULT_OFFSET + (page - 1) * DEFAULT_LIMIT
  }, [page])

  const { fishes, isLoading } = useFishList(
    {
      limit: DEFAULT_LIMIT,
      offset,
    },
    { komoditas: keyword }
  )

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <>
      <CardComponent>
        <TextInput
          onChange={handleChangeKeyword}
          leftAddon={<IconComponent color="grey">search</IconComponent>}
        />
      </CardComponent>
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
