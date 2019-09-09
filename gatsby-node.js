const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // return new Promise((resolve, reject) => {
  //   const blogPost = path.resolve("./src/templates/blog-post.tsx")
  //   const catePage = path.resolve("./src/templates/category-template.tsx")
  //   const authorPage = path.resolve("./src/templates/author-template.tsx")

  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allMarkdownRemark(
  //             sort: { fields: [frontmatter___date], order: DESC }
  //             limit: 1000
  //           ) {
  //             group(field: frontmatter___categories) {
  //               fieldValue
  //             }
  //             edges {
  //               node {
  //                 fields {
  //                   slug
  //                 }
  //                 frontmatter {
  //                   title
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors)
  //         reject(result.errors)
  //       }

  //       const categories = result.data.allMarkdownRemark.group
  //       const posts = result.data.allMarkdownRemark.edges

  //       categories.forEach(category => {
  //         const path = `/Categories/${category.fieldValue}`
  //         createPage({
  //           path,
  //           component: catePage,
  //           context: {
  //             category: category.fieldValue,
  //           },
  //         })
  //       })

  //       posts.forEach((post, index) => {
  //         const previous =
  //           index === posts.length - 1 ? null : posts[index + 1].node
  //         const next = index === 0 ? null : posts[index - 1].node
  //         const blogPath = `/blogs/${_.kebabCase(post.node.frontmatter.title)}`
  //         createPage({
  //           path: blogPath,
  //           component: blogPost,
  //           context: {
  //             slug: post.node.fields.slug,
  //             previous,
  //             next,
  //           },
  //         })
  //       })
  //     })
  //   )
  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allMarkdownRemark(limit: 1000) {
  //             group(field: frontmatter___author) {
  //               fieldValue
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors)
  //         reject(result.errors)
  //       }

  //       const authors = result.data.allMarkdownRemark.group

  //       authors.forEach(author => {
  //         const path = `/authors/${author.fieldValue}`
  //         createPage({
  //           path,
  //           component: authorPage,
  //           context: {
  //             author: author.fieldValue,
  //           },
  //         })
  //       })
  //     })
  //   )
  // })
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
