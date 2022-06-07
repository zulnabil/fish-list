export const objToString = (obj: any) => {
  try {
    return Object.keys(obj)
      .filter((item: string) => obj[item])
      .map((item: string) => item)
      .join(" ")
  } catch (e) {
    console.error(e)
    throw e
  }
}
