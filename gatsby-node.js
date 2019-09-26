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
            name: fieldValue
          }
          authors: group(field: frontmatter___author) {
            name: fieldValue
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

  const postPerPage = 10
  const numPages = Math.ceil(posts.length / postPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/index.tsx"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

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
    const path = `/categories/${_.kebabCase(category.name)}`
    createPage({
      path,
      component: catePage,
      context: {
        category: category.name,
      },
    })
  })

  authors.forEach(author => {
    const path = `/authors/${_.kebabCase(author.name)}`
    createPage({
      path,
      component: authorPage,
      context: {
        author: author.name,
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
