import { Star, StarOutline } from '../../../../assets/components'
type PropsRating = {
  rating: number
}
export const Rating = ({ rating }: PropsRating) => {
  return (
    <>
      <Stars selected={rating > 1} />
      <Stars selected={rating > 2} />
      <Stars selected={rating > 3} />
      <Stars selected={rating > 4} />
      <Stars selected={rating > 5} />
    </>
  )
}

type PropsStar = {
  selected: boolean
}
const Stars = ({ selected }: PropsStar) => {
  return <>{selected ? <Star /> : <StarOutline />}</>
}
