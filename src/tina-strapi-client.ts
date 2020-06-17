import Cookies from "js-cookie";
import axios from "axios";

export const STRAPI_JWT = "tina_strapi_jwt";

interface TinaStrapiClientOptions {
  strapiUrl: string;
}
export class TinaStrapiClient {
  strapiUrl: string;

  constructor({ strapiUrl }: TinaStrapiClientOptions) {
    this.strapiUrl = strapiUrl;
  }

  async authenticate(username: string, password: string) {
    return axios.post(`${this.strapiUrl}/auth/local`, {
      identifier: username,
      password: password,
    });
  }

  async fetchGraphql(query: string, variables = {}) {
    const jwt = Cookies.get(STRAPI_JWT);
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (jwt) headers["Authorization"] = `Bearer ${jwt}`;

    const response = await axios.post(
      `${this.strapiUrl}/graphql`,
      { query: query, variables: variables },
      { headers: { ...headers } }
    );

    return response.data;
  }
}
