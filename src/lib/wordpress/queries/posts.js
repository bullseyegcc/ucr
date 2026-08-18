export const GET_POSTS = `
  query GetPosts($first: Int = 100) {
    posts(first: $first) {
      nodes {
        databaseId
        slug
        title
        date
        excerpt
        content
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      date
      excerpt
      content
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_POST_SLUGS = `
  query GetPostSlugs($first: Int = 100) {
    posts(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
