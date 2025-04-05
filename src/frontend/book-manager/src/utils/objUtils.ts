/**
 * Remove Blank Fields
 * @param obj object with blank fields
 * @returns object without blank fields
 */
export function removeBlankFields(obj: any): any {
  const objDeepCopy = deepCopy(obj)

  if (typeof objDeepCopy !== 'object') {
    return objDeepCopy
  }
  for (const key in objDeepCopy) {
    if (Object.prototype.hasOwnProperty.call(objDeepCopy, key)) {
      if (objDeepCopy[key] === '' || objDeepCopy[key] === null || objDeepCopy[key] === undefined) {
        delete objDeepCopy[key]
      } else if (typeof objDeepCopy[key] === 'object') {
        objDeepCopy[key] = removeBlankFields(objDeepCopy[key])
        if (Object.keys(objDeepCopy[key]).length === 0) {
          delete objDeepCopy[key]
        }
      }
    }
  }
  return objDeepCopy
}

/**
 * Return the deep copy of input object
 * @param obj 
 * @returns 
 */
export function deepCopy<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}
