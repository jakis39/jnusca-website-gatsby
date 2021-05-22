import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { FloatingText } from "../components/floating-text";
import { cn } from "../lib/helpers";

import * as styles from "./index.module.css";
import { title1 } from "../components/typography.module.css";
import useWindowDimensions from "../lib/useWindowDimensions";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    jobs: allSanityJob(
      limit: 100
      sort: { fields: [startedAt], order: DESC }
      filter: { title: { ne: null }, companyName: { ne: null } }
    ) {
      edges {
        node {
          id
          title
          companyName
          startedAt
          endedAt
          isCurrent
          _rawBody
          companyLogo {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;
  const [parked, setParked] = React.useState(false);
  const { isSmall } = useWindowDimensions();

  console.log(data);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  function toggleText() {
    setParked(!parked);
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container grow>
        <div className={styles.root}>
          <span className={cn(title1, styles.name)}>
            <FloatingText parked={parked} stackWords={isSmall}>
              Jake Nusca
            </FloatingText>
          </span>
          {/* <div className={styles.hint}>⬑ move your mouse here ⬏</div> */}
          {/* <button onClick={toggleText}>{parked ? "start" : "park"}</button> */}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
