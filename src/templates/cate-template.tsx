import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'

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
          {allCate.map((theThing, index) => {
            const singleTitle = theThing
            return (
              <div key={index}>
                <Link to={theThing}>{singleTitle}</Link>
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
