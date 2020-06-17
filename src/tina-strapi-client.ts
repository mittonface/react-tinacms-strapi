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
}
