export interface RequestInterface<T> {
  response?: T,
  status: 'sucess' | 'error',
}
