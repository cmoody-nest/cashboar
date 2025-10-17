import type z from "zod";

type ApiRequestOptions<T> = {
  schema: z.ZodSchema<T>;
  apiKey?: string;
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
    { schema, params, headers, apiKey }: Omit<ApiRequestOptions<T>, "body">,
  ) {
    const url = this.buildUrl(path, params);

    return this.doRequest<T>(
      url.toString(),
      {
        method: "GET",
        headers: this.buildHeaders(headers, apiKey),
      },
      schema,
    );
  }

  async POST<T>(
    path: string,
    { schema, params, body, headers, apiKey }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);

    return this.doRequest<T>(
      url.toString(),
      {
        method: "POST",
        headers: this.buildHeaders(headers, apiKey),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async PUT<T>(
    path: string,
    { schema, params, body, headers, apiKey }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);

    return this.doRequest<T>(
      url.toString(),
      {
        method: "PUT",
        headers: this.buildHeaders(headers, apiKey),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async PATCH<T>(
    path: string,
    { schema, params, body, headers, apiKey }: ApiRequestOptions<T>,
  ) {
    const url = this.buildUrl(path, params);

    return this.doRequest<T>(
      url.toString(),
      {
        method: "PATCH",
        headers: this.buildHeaders(headers, apiKey),
        body: this.buildBody(body),
      },
      schema,
    );
  }

  async DELETE<T>(
    path: string,
    { schema, params, headers, apiKey }: Omit<ApiRequestOptions<T>, "body">,
  ) {
    const url = this.buildUrl(path, params);

    return this.doRequest<T>(
      url.toString(),
      {
        method: "DELETE",
        headers: this.buildHeaders(headers, apiKey),
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
}
