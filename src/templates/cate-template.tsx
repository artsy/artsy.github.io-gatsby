import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/layout"

interface CategoriesTemp {
  data: {
    allMarkdownRemark: {
      distinct: string[]
      edges: node[]
    }
  }
}

class CateTemp extends React.Component<CategoriesTemp, {}> {
  render() {
    const { data } = this.props
    const allCate = data.allMarkdownRemark.distinct

    return (
      <div>
        <Layout>
          {allCate.map((singleTitle, index) => {
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

export default CateTemp

// export const pageQuery = graphql`
//     query catePageQuery($cate:String!){
//         allMarkdownRemark(filter:{frontmatter:{categories:{eq:$cate}}}){
//             distinct:(field:frontmatter___title)
//             edges{
//                 node{
//                     frontmatter{
//                         anthor
//                         title
//                         date(formatString:"YYYY")
//                     }
//                 }
//             }
//         }
//     }
// `
export const pageQuery = graphql`
  query catePageQuery($cate: String!) {
    allMarkdownRemark(filter: { frontmatter: { categories: { eq: $cate } } }) {
      distinct(field: frontmatter___title)
    }
  }
`
