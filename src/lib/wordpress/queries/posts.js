const POST_CORE_FIELDS = `
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
`;

const POST_AUTHOR_FIELDS = `
  postDetails {
    authorName
    authorImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 100) {
    posts(first: $first) {
      nodes {
        ${POST_CORE_FIELDS}
        ${POST_AUTHOR_FIELDS}
      }
    }
  }
`;

export const GET_POSTS_BASIC = `
  query GetPostsBasic($first: Int = 100) {
    posts(first: $first) {
      nodes {
        ${POST_CORE_FIELDS}
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_CORE_FIELDS}
      ${POST_AUTHOR_FIELDS}
    }
  }
`;

export const GET_POST_BY_SLUG_BASIC = `
  query GetPostBySlugBasic($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_CORE_FIELDS}
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
