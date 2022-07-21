import { FC, useMemo, useState } from "react"
import { v4 } from "uuid"
import { debounce } from "debounce"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import ButtonComponent from "common/components/button/button.component"
import DialogComponent from "common/components/dialog/dialog.component"
import TextInput from "common/components/text-input/text-input.component"
import useFishArea from "modules/fish-list/hooks/fish-area.hook"
import useFishSize from "modules/fish-list/hooks/fish-size.hook"
import { addFish } from "modules/fish-list/services/fish-list.service"

import "./styles/dialog-add-fish.style.scss"
import { DialogAddFishProps } from "modules/fish-list/components/dialog-add-fish/types/dialog-add-fish.type"
import { addFishSchema } from "modules/fish-list/constants/fish-list.constant"

const DialogAddFishComponent: FC<DialogAddFishProps> = ({
  open,
  onClose,
  onFinishAddFish,
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [keywordCity, setKeywordCity] = useState("")

  const { optionAreas } = useFishArea(keywordCity)

  const { optionSizes } = useFishSize()

  const isLoading = status === "loading"

  const handleChangeKeyword = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeywordCity(event.target.value.toUpperCase())
    },
    500
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(addFishSchema),
  })

  const SuggestionsArea = useMemo(() => {
    return optionAreas?.length ? (
      <div className="suggestion">
        {optionAreas?.map((area: any) => (
          <div
            key={area.city}
            onClick={() => {
              setValue("city", `${area.city}, ${area.province}`)
            }}
          >{`${area.city}, ${area.province}`}</div>
        ))}
      </div>
    ) : null
  }, [optionAreas, setValue])

  const SuggestionsSize = useMemo(() => {
    return optionSizes?.length ? (
      <div className="suggestion">
        {optionSizes?.map(({ size }: any) => (
          <div
            key={size}
            onClick={() => {
              setValue("size", size)
            }}
          >
            {size}
          </div>
        ))}
      </div>
    ) : null
  }, [optionSizes, setValue])

  const clearAllValues = () => {
    reset()
    setKeywordCity("")
  }

  const handleCloseDialog = () => {
    onClose && onClose()

    clearAllValues()
  }

  const onSubmitHandler = async ({
    komoditas,
    price,
    size,
    ...values
  }: any) => {
    const [area_kota, area_provinsi] = values.city.split(", ")

    const payload = {
      uuid: v4(),
      komoditas,
      price,
      area_provinsi: area_provinsi || "",
      area_kota,
      size,
      tgl_parsed: new Date().toISOString(),
      timestamp: `${Date.now()}`,
    }

    try {
      setStatus("loading")
      const res = await addFish(payload)
      if (res.status === 200) {
        onFinishAddFish()
        handleCloseDialog()
        setStatus("idle")
      } else throw res
    } catch (error) {
      // do handling error
    }
  }

  return (
    <DialogComponent
      className="ui-dialog-add-fish"
      open={open}
      onClose={handleCloseDialog}
      type="modal"
    >
      <div className="ui-dialog-add-fish__header">
        <p>Tambah Komoditas</p>
      </div>

      <form
        className="ui-dialog-add-fish__body"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
      >
        <TextInput
          {...register("komoditas")}
          errorMessage={errors.komoditas?.message as unknown as string}
          placeholder="Nama komoditas"
          required
        />
        <TextInput
          {...register("price")}
          errorMessage={errors.price?.message as unknown as string}
          placeholder="Harga"
          required
        />
        <TextInput
          {...register("city")}
          errorMessage={errors.city?.message as unknown as string}
          placeholder="Cari Kota"
          onChange={handleChangeKeyword}
          suggestionElement={SuggestionsArea}
          required
        />
        <TextInput
          {...register("size")}
          errorMessage={errors.size?.message as unknown as string}
          placeholder="Ukuran"
          suggestionElement={SuggestionsSize}
          readOnly
        />
        <ButtonComponent size="large" type="submit">
          Submit{isLoading && "..."}
        </ButtonComponent>
      </form>
    </DialogComponent>
  )
}

export default DialogAddFishComponent
