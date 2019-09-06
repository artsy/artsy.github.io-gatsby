import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

interface PostNode {
  node: {
    excerpt: string
    frontmatter: {
      date: string
      title: string
      author: singleAuthor[]
    }
    fields: {
      slug: string
    }
  }
}

interface singleAuthor {
  author: string
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
            const authors = node.frontmatter.author

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

                {authors.map((author, index) => {
                  return (
                    <div key={index}>
                      <br />
                      <Link
                        to={`/authors/${_.kebabCase(author)}`}
                        state={{ name: author }}
                      >
                        <small>{author}</small>
                      </Link>
                    </div>
                  )
                })}

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
