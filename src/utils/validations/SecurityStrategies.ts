/**
 * Object containing security strategies for validating input values.
 */
export const securityStrategies = {
  /**
   * Checks if the input string contains potential XSS vectors.
   * It checks against a series of regular expressions representing common XSS injection patterns.
   * Returns true if no potential XSS is found, false otherwise.
   */
  xss: (value: string): boolean => {
    const patterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Improved regex for <script> tags
        /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, // Improved regex for <iframe> tags
        /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, // Improved regex for <object> tags
        /javascript:\s*/i, // Checks for "javascript:" URI
        /onerror\s*=\s*["'][^"']*["']/gi, // Checks for onerror attribute
        /<img\b[^<]*onerror=.*?>/gi, // Improved regex for <img> with onerror
        /<link\b[^<]*>/gi, // Checks for <link> tags
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, // Improved regex for <style> tags
        /<svg\b[^<]*>/gi, // Checks for <svg> tags
        /<audio\b[^<]*>/gi, // Checks for <audio> tags
        /<video\b[^<]*>/gi, // Checks for <video> tags
        /<body\b[^<]*>/gi, // Checks for <body> tags
        /<embed\b[^<]*>/gi, // Checks for <embed> tags
        /<frame\b[^<]*>/gi, // Checks for <frame> tags
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
