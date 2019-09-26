import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

interface Post {
  node: {
    excerpt: string
    frontmatter: {
      date: string
      title: string
      author: Author[]
    }
    fields: {
      slug: string
    }
  }
}

interface Author {
  Author: string
}

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string
      }
    }
    allMarkdownRemark: {
      edges: Post[]
    }
  }
  pageContext: {
    numPages: any
    currentPage: any
  }
}

class IndexPage extends React.Component<IndexPageProps, {}> {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isLast = currentPage === numPages
    const nextPage = (currentPage + 1).toString()
    const prevPage = 1 ? "" : (currentPage - 1).toString()
    const isFirst = currentPage.toString() == "1"

    return (
      <div>
        <Layout>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              Prev
            </Link>
          )}

          {Array.from({ length: numPages }, (_, i) => (
            <li key={`${i + 1}`} style={{ margin: 15 }}>
              <Link to={`/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
            </li>
          ))}

          {!isLast && (
            <Link to={nextPage} rel="next">
              Next
            </Link>
          )}

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
                        onClick={() => {
                          localStorage.setItem("name", `${_.kebabCase(author)}`)
                        }}
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
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
