/**
 * This is used to generate a custom URL param
 * @param params
 * @returns {string}
 */
/* rawObj = {bag: 2, shoe: 5}
returns "?bag=2&shoe=5" */
const getURLParams = (params: any) =>
Object.keys(params || {}).reduce((result, field) => {
  if (params[field] || params[field] === 0) {
    result += result
      ? `&${field}=${params[field]}`
      : `?${field}=${params[field]}`;
  }
  return result;
}, "");

export default getURLParams;