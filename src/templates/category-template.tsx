import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import ArchivesSort from "../components/ArchivesSort"
import Layout from "../components/Layout"

interface CategoriesTemplate {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          frontmatter: {
            date: string
            author: string[]
            title: string
          }
        }
      ]
    }
  }
}

class CategoriesTemplate extends React.Component<CategoriesTemplate, {}> {
  render() {
    const { nodes } = this.props.data.allMarkdownRemark

    return (
      <div>
        <Layout>
          {nodes.map((singleNode, index) => {
            const { title, author, date } = singleNode.frontmatter
            return (
              <div key={index}>
                <ArchivesSort
                  currentPost={singleNode}
                  preDate={index < 1 ? null : nodes[index - 1].frontmatter.date}
                />
              </div>
            )
          })}
        </Layout>
      </div>
    )
  }
}

export default CategoriesTemplate

export const pageQuery = graphql`
  query catePageQuery($cate: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { categories: { eq: $cate } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY")
          author
          title
        }
      }
    }
  }
`
