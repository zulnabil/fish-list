import { FC, useMemo, useRef, useState } from "react"
import { v4 } from "uuid"
import { debounce } from "debounce"

import ButtonComponent from "common/components/button/button.component"
import DialogComponent from "common/components/dialog/dialog.component"
import TextInput from "common/components/text-input/text-input.component"
import useFishArea from "modules/fish-list/hooks/fish-area.hook"
import useFishSize from "modules/fish-list/hooks/fish-size.hook"
import { addFish } from "modules/fish-list/services/fish-list.service"

import "./styles/dialog-add-fish.style.scss"
import { DialogAddFishProps } from "modules/fish-list/components/dialog-add-fish/types/dialog-add-fish.type"

const DialogAddFishComponent: FC<DialogAddFishProps> = ({
  open,
  onClose,
  onFinishAddFish,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [keywordCity, setKeywordCity] = useState("")
  const [selectedArea, setSelectedArea] = useState({
    city: "",
    province: "",
  })
  const [selectedSize, setSelectedSize] = useState("")
  const [tempValueArea, setTempValueArea] = useState("")
  const [tempValueSize, setTempValueSize] = useState("")

  const { optionAreas } = useFishArea(keywordCity)

  const { optionSizes } = useFishSize()

  const isLoading = status === "loading"

  const handleChangeKeyword = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeywordCity(event.target.value.toUpperCase())
    },
    500
  )

  const SuggestionsArea = useMemo(() => {
    return optionAreas?.length ? (
      <div className="suggestion">
        {optionAreas?.map((area: any) => (
          <div
            key={area.city}
            onClick={() => {
              setSelectedArea(area)
              setTempValueArea(`${area.city}, ${area.province}`)
            }}
          >{`${area.city}, ${area.province}`}</div>
        ))}
      </div>
    ) : null
  }, [optionAreas])

  const SuggestionsSize = useMemo(() => {
    return optionSizes?.length ? (
      <div className="suggestion">
        {optionSizes?.map(({ size }: any) => (
          <div
            key={size}
            onClick={() => {
              setSelectedSize(size)
              setTempValueSize(size)
            }}
          >
            {size}
          </div>
        ))}
      </div>
    ) : null
  }, [optionSizes])

  const clearAllValues = () => {
    if (!inputRefs.current) return

    inputRefs.current.forEach((inputRef: HTMLInputElement) => {
      inputRef.value = ""
    })
    setTempValueArea("")
    setTempValueSize("")
    setSelectedArea({ city: "", province: "" })
    setSelectedSize("")
  }

  const handleCloseDialog = () => {
    onClose && onClose()
    clearAllValues()
  }

  const handleSubmit = async () => {
    const payload = {
      uuid: v4(),
      komoditas: inputRefs.current[0].value,
      price: inputRefs.current[1].value,
      area_provinsi: selectedArea.province,
      area_kota: selectedArea.city,
      size: selectedSize,
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
      <div className="ui-dialog-add-fish__body">
        <TextInput
          placeholder="Nama komoditas"
          ref={(el) => (inputRefs.current[0] = el as HTMLInputElement)}
        />
        <TextInput
          placeholder="Harga"
          ref={(el) => (inputRefs.current[1] = el as HTMLInputElement)}
        />
        <TextInput
          placeholder="Cari Kota"
          onChange={(event) => {
            handleChangeKeyword(event)
            setTempValueArea(event.target.value)
          }}
          suggestionElement={SuggestionsArea}
          valueInitial={tempValueArea}
          ref={(el) => (inputRefs.current[2] = el as HTMLInputElement)}
        />
        <TextInput
          placeholder="Ukuran"
          onChange={(event) => {
            setTempValueSize(event.target.value)
          }}
          suggestionElement={SuggestionsSize}
          valueInitial={tempValueSize}
          ref={(el) => (inputRefs.current[3] = el as HTMLInputElement)}
          readOnly
        />
        <ButtonComponent size="large" onClick={handleSubmit}>
          Submit{isLoading && "..."}
        </ButtonComponent>
      </div>
    </DialogComponent>
  )
}

export default DialogAddFishComponent
