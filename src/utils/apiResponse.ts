export function success<T>(data: T, message = "success") {
  return { data, message };
}

export function error(message = "Internal Server Error", data: any = null) {
  return { data, message };
}
