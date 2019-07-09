import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'


interface Categories{
  element : string
}

interface PostNode {
    node: {
      frontmatter: {
        date: string
        title: string
        categories : Categories[]
      }
      fields: {
        slug: string
      }
    }
  }
  
  interface CategoriesPageProps {
    data: {
      site: {
        siteMetadata: {
          siteName: string
        }
      }
      allMarkdownRemark: {
        edges: PostNode[]
      }
    }
  }
  
  class CategoriesPage extends React.Component<CategoriesPageProps, {}> {
    render() {
      const { data } = this.props
      const posts = data.allMarkdownRemark.edges
      const indexLetter = 65
  
      return (
        <div>
        <Layout>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title 
            const categorie = node.frontmatter.categories
            {categorie.map(({element}) => {
            return (
                
              <div key={element}>
                <h2>{String.fromCharCode(indexLetter)}</h2>
                
                <br/>
              </div>
            )
           }) } })}
        </Layout>
        </div>
      )
    }
  }
  
  export default CategoriesPage
  
  export const pageQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___title], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              categories
            }
          }
        }
      }
    }
  `