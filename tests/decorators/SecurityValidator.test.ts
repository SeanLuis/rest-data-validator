import { ClassValidator, Security } from "../../src/decorators";

@ClassValidator
class TestClass {
  @Security({
    type: "xss",
    message: "XSS attack detected.",
  })
  public xssTest: string;

  @Security({
    type: "sqlInjection",
    message: "SQL Injection attack detected.",
  })
  public sqlInjectionTest: string;

  @Security({
    type: "commandInjection",
    message: "Command Injection attack detected.",
  })
  public commandInjectionTest: string;

  @Security({
    type: "pathTraversal",
    message: "Path Traversal attack detected.",
  })
  public pathTraversalTest: string;

  @Security({
    type: "ldapInjection",
    message: "LDAP Injection attack detected.",
  })
  public ldapInjectionTest: string;

  constructor(xssTest: string, sqlInjectionTest: string, commandInjectionTest: string, pathTraversalTest: string, ldapInjectionTest: string) {
    this.xssTest = xssTest;
    this.sqlInjectionTest = sqlInjectionTest;
    this.commandInjectionTest = commandInjectionTest;
    this.pathTraversalTest = pathTraversalTest;
    this.ldapInjectionTest = ldapInjectionTest;
  }
}


@ClassValidator
class InvalidTestClass {

  @Security({
    type: "notSupported",
    message: "Strategy not supported.",
  })
  public notSupported: string;

  constructor(notSupported: string) {
    this.notSupported = notSupported;
  }
}

describe("TestClass with Security Decorator", () => {
    it("should validate successfully against safe input for XSS", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).not.toThrow();
    });
  
    it("should fail validation against malicious input for XSS", () => {
      expect(() => new TestClass("<script>alert('XSS')</script>", "SELECT * FROM users; DROP TABLE users;", "ls & rm -rf /", "../../etc/passwd", "(|(cn=admin))")).toThrow("Validation failed:");
    });
  
    it("should validate successfully against safe input for SQL Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).not.toThrow();
    });
  
    it("should fail validation against malicious input for SQL Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users; DROP TABLE users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).toThrow("Validation failed:");
    });
  
    it("should validate successfully against safe input for Command Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).not.toThrow();
    });
  
    it("should fail validation against malicious input for Command Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls & rm -rf /", "/home/user", "cn=admin,dc=example,dc=com")).toThrow("Validation failed:");
    });
  
    it("should validate successfully against safe input for Path Traversal", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).not.toThrow();
    });
  
    it("should fail validation against malicious input for Path Traversal", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "../../etc/passwd", "cn=admin,dc=example,dc=com")).toThrow("Validation failed:");
    });
  
    it("should validate successfully against safe input for LDAP Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "cn=admin,dc=example,dc=com")).not.toThrow();
    });
  
    it("should fail validation against malicious input for LDAP Injection", () => {
      expect(() => new TestClass("Hello, world!", "SELECT * FROM users;", "ls", "/home/user", "(|(cn=admin))")).toThrow("Validation failed:");
    });
  
    it("should fail validation for non supported strategy", () => {
      expect(() => new InvalidTestClass("Not Suported")).toThrow("Security validation type 'notSupported' is not supported.");
    });
  });