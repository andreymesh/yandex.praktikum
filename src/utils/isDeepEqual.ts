/* eslint-disable no-prototype-builtins */
export type Indexed<T = unknown> = {
  [key in string]: T;
};

export const isObject = (object: object | unknown) => {
  return object != null && typeof object === "object";
};

export const isDeepEqual = <T extends object>(object1: { [index: string]: T }, object2: { [index: string]: T }) => {
  if (object1 === object2) {
    return true;
  }
  else if ((typeof object1 == "object" && object1 != null) && (typeof object2 == "object" && object2 != null)) {
    if (Object.keys(object1).length != Object.keys(object2).length)
      return false;

    for (const prop in object1) {
      if (object2.hasOwnProperty(prop))
      {  
        if (!isDeepEqual(object1[prop] as { [index: string]: T }, object2[prop] as { [index: string]: T }))
          return false;
      }
      else
        return false;
    }
    
    return true;
  }
  else 
    return false;
}
