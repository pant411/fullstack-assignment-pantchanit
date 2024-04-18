// post-response.interface.ts
export interface ResponseModel<T = any> {
  data?: T;
  message: string;
  statusCode: number;
}
