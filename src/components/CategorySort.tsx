import { Link } from "gatsby"
import * as React from "react"

interface CategorySortProps {
  readonly currentIndex: string
  readonly preLetter: string
  readonly numOfBlog: number
}

interface ShowLetterProps {
  letter: string
}

export const CategorySort: React.SFC<CategorySortProps> = ({
  currentIndex,
  preLetter,
  numOfBlog,
}) => {
  return (
    <div>
      {currentIndex.charAt(0) !== preLetter.charAt(0) && (
        <ShowLetter letter={currentIndex} />
      )}
      <Link to={`/Categories/${currentIndex}`}>{currentIndex}</Link> :{" "}
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
