export interface SuccessResponse<T> {
  message: string;
  user: T;
  token: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error: string;
}


export interface Response {
  message: string;
}


export interface PaginatedResponse<T> {
  blogs: T[],
  pagination: {
    hasNextPage: boolean
    hasPrevPage: boolean
    page: number
    total: number
    totalPages: number
  }
}