import Cookies from "js-cookie";
import { STRAPI_JWT } from "tina-strapi-client";
import axios from "axios";

export async function fetchGraphql(url: string, query: string, variables = {}) {
  const jwt = Cookies.get(STRAPI_JWT);
  const headers: any = {
    "Content-Type": "application/json",
  };

  if (jwt) headers["Authorization"] = `Bearer ${jwt}`;

  const response = await axios.post(
    `${url}/graphql`,
    { query: query, variables: variables },
    { headers: { ...headers } }
  );

  return response.data;
}
