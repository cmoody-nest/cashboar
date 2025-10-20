import z from "zod";
import { env } from "@/lib/env";

const PresignKeySchema = z.object({
  iv: z.string(),
});

type PresignKey = z.infer<typeof PresignKeySchema>;

type ApiRequestOptions<T> = {
  schema: z.ZodSchema<T>;
  apiKey?: string;
  presignUrl?: boolean;
  params?: Record<string, unknown | unknown[]>;
  headers?: Record<string, string>;
  body?: unknown;
};

export class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async GET<T>(
    path: string,
    {
      schema,
      params,
      headers,
      apiKey,
      presignUrl,
    }: Omit<ApiRequestOptions<T>, "body">,
  ) {
    const url = this.buildUrl(path, params);
    let token = apiKey;

    if (presignUrl) {
      token = await this.getPresignKey<T>(path, "GET", { params });
    }

    return this.doRequest<T>(
      url.toString(),
      {
        method: "GET",
        headers: this.buildHeaders(headers, token),
      },
      schema,
    );
  }

  async POST<T>(
    path: string,
    { schema, params, body, headers, apiKey, presignUrl }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);
    let token = apiKey;

    if (presignUrl) {
      token = await this.getPresignKey<T>(path, "POST", { body, params });
    }

    return this.doRequest<T>(
      url.toString(),
      {
        method: "POST",
        headers: this.buildHeaders(headers, token),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async PUT<T>(
    path: string,
    { schema, params, body, headers, apiKey, presignUrl }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);
    let token = apiKey;

    if (presignUrl) {
      token = await this.getPresignKey<T>(path, "PUT", { body, params });
    }

    return this.doRequest<T>(
      url.toString(),
      {
        method: "PUT",
        headers: this.buildHeaders(headers, token),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async PATCH<T>(
    path: string,
    { schema, params, body, headers, apiKey, presignUrl }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);
    let token = apiKey;

    if (presignUrl) {
      token = await this.getPresignKey<T>(path, "PATCH", { body, params });
    }

    return this.doRequest<T>(
      url.toString(),
      {
        method: "PATCH",
        headers: this.buildHeaders(headers, token),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async DELETE<T>(
    path: string,
    {
      schema,
      params,
      headers,
      apiKey,
      presignUrl,
    }: Omit<ApiRequestOptions<T>, "body">,
  ) {
    const url = this.buildUrl(path, params);
    let token = apiKey;

    if (presignUrl) {
      token = await this.getPresignKey<T>(path, "DELETE", { params, body: {} });
    }

    return this.doRequest<T>(
      url.toString(),
      {
        method: "DELETE",
        headers: this.buildHeaders(headers, token),
      },
      schema,
    );
  }

  private async doRequest<T>(
    path: string,
    request: RequestInit,
    schema: z.ZodSchema<T>,
  ) {
    const response = await fetch(path, request);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return schema.parse(data);
  }

  private buildUrl(
    path: string,
    params?: ApiRequestOptions<unknown>["params"],
  ) {
    const url = new URL(path, this.baseUrl);
    url.search = this.buildQueryString(params).toString();
    return url;
  }

  private buildHeaders(
    initialHeaders: Record<string, string> = {},
    apiKey?: string,
  ) {
    const headers: RequestInit["headers"] = {
      "Content-Type": "application/json",
      ...initialHeaders,
    };

    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`;
    }

    return headers;
  }

  private buildQueryString(params?: Record<string, unknown | unknown[]>) {
    const query = new URLSearchParams();

    if (!params) return query;

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (!Array.isArray(value)) {
        query.set(key, String(value));
        continue;
      }

      for (const v of value) {
        query.append(key, String(v));
      }
    }

    return query;
  }

  private buildBody(body: unknown) {
    if (body instanceof FormData) {
      return body;
    }

    return JSON.stringify(body);
  }

  private async getPresignKey<T>(
    path: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    { body = {}, params = {} }: Pick<ApiRequestOptions<T>, "body" | "params">,
  ): Promise<string> {
    const url = this.buildUrl(path, params)
      .toString()
      .replace(this.baseUrl, "");

    const presign = await this.POST<PresignKey>("/auth/presign-url", {
      body: {
        url,
        body,
        method,
      },
      schema: PresignKeySchema,
      presignUrl: false, // Avoid double presign
    });

    return presign.iv;
  }
}

export const apiService = new ApiService(env.NEXT_PUBLIC_CORESAVE_API_URL);
