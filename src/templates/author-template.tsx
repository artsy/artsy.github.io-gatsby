import { graphql, Link } from "gatsby"
import * as _ from "lodash"
import * as React from "react"
import Layout from "../components/Layout"

interface AuthorTemplateProp {
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

const AuthorPageTemplate: React.FC<AuthorTemplateProp> = ({ data }) => {
  const allNodes = data.allMarkdownRemark.nodes
  const [name, setName] = React.useState(undefined)

  return (
    <>
      <Layout>
        <h1>
          {React.useEffect(() => {
            setName(localStorage.getItem("name"))
          }, [])}
          {name}:
        </h1>
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
    </>
  )
}

export default AuthorPageTemplate

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
