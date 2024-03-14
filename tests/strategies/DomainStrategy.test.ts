import { Project, ClassDeclaration, SourceFile } from "ts-morph";
import inquirer from "inquirer";
import { DomainStrategy } from "../../src/cli/strategies";

jest.mock("inquirer", () => ({
  prompt: jest.fn(),
}));

describe("DomainStrategy", () => {
  let domainStrategy: DomainStrategy;
  let mockProject: Project;
  let mockSourceFile: SourceFile;
  let mockClasses: ClassDeclaration[];

  beforeEach(() => {
    mockProject = new Project();
    mockSourceFile = mockProject.createSourceFile(
      "test.ts",
      "class TestClass { testProperty: string; }"
    );
    const realClassDeclaration = mockSourceFile.getClasses()[0];
    mockClasses = [realClassDeclaration];

    // Mock addDecorator
    mockClasses[0].getProperties()[0].addDecorator = jest.fn();

    domainStrategy = new DomainStrategy(
      mockProject,
      mockSourceFile,
      mockClasses
    );
  });

  it("should execute domain strategy for url type", async () => {
    (inquirer.prompt as unknown as jest.Mock)
      .mockResolvedValueOnce({ property: "testProperty", type: "url" })
      .mockResolvedValueOnce({ mustBeSecure: true, message: "Invalid URL" });

    await domainStrategy.execute();

    expect(inquirer.prompt).toHaveBeenCalled();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const type = lastCall.arguments[0].match(/type: \"(.*?)\"/)[1];
    const mustBeSecure =
      lastCall.arguments[0].match(/mustBeSecure: (true|false)/)[1] === "true";

    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Domain");
    // Verify the properties
    expect(type).toBe("url");
    expect(mustBeSecure).toBe(true);
    expect(message).toBe("Invalid URL");
  });

  it("should execute domain strategy for isoCountryCode type", async () => {
    (inquirer.prompt as unknown as jest.Mock)
      .mockResolvedValueOnce({
        property: "testProperty",
        type: "isoCountryCode",
      })
      .mockResolvedValueOnce({
        isoCodes: "US,CA,MX",
        isoCodePath: "/path/to/iso/codes.json",
        jsonProperty: "isoCode",
        message: "Invalid ISO Country Code",
      });

    await domainStrategy.execute();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const type = lastCall.arguments[0].match(/type: \"(.*?)\"/)[1];
    const isoCodes = lastCall.arguments[0]
      .match(/isoCodes: \[(.*?)\]/)[1]
      .split(",")
      .map((s: string) => s.trim().replace(/"/g, ""));
    const isoCodePath = lastCall.arguments[0].match(
      /isoCodePath: \"(.*?)\"/
    )[1];
    const jsonProperty = lastCall.arguments[0].match(
      /jsonProperty: \"(.*?)\"/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Domain");
    // Verify the properties
    expect(type).toBe("isoCountryCode");
    expect(isoCodes).toEqual(["US", "CA", "MX"]);
    expect(isoCodePath).toBe("/path/to/iso/codes.json");
    expect(jsonProperty).toBe("isoCode");
    expect(message).toBe("Invalid ISO Country Code");
  });

  it("should execute domain strategy for isoLanguageCode type", async () => {
    (inquirer.prompt as unknown as jest.Mock)
      .mockResolvedValueOnce({
        property: "testProperty",
        type: "isoLanguageCode",
      })
      .mockResolvedValueOnce({
        isoCodes: "en,es,fr",
        isoCodePath: "/path/to/iso/codes.json",
        jsonProperty: "isoCode",
        message: "Invalid ISO Language Code",
      });

    await domainStrategy.execute();

    // Get the last call to the mock
    const lastCall = (
      mockClasses[0].getProperties()[0].addDecorator as jest.Mock
    ).mock.calls[0][0];

    // Extract the properties from the string
    const type = lastCall.arguments[0].match(/type: \"(.*?)\"/)[1];
    const isoCodes = lastCall.arguments[0]
      .match(/isoCodes: \[(.*?)\]/)[1]
      .split(",")
      .map((s: string) => s.trim().replace(/"/g, ""));
    const isoCodePath = lastCall.arguments[0].match(
      /isoCodePath: \"(.*?)\"/
    )[1];
    const jsonProperty = lastCall.arguments[0].match(
      /jsonProperty: \"(.*?)\"/
    )[1];
    const message = lastCall.arguments[0].match(/message: \"(.*?)\"/)[1];

    // Verify object properties
    expect(lastCall.name).toBe("Domain");
    // Verify the properties
    expect(type).toBe("isoLanguageCode");
    expect(isoCodes).toEqual(["en", "es", "fr"]);
    expect(isoCodePath).toBe("/path/to/iso/codes.json");
    expect(jsonProperty).toBe("isoCode");
    expect(message).toBe("Invalid ISO Language Code");
  });
});
