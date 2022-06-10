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
import ButtonComponent from "common/components/button/button.component"
import DialogAddFishComponent from "modules/fish-list/components/dialog-add-fish/dialog-add-fish.component"

const FishListContainer = () => {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  const [dialogAddOpen, setDialogAddOpen] = useState(false)

  const offset = useMemo(() => {
    return DEFAULT_OFFSET + (page - 1) * DEFAULT_LIMIT
  }, [page])

  const { fishes, mutate, isLoading } = useFishList(
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

  const EmptyState = () => {
    return !fishes?.length && !isLoading ? (
      <CardComponent>
        <p className="text-center">There is no data</p>
      </CardComponent>
    ) : (
      <></>
    )
  }

  return (
    <>
      <CardComponent className="flex flex-align-center flex-justify-between gap-16">
        <TextInput
          onChange={handleChangeKeyword}
          leftAddon={<IconComponent color="grey">search</IconComponent>}
          placeholder="Cari nama komoditas"
        />
        <ButtonComponent size="large" onClick={() => setDialogAddOpen(true)}>
          Tambah
        </ButtonComponent>
      </CardComponent>
      <TableComponent
        isLoading={isLoading}
        columns={COLUMNS}
        rows={fishes}
        rowCount={DEFAULT_LIMIT}
      ></TableComponent>
      <EmptyState />
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
      <DialogAddFishComponent
        open={dialogAddOpen}
        onClose={(): void => setDialogAddOpen(false)}
        onFinishAddFish={mutate}
      />
    </>
  )
}

export default FishListContainer
