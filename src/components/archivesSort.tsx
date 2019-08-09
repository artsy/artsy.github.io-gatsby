import * as React from "react"
import { Link } from "gatsby"
import * as _ from "lodash"

interface ArchivesSortProps {
  readonly currentNode: Posts
  readonly preNode: Posts
  readonly index: number
}
interface Posts {
  frontmatter: {
    readonly author: string[]
    readonly title: string
    readonly date: string
  }
}

interface ShowYearProps {
  year: string
}
export const ArchivesSort: React.SFC<ArchivesSortProps> = ({
  currentNode,
  preNode,
  index,
}) => {
  const {
    frontmatter: { title, date, author },
  } = currentNode
  const preDate = preNode.frontmatter.date
  return (
    <div>
      {index === 0 && <ShowYear year={date} />}
      {date !== preDate && <ShowYear year={date} />}
      <Link to={`/blogs/${_.kebabCase(title)}`}>
        <big>{title}</big>
      </Link>
      <small>{author}</small>
    </div>
  )
}

const ShowYear: React.SFC<ShowYearProps> = ({ year }) => {
  return (
    <div>
      <h1>{year}</h1>
      {/* pretend there is a beautiful line */}
      -----------------------------------------
    </div>
  )
}

export default ArchivesSort
