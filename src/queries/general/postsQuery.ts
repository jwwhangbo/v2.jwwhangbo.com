import gql from "graphql-tag";

export const postsQuery = gql`
  query postsQuery($categoryName: String, $first: Int) {
    posts(where: { categoryName: $categoryName }, first: $first) {
      edges {
        node {
          id
          title
          content
          excerpt
          contentWithoutFigures
          slug
          date
          projectLink {
            projectLink
          }
          featuredImage {
            node {
              filePath(size: THUMBNAIL)
            }
          }
          tags {
            nodes {
              id
              name
            }
          }
          experienceMeta {
            companyName
            position
          }
          datePeriod {
            startDate
            endDate
          }
        }
      }
    }
  }
`;
