export const isObject = (object?: object | unknown) => {
  return object != null && typeof object === "object";
};
