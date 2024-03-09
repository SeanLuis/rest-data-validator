// ContextProvider.ts
/**
 * The ContextProvider class provides a way to manage and access different contexts.
 */
class ContextProvider {
  /**
   * The global context that will be available at all times.
   */
  private static globalContext: Record<string, any> = {};

  /**
   * A map of named contexts.
   */
  private static contexts: Map<string, Record<string, any>> = new Map();

  /**
   * Set a global context that will be available at all times.
   * @param newContext - The new global context.
   */
  static setGlobalContext(newContext: Record<string, any>): void {
    this.globalContext = newContext;
  }

  /**
   * Get the global context.
   * @returns The global context.
   */
  static getGlobalContext(): Record<string, any> {
    return this.globalContext;
  }

  /**
   * Create or update a specific context by name.
   * @param name - The name of the context.
   * @param newContext - The new context.
   */
  static setContext(name: string, newContext: Record<string, any>): void {
    this.contexts.set(name, newContext);
  }

  /**
   * Get a specific context by name, falling back to the global context if not found.
   * @param name - The name of the context.
   * @returns The context.
   */
  static getContext(name?: string): Record<string, any> {
    if (name && this.contexts.has(name)) {
      return this.contexts.get(name)!;
    }
    return this.getGlobalContext();
  }

  /**
   * Delete a specific context by name.
   * @param name - The name of the context to delete.
   */
  static clearContext(name: string): void {
    this.contexts.delete(name);
  }

  /**
   * Clear all custom contexts, but keep the global context intact.
   */
  static clearAllContexts(): void {
    this.contexts.clear();
  }
}

export const setGlobalContext = ContextProvider.setGlobalContext.bind(ContextProvider);
export const getGlobalContext = ContextProvider.getGlobalContext.bind(ContextProvider);
export const setContext = ContextProvider.setContext.bind(ContextProvider);
export const getContext = ContextProvider.getContext.bind(ContextProvider);
export const clearContext = ContextProvider.clearContext.bind(ContextProvider);
export const clearAllContexts = ContextProvider.clearAllContexts.bind(ContextProvider);
