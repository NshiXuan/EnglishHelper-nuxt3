
export interface IRoot<T> {
  type: string
  errorCode: number
  elapsedTime: number
  translateResult: T[][]
}

export interface ITrans {
  src: string
  tgt: string
}

export const getTrans = (w: string) => {
  return useFetch(`http://www.iciba.com/fy?f=auto&t=auto&w=${w}`, {
    method: "GET"
  })
  // return useFetch(`http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${i}`, {
  //   method: "GET"
  // })
}
