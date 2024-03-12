/**
 * `IAccessors` interface for AutoAccessors decorator options.
 *
 * @property {boolean} includePrivate - Optional. Determines if the private properties should be included in the accessor. 
 *                                      If set to true, private properties are included. 
 *                                      If set to false or omitted, private properties are not included.
 * @property {boolean} enumerable - Optional. Determines if the property shows up during enumeration of the properties on the corresponding object. 
 *                                  If set to true, the property appears during enumeration. 
 *                                  If set to false or omitted, the property does not appear.
 * @property {boolean} writable - Optional. Determines if the property should be writable. 
 *                                If set to true, the property can be changed. 
 *                                If set to false or omitted, the property is read-only.
 */
export interface IAccessors {
  includePrivate?: boolean;
  enumerable?: boolean;
  writable?: boolean;
}