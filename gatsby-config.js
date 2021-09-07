const path = require(`path`)

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
    title: `My Gatsby Site`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-web-font-loader`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        components: path.join(__dirname, `src/components`),
        layouts: path.join(__dirname, `src/layouts`),
        templates: path.join(__dirname, `src/templates`),
        scss: path.join(__dirname, `src/scss`),
        types: path.join(__dirname, `src/types`),
        src: path.join(__dirname, `src`),
        pages: path.join(__dirname, `src/pages`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
