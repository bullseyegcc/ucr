const PRODUCT_FIELDS = `
  databaseId
  slug
  title
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  productDetails {
    sku
    featured
    shortDescription
    longDescription
    specifications
    applications
    technicalParameters
    packagingDimensions
    sizes
    productSpecification
    icon {
      node {
        sourceUrl
        altText
      }
    }
  }
`;

export const GET_PRODUCTS = `
  query GetProducts($first: Int = 100) {
    products(first: $first) {
      nodes {
        ${PRODUCT_FIELDS}
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ${PRODUCT_FIELDS}
    }
  }
`;

export const GET_PRODUCT_SLUGS = `
  query GetProductSlugs($first: Int = 100) {
    products(first: $first) {
      nodes {
        slug
      }
    }
  }
`;
