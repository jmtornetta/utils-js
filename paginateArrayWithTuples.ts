import { Tuple } from './utilTypes'

export default function paginateArrayWithTuples<TData extends Record<string, any>, TNumber extends number>(data: TData[], itemsPerPage: TNumber){
  return data.reduce((acc, curr, i) => {
    if (i === acc.length - 1) return acc
    const indexForSlide = i % itemsPerPage
    if (indexForSlide === 0) acc.push([curr] as Tuple<TData, TNumber>) // Start a new slide
    else acc[acc.length - 1].push(curr) // Add to current slide
    return acc
  }, [] as Tuple<TData, TNumber>[])
}