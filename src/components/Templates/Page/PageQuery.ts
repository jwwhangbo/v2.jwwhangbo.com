import gql from "graphql-tag";

export const PageQuery = gql`
  query PageQuery($id: ID!, $idType: PageIdType = DATABASE_ID, $preview: Boolean = false) {
    page(id: $id, idType: $idType, asPreview: $preview) {
      content
    }
  }
`;
