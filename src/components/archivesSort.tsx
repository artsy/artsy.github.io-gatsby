import { Link } from "gatsby"
import * as React from "react"
import ShowYear from "../components/showYear"

interface ArchivesSortProps {
  readonly index: number

  readonly currentNode: {
    frontmatter: {
      readonly author: string[]
      readonly title: string
      readonly date: string
    }
  }
  readonly preNode: {
    readonly frontmatter: {
      readonly date: string
    }
  }
}

export class ArchivesSort extends React.Component<ArchivesSortProps, {}> {
  render() {
    const { currentNode, preNode, index } = this.props
    const title = currentNode.frontmatter.title
    const date = currentNode.frontmatter.date
    const author = currentNode.frontmatter.author
    const preDate = preNode.frontmatter.date

    return (
      <div>
        {index === 0 && <ShowYear year={date} />}
        {date !== preDate && <ShowYear year={date} />}
        <big>{title}</big>
        <small>{author}</small>
      </div>
    )
  }
}

export default ArchivesSort
