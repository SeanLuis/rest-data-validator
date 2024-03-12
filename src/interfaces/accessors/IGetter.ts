/**
 * `IGetter` interface for AutoGetter decorator options.
 *
 * @property {boolean} enumerable - Optional. Determines if the property shows up during enumeration of the properties on the corresponding object. 
 *                                  If set to true, the property appears during enumeration. 
 *                                  If set to false or omitted, the property does not appear.
 */
export interface IGetter {
  enumerable?: boolean;
}