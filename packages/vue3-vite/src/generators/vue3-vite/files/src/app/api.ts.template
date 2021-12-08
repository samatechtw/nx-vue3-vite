import { FetchApi } from '@sampullman/fetch-api';
import { API_URL } from '@app/utils/config';

class ApiResponse extends Response {
  data!: Record<string, unknown>;
}

export interface ApiOptions {
  baseUrl: string;
}

const defaultResponseInterceptors = [
  async (res: Response): Promise<ApiResponse> => {
    if (!res) {
      throw new Error('NETWORK_FAILURE');
    }
    const { status } = res;

    if (status >= 500) {
      throw new Error('NETWORK_FAILURE');
    } else if (status === 401) {
      // Permission denied
      throw res;
    }
    let data: Record<string, unknown>;
    try {
      data = await res.json();
    } catch (_e) {
      // Avoid crashing on empty response
      data = {};
    }

    if (status === 400 || status === 404) {
      throw data;
    }
    const apiRes = res as ApiResponse;
    apiRes.data = data;
    return apiRes;
  },
];

class AppApi extends FetchApi<ApiResponse> {
  constructor(options: ApiOptions) {
    super({
      responseInterceptors: defaultResponseInterceptors,
      ...options,
    });
  }
}

export const api = new AppApi({
  baseUrl: API_URL,
});
