const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsService {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {

      // Create all "work" pages
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        })
      });

      // Create all "service" pages
      result.data.allDatoCmsService.edges.map(({ node: service }) => {
        createPage({
          path: `services/${service.slug}`, // Parent slug would need to be language-variant
          component: path.resolve(`./src/templates/service.js`),
          context: {
            slug: service.slug,
          },
        })
      });

      resolve();
    })
  })
}
