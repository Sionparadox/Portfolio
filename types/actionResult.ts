export type ActionResult<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};
