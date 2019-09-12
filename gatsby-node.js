const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          categories: group(field: frontmatter___categories) {
            fieldValue
          }
          authors: group(field: frontmatter___author) {
            fieldValue
          }
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running Graphql query.`)
  }

  const blogPost = path.resolve("./src/templates/blog-post.tsx")
  const catePage = path.resolve("./src/templates/category-template.tsx")
  const authorPage = path.resolve("./src/templates/author-template.tsx")

  const categories = result.data.allMarkdownRemark.categories
  const posts = result.data.allMarkdownRemark.edges
  const authors = result.data.allMarkdownRemark.authors

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const blogPath = `/blogs/${_.kebabCase(post.node.frontmatter.title)}`
    createPage({
      path: blogPath,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  categories.forEach(category => {
    const path = `/Categories/${category.fieldValue}`
    createPage({
      path,
      component: catePage,
      context: {
        category: category.fieldValue,
      },
    })
  })

  authors.forEach(author => {
    const path = `/authors/${author.fieldValue}`
    createPage({
      path,
      component: authorPage,
      context: {
        author: author.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
