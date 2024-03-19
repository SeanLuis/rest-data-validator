import { validateSecurity } from "../../src";
import { ISecurityValidationOptions } from "../../src/interfaces/ISecurityValidationOptions";

describe("validateSecurity Function", () => {
  // Test for XSS
  it("should validate successfully against safe input for XSS", () => {
    const options: ISecurityValidationOptions = {
      type: "xss",
      message: "XSS attack detected.",
    };

    const safeInput = "Hello, world!";
    const validationResult = validateSecurity(safeInput, options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it("should fail validation against malicious input for XSS", () => {
    const options: ISecurityValidationOptions = {
      type: "xss",
      message: "XSS attack detected.",
    };

    const maliciousInput = "<script>alert('XSS')</script>";
    const validationResult = validateSecurity(maliciousInput, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("XSS attack detected.");
  });

  // Test for SQL Injection
  it("should validate successfully against safe input for SQL Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "sqlInjection",
      message: "SQL Injection attack detected.",
    };

    const safeInput = "SELECT * FROM users;";
    const validationResult = validateSecurity(safeInput, options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it("should fail validation against malicious input for SQL Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "sqlInjection",
      message: "SQL Injection attack detected.",
    };

    const maliciousInput = "SELECT * FROM users; DROP TABLE users;";
    const validationResult = validateSecurity(maliciousInput, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain("SQL Injection attack detected.");
  });

  // Test for Command Injection
  it("should validate successfully against safe input for Command Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "commandInjection",
      message: "Command Injection attack detected.",
    };

    const safeInput = "ls -la";
    const validationResult = validateSecurity(safeInput, options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it("should fail validation against malicious input for Command Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "commandInjection",
      message: "Command Injection attack detected.",
    };

    const maliciousInput = "ls -la; rm -rf /";
    const validationResult = validateSecurity(maliciousInput, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain(
      "Command Injection attack detected."
    );
  });

  // Test for Path Traversal
  it("should validate successfully against safe input for Path Traversal", () => {
    const options: ISecurityValidationOptions = {
      type: "pathTraversal",
      message: "Path Traversal attack detected.",
    };

    const safeInput = "/images/logo.png";
    const validationResult = validateSecurity(safeInput, options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it("should fail validation against malicious input for Path Traversal", () => {
    const options: ISecurityValidationOptions = {
      type: "pathTraversal",
      message: "Path Traversal attack detected.",
    };

    const maliciousInput = "/etc/passwd";
    const validationResult = validateSecurity(maliciousInput, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain(
      "Path Traversal attack detected."
    );
  });

  // Test for LDAP Injection
  it("should validate successfully against safe input for LDAP Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "ldapInjection",
      message: "LDAP Injection attack detected.",
    };

    const safeInput = "(cn=John Doe)";
    const validationResult = validateSecurity(safeInput, options);
    expect(validationResult.isValid).toBeTruthy();
  });

  it("should fail validation against malicious input for LDAP Injection", () => {
    const options: ISecurityValidationOptions = {
      type: "ldapInjection",
      message: "LDAP Injection attack detected.",
    };

    const maliciousInput = "(cn=*)(|(uid=*))";
    const validationResult = validateSecurity(maliciousInput, options);
    expect(validationResult.isValid).toBeFalsy();
    expect(validationResult.errors).toContain(
      "LDAP Injection attack detected."
    );
  });
});
