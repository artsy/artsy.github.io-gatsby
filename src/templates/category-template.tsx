import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/Layout"

interface CategoriesTemplate {
  data: {
    allMarkdownRemark: {
      distinct: string[]
    }
  }
}

class CategoriesTemplate extends React.Component<CategoriesTemplate, {}> {
  render() {
    const { data } = this.props
    const allTitle = data.allMarkdownRemark.distinct

    return (
      <div>
        <Layout>
          {allTitle.map((singleTitle, index) => {
            return (
              <div key={index}>
                <Link to={`/blogs/${_.kebabCase(singleTitle)}`}>
                  {singleTitle}
                </Link>
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
  query catePageQuery($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      distinct(field: frontmatter___title)
    }
  }
`
