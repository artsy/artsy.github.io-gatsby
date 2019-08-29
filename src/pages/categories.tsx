import { graphql, Link } from "gatsby"
import * as React from "react"
import CategorySort from "../components/CategorySort"
import Layout from "../components/layout"

interface CategoriesPageProps {
  readonly data: {
    readonly allMarkdownRemark: {
      readonly group: [
        {
          readonly fieldValue: string
          readonly totalCount: number
        }
      ]
    }
  }
}

class Categories extends React.Component<CategoriesPageProps, {}> {
  render() {
    const { data } = this.props
    const allMarkDown = data.allMarkdownRemark

    return (
      <div>
        <Layout>
          <h3>Categorie we have :</h3>

          <ul>
            {allMarkDown.group.map((singleCategory, index) => (
              <li key={index}>
                <CategorySort
                  currentIndex={singleCategory.fieldValue}
                  preLetter={
                    index < 1 ? "" : allMarkDown.group[index - 1].fieldValue
                  }
                  numOfBlog={singleCategory.totalCount}
                />

                <br />
              </li>
            ))}
          </ul>
        </Layout>
      </div>
    )
  }
}

export default Categories

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
