import { GraphQLClient } from "graphql-request";
import { WP_CACHE_TAGS } from "./tags";

export function getWordpressEndpoint() {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error("WORDPRESS_GRAPHQL_URL is not set");
  }
  return endpoint;
}

export function wpRequest(document, variables, tags = [WP_CACHE_TAGS.ALL]) {
  const client = new GraphQLClient(getWordpressEndpoint(), {
    fetch: (url, init) =>
      fetch(url, {
        ...init,
        next: { tags: Array.from(new Set([WP_CACHE_TAGS.ALL, ...tags])) },
      }),
  });

  return client.request(document, variables);
}
