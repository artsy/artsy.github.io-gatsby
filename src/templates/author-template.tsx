import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/Layout"

interface CategoriesTemplateProp {
  location: any
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

class CategoriesTemplate extends React.Component<CategoriesTemplateProp, {}> {
  render() {
    const { data } = this.props
    const allNodes = data.allMarkdownRemark.nodes
    const { location } = this.props
    return (
      <div>
        <Layout>
          <h1>{location.state.name} : </h1>
          {allNodes.map((singleNode, index) => {
            const { date, title } = singleNode.frontmatter

            return (
              <div key={index}>
                <Link to={`/blogs/${_.kebabCase(title)}`}>{title}</Link>
                <small>{date}</small>
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
  query authorPageQuery($author: String!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { author: { eq: $author } } }
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
