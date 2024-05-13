/**
 * The ContextValidation class provides a singleton pattern implementation to manage validation contexts.
 * This class ensures that there is only one instance of the validation context throughout the application.
 */
class ContextValidation {
  /**
   * The single instance of ContextValidation.
   */
  private static instance: ContextValidation;

  /**
   * A list of groups used for validation context.
   */
  private groups: string[] = [];

  /**
   * Private constructor to prevent instantiation from outside the class.
   */
  private constructor() {}

  /**
   * Retrieves the singleton instance of the ContextValidation class.
   * If no instance has been created yet, it initializes a new one.
   * @returns The singleton instance of the ContextValidation class.
   */
  public static getInstance(): ContextValidation {
    if (!ContextValidation.instance) {
      ContextValidation.instance = new ContextValidation();
    }
    return ContextValidation.instance;
  }

  /**
   * Sets the groups for the validation context.
   * @param groups - An array of strings representing the groups.
   */
  setGroups(groups: string[]): void {
    this.groups = groups;
  }

  /**
   * Gets the current groups from the validation context.
   * @returns An array of strings representing the current groups.
   */
  getGroups(): string[] {
    return this.groups;
  }

  /**
   * Resets the singleton instance of the ContextValidation class.
   */
  public static resetInstance(): void {
    ContextValidation.instance = new ContextValidation();
  }
}

export { ContextValidation }
