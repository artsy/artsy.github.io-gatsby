import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface PostNode {
  node: {
    excerpt: string
    frontmatter: {
      date: string
      title: string
      author: string
    }
    fields: {
      slug: string
    }
  }
}

interface IndexPageProps {
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

class IndexPage extends React.Component<IndexPageProps, {}> {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges

    return (
      <div>
        <Layout>
          <SEO
            title="All posts"
            keywords={["artsy", "blog", "gatsby", "javascript", "react"]}
          />

          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const temp = node.frontmatter.author
            const author = temp

            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: "0.25rem",
                  }}
                >
                  <Link to={`/blogs/${_.kebabCase(title)}`}>{title}</Link>
                </h3>
                <small>{node.frontmatter.date}</small>
                <br />
                <small>{author}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </div>
            )
          })}
        </Layout>
      </div>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
          }
        }
      }
    }
  }
`
