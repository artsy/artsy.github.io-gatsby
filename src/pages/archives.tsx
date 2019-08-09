import { graphql, Link } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import ArchivesSort from "../components/ArchivesSort"

interface ArchivesPageProps {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          frontmatter: {
            title: string
            author: string[]
            date: string
          }
        }
      ]
    }
  }
}

class Archives extends React.Component<ArchivesPageProps, {}> {
  render() {
    const { data } = this.props
    const Posts = data.allMarkdownRemark.nodes

    return (
      <div>
        <Layout>
          {Posts.map((Post, index) => (
            <li key={index}>
              <ArchivesSort
                currentPost={Post}
                preDate={
                  index < 1 ? "empty" : Posts[index - 1].frontmatter.date
                }
              />
              <br />
            </li>
          ))}
        </Layout>
      </div>
    )
  }
}

export default Archives

export const archivesQueue = graphql`
  query archivesQueue {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          author
          title
          date(formatString: "YYYY")
        }
        id
      }
    }
  }
`
