import * as Yup from "yup"

export const DEFAULT_LIMIT = 15
export const DEFAULT_OFFSET = 0
export const TOTAL_ITEMS = 250 // total items in the sheet
export const TOTAL_PAGE = Math.floor(
  (TOTAL_ITEMS - Math.max(DEFAULT_OFFSET, 0)) / DEFAULT_LIMIT
)

export const COLUMNS = [
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
    label: "Harga (Rp)",
  },
  {
    key: "tgl_parsed",
    label: "Tgl. diperbarui",
  },
]

export const addFishDefaultValue = {
  komoditas: "",
  price: "",
  city: "",
  size: "",
}

export const addFishSchema = Yup.object().shape({
  komoditas: Yup.string().required("Nama komoditas wajib diisi"),
  city: Yup.string().required("Kota wajib diisi"),
  price: Yup.string()
    .required("Harga wajib diisi")
    .matches(/^[0-9]+$/, "Isi hanya angka"),
  size: Yup.string()
    .required("Ukuran wajib diisi")
    .matches(/^[0-9]+$/, "Isi hanya angka"),
})
