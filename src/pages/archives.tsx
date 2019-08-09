import { graphql, Link } from "gatsby"
import * as _ from "lodash"
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
    const temp = data.allMarkdownRemark.nodes

    return (
      <div>
        <Layout>
          {temp.map((singleNode, index) => (
            <li key={index}>
              <ArchivesSort
                index={index}
                currentNode={singleNode}
                preNode={index < 1 ? singleNode : temp[index - 1]}
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
      }
    }
  }
`
