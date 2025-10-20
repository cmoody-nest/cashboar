export function isRedirect(error: unknown) {
  if (!error) {
    return false;
  }

  if (typeof error !== "object") {
    return false;
  }

  return "__NEXT_ERROR_CODE" in error;
}
