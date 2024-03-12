/**
 * `ISetter` interface for AutoSetter decorator options.
 *
 * @property {boolean} writable - Optional. Determines if the property should be writable. 
 *                                If set to true, the property can be changed. 
 *                                If set to false or omitted, the property is read-only.
 */
export interface ISetter {
  writable?: boolean;
}