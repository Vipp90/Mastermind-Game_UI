export type ApiResponse<TBody> = {
  isSuccess: boolean;
  error: string;
  body: TBody;
};
