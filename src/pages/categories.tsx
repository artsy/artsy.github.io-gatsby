import { graphql, Link } from "gatsby"
import * as React from "react"
import CateSort from "../components/cateSort"
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

class CategoriesPage extends React.Component<CategoriesPageProps, {}> {
  render() {
    const { data } = this.props
    const amd = data.allMarkdownRemark

    return (
      <div>
        <Layout>
          <h3>Categorie we have :</h3>

          <ul>
            {amd.group.map((cateSingle, index) => (
              <li key={index}>
                <CateSort
                  currentIndex={cateSingle.fieldValue}
                  preIndex={
                    index < 1
                      ? amd.group[index].fieldValue
                      : amd.group[index - 1].fieldValue
                  }
                  numOfBlog={cateSingle.totalCount}
                  index={index}
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

export default CategoriesPage

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
