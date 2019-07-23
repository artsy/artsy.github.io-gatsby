import { Link } from "gatsby"
import * as React from "react"
import Showletter from "./showletter"

interface CateSortProps {
  readonly currentIndex: string
  readonly preIndex: string
  readonly numOfBlog: number
  readonly index: number
}

export class CateSort extends React.Component<CateSortProps, {}> {
  render() {
    const { currentIndex, preIndex, numOfBlog, index } = this.props
    return (
      <div>
        {index === 0 && <Showletter letter={currentIndex} />}
        {currentIndex.charAt(0) !== preIndex.charAt(0) && (
          <Showletter letter={currentIndex} />
        )}
        <Link to={`/categories/${currentIndex}`}>{currentIndex}</Link> :{" "}
        {numOfBlog}.
      </div>
    )
  }
}

export default CateSort
