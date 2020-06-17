import { Media, MediaStore, MediaUploadOptions } from "@tinacms/media";

import Cookies from "js-cookie";
import { STRAPI_JWT } from "./tina-strapi-client";
import axios from "axios";

interface StrapiMediaStoreOptions {
  strapiUrl: string;
}
export class StrapiMediaStore implements MediaStore {
  strapiUrl: string;
  accept = "*";

  constructor({ strapiUrl }: StrapiMediaStoreOptions) {
    this.strapiUrl = strapiUrl;
  }

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = [];

    for (const { file } of files) {
      const upload = await uploadFile(file, this.strapiUrl);
      uploaded.push({
        directory: "/uploads",
        filename: upload.data[0].hash + upload.data[0].ext,
      });
    }

    return uploaded;
  }
}

export async function uploadFile(file: File, strapiUrl: string) {
  const authToken = Cookies.get(STRAPI_JWT);
  const formData = new FormData();
  formData.append("files", file);
  const uploadResponse = await axios.post(strapiUrl + "/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return uploadResponse;
}
