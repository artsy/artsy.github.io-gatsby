import { Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"

interface ArchivesSortProps {
  readonly currentPost: Posts
  readonly preDate: string
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
  currentPost,
  preDate,
}) => {
  const {
    frontmatter: { title, date, author },
  } = currentPost

  return (
    <div>
      {date !== preDate && <ShowYear year={date} />}
      <Link to={`/blogs/${_.kebabCase(title)}`}>
        <big>{`${title} - ${author} ${date}`}</big>
      </Link>
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
