import { Media, MediaStore, MediaUploadOptions } from "@tinacms/media";
import { STRAPI_JWT, TinaStrapiClient } from "./tina-strapi-client";

import Cookies from "js-cookie";
import axios from "axios";
import { useCMS } from "tinacms";

export class StrapiMediaStore implements MediaStore {
  accept = "*";

  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    const uploaded: Media[] = [];

    for (const { file } of files) {
      const upload = await uploadFile(file);
      uploaded.push({
        directory: "/uploads",
        filename: upload.data[0].hash + upload.data[0].ext,
      });
    }

    return uploaded;
  }
}

export async function uploadFile(file: File) {
  const cms = useCMS();
  const strapi: TinaStrapiClient = cms.api.strapi;
  const authToken = Cookies.get(STRAPI_JWT);
  const formData = new FormData();
  formData.append("files", file);
  const uploadResponse = await axios.post(
    strapi.strapiUrl + "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return uploadResponse;
}
