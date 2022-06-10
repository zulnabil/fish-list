import { useMemo, useState } from "react"
import debounce from "debounce"
import PaginationComponent from "common/components/pagination/pagination.component"
import TableComponent from "common/components/table/table.component"
import useFishList from "modules/fish-list/hooks/fish-list.hook"
import {
  DEFAULT_OFFSET,
  COLUMNS,
  TOTAL_PAGE,
  DEFAULT_LIMIT,
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
    keyword
  )

  const handleChangeKeyword = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value)
    },
    500
  )

  return (
    <>
      <CardComponent>
        <TextInput
          onChange={handleChangeKeyword}
          leftAddon={<IconComponent color="grey">search</IconComponent>}
          placeholder="Cari nama komoditas"
        />
      </CardComponent>
      <TableComponent
        isLoading={isLoading}
        columns={COLUMNS}
        rows={fishes}
        rowCount={DEFAULT_LIMIT}
      ></TableComponent>
      {Boolean(!keyword) && (
        <div className="flex">
          <PaginationComponent
            page={page}
            range={5}
            totalPage={TOTAL_PAGE}
            onChange={setPage}
          />
        </div>
      )}
    </>
  )
}

export default FishListContainer
