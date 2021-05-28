import 'axios';

declare module 'axios' {
  export interface AxiosStatic {
    isAxiosError<T = unknown>(payload: any): payload is AxiosError<T>;
  }
}
