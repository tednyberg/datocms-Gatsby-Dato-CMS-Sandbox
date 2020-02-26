import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsService.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsService.name}</h1>
        <h2>Unique Selling Points</h2>
        <ul>
          {data.datoCmsService.modularContent.map((node) => (
            <li>{node.description}</li>
          ))}
        </ul>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query ServiceQuery($slug: String!) {
    datoCmsService(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      name
      mainBody
      modularContent {
        description
      }
    }
  }
`
