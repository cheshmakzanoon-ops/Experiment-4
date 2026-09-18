import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Request interceptor for handling authentication and request headers
 */
export function setupRequestInterceptor(
  axiosInstance: AxiosInstance,
  getToken: () => Promise<string | null>
): void {
  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      // Get auth token if available
      const token = await getToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add content-type header if not present
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }

      // Add request timestamp for debugging
      config.metadata = { startTime: Date.now() };

      return config;
    },
    (error: AxiosError) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );
}

/**
 * Response interceptor for handling errors and token refresh
 */
export function setupResponseInterceptor(
  axiosInstance: AxiosInstance,
  onTokenExpired?: () => void
): void {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Add response timing for performance monitoring
      if (response.config.metadata?.startTime) {
        const duration = Date.now() - response.config.metadata.startTime;
        console.log(`API Request to ${response.config.url} took ${duration}ms`);
      }

      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized errors
      if (error.response?.status === 401) {
        if (originalRequest._retry) {
          // Already tried to refresh token, redirect to login
          if (onTokenExpired) {
            onTokenExpired();
          }
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          // This would call your token refresh endpoint
          // const newToken = await refreshToken();
          // originalRequest.headers.Authorization = `Bearer ${newToken}`;
          // return axiosInstance(originalRequest);

          // For now, just notify and reject
          if (onTokenExpired) {
            onTokenExpired();
          }
          return Promise.reject(error);
        } catch (refreshError) {
          if (onTokenExpired) {
            onTokenExpired();
          }
          return Promise.reject(refreshError);
        }
      }

      // Handle 403 Forbidden errors
      if (error.response?.status === 403) {
        console.warn('Access forbidden:', error.response.data);
      }

      // Handle 404 Not Found errors
      if (error.response?.status === 404) {
        console.warn('Resource not found:', error.response.data);
      }

      // Handle 500 Server errors
      if (error.response?.status === 500) {
        console.error('Server error:', error.response.data);
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error - check connection');
      }

      return Promise.reject(error);
    }
  );
}

/**
 * Rate limiting interceptor to prevent API abuse
 */
export function setupRateLimitInterceptor(
  axiosInstance: AxiosInstance,
  maxRequestsPerSecond: number = 10
): void {
  const requestQueue: number[] = [];

  axiosInstance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const now = Date.now();

      // Remove timestamps older than 1 second
      while (requestQueue.length > 0 && requestQueue[0] < now - 1000) {
        requestQueue.shift();
      }

      // Check if we've exceeded the rate limit
      if (requestQueue.length >= maxRequestsPerSecond) {
        const delay = 1000 - (now - requestQueue[0]);
        if (delay > 0) {
          console.warn(`Rate limit reached, delaying request by ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      // Add current timestamp to queue
      requestQueue.push(Date.now());

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}

/**
 * Retry interceptor for failed requests
 */
export function setupRetryInterceptor(
  axiosInstance: AxiosInstance,
  maxRetries: number = 3,
  retryDelay: number = 1000
): void {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const config = error.config as AxiosRequestConfig & {
        _retryCount?: number;
      };

      // Don't retry if we've exceeded max retries or it's a client error
      if (!config || !error.response || error.response.status < 500) {
        return Promise.reject(error);
      }

      config._retryCount = (config._retryCount || 0) + 1;

      if (config._retryCount <= maxRetries) {
        console.log(
          `Retrying request (${config._retryCount}/${maxRetries}) to ${config.url}`
        );

        // Exponential backoff
        const delay = retryDelay * Math.pow(2, config._retryCount - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return axiosInstance(config);
      }

      return Promise.reject(error);
    }
  );
}

/**
 * Logging interceptor for debugging
 */
export function setupLoggingInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      console.log('[API Request]', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
        headers: config.headers,
      });
      return config;
    },
    (error: AxiosError) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('[API Response]', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error: AxiosError) => {
      console.error('[API Response Error]', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
}
