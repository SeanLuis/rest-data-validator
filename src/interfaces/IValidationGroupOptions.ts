/**
 * The IValidationGroupOptions interface represents options for specifying groups for validation.
 *
 * @interface
 * @property {string[]} groups - Optional: An array of groups for which the validation should be applied. If not provided, validation is applied to all groups.
 */
export interface IValidationGroupOptions {
  groups?: string[];
}