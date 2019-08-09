import { Link } from "gatsby"
import * as React from "react"

interface CategorySortProps {
  readonly currentIndex: string
  readonly preIndex: string
  readonly numOfBlog: number
  readonly index: number
}

interface ShowLetterProps {
  letter: string
}

export const CategorySort: React.SFC<CategorySortProps> = ({
  currentIndex,
  preIndex,
  numOfBlog,
  index,
}) => {
  return (
    <div>
      {index === 0 && <ShowLetter letter={currentIndex} />}
      {currentIndex.charAt(0) !== preIndex.charAt(0) && (
        <ShowLetter letter={currentIndex} />
      )}
      <Link to={`/categories/${currentIndex}`}>{currentIndex}</Link> :{" "}
      {numOfBlog}.
    </div>
  )
}

const ShowLetter: React.SFC<ShowLetterProps> = ({ letter }) => {
  return (
    <div>
      <h1>{letter.charAt(0)}</h1>
      -----------------------------------------
    </div>
  )
}

export default CategorySort
