/**
 * Object containing security strategies for validating input values.
 */
export const securityStrategies = {
  // XSS (Cross-Site Scripting)
  xss: (value: string): boolean => {
    const patterns = [
      /<script.*?>.*?<\/script>/is, // Basic XSS
      /<iframe.*?>.*?<\/iframe>/is, // Iframe injection
      /<object.*?>.*?<\/object>/is, // Object injection
      /javascript:/is, // Direct JavaScript execution
      /onerror\s*=\s*["'].*?["']/is, // Onerror attribute
      /<img.*?onerror=.*?>/is, // Image error handling
      /<link.*?>/is, // Link injection
      /<style.*?>.*?<\/style>/is, // Style tags
      /<svg.*?>/is, // SVG injection
      /<audio.*?>/is, // Audio tag injection
      /<video.*?>/is, // Video tag injection
      /<body.*?>/is, // Body injection
      /<embed.*?>/is, // Embed tag injection
      /<frame.*?>/is, // Frame injection
    ];
    return !patterns.some((pattern) => pattern.test(value));
  },

  // SQL Injection
  sqlInjection: (value: string): boolean => {
    const patterns = [
      /--/, // Inline comments
      /xp_cmdshell/i, // Command shell execution
      /exec(\s|\()+/i, // SQL execution command
      /UNION(\s)+SELECT/i, // UNION SELECT attack
      /;.*;/, // Multiple queries
    ];
    return !patterns.some((pattern) => pattern.test(value));
  },

  // Command Injection
  commandInjection: (value: string): boolean => {
    const patterns = [
      /&|\|/i, // Command concatenation
      /;|\$\(|`|\|\|/i, // Command termination & execution
      /<|>|>>/i, // Redirection operators
      /\b(cmd|bash|sh|zsh)\b/i, // Common shell names
    ];
    return !patterns.some((pattern) => pattern.test(value));
  },

  // Path Traversal
  pathTraversal: (value: string): boolean => {
    const patterns = [
      /\.\.\//i, // Relative path escape
      /%2e%2e%2f/i, // Encoded relative path escape
      /\betc\b|\bpasswd\b/i, // Sensitive Unix files
      /\bwindows\b|\bsystem32\b/i, // Sensitive Windows directories
    ];
    return !patterns.some((pattern) => pattern.test(value));
  },

  // LDAP Injection
  ldapInjection: (value: string): boolean => {
    const patterns = [
      /\*/i, // Wildcard character
      /\(\|\(|&/i, // Logical OR & AND
      /!\(|\)=/i, // Not equal & equal
    ];
    return !patterns.some((pattern) => pattern.test(value));
  },
};

/**
 * Adds or updates a security strategy function in the securityStrategies object.
 * @param name - The name of the security strategy.
 * @param strategyFunction - The function representing the security strategy.
 */
export const addSecurityStrategy = (
  name: string,
  strategyFunction: Function
) => {
  if ((securityStrategies as { [key: string]: Function })[name]) {
    console.warn(`Strategy ${name} is being overridden.`);
  }

  (securityStrategies as { [key: string]: Function })[name] = strategyFunction;
};
