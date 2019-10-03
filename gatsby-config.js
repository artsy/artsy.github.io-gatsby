module.exports = {
  siteMetadata: {
    title: "Artsy Engineering blog",
    description: "Engineering blog!",
    author: "@Artsy",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disableFeatures: [`shorthands`, `cloning`],
      },
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [{ name: "en" }],
        filterNodes: node =>
          !node.frontmatter || node.frontmatter.draft !== true,
        fields: [
          { name: "date", store: true },
          { name: "title", store: true },
          { name: "author", store: true },
          { name: "categories", store: true },
          { name: "series" },
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            author: node => node.frontmatter.author,
            categories: node => node.frontmatter.categories,
            series: node => node.frontmatter.series,
            date: node => node.frontmatter.date,
          },
        },
        filename: "search_index.json",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-video`,
            options: {
              width: 800,
              height: 400,
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/blog/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/artsy_logo copy.png",
      },
    },
    "gatsby-plugin-offline",
  ],
}
