import gql from "graphql-tag";

export const PostQuery = gql`
  query PostQuery($id: ID!, $idType: PostIdType, $preview: Boolean = false) {
    post(id: $id, idType: $idType, asPreview: $preview) {
      content
      date
      title
      author {
        node {
          name
        }
      }
    }
  }
`;
