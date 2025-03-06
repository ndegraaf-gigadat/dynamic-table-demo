import { getImageSource } from "./get-image-source";

describe("getImageSource", () => {
  test("returns empty string when logo is undefined", () => {
    // eslint-disable-next-line no-void
    const result = getImageSource("logos/", void 0);
    expect(result).toBe("");
  });

  test("returns empty string when logo is empty string", () => {
    const result = getImageSource("logos/", "");
    expect(result).toBe("");
  });

  test("returns empty string when logo is whitespace", () => {
    const result = getImageSource("logos/", "  ");
    expect(result).toBe("");
  });

  test("returns correct URL when logo is provided", () => {
    const result = getImageSource("logos/", "company-logo.png");
    expect(result).toBe("s3-url/logos/company-logo.png");
  });

  test("handles empty folder path", () => {
    const result = getImageSource("", "company-logo.png");
    expect(result).toBe("s3-url/company-logo.png");
  });

  test("handles undefined folder path", () => {
    const result = getImageSource(
      undefined as unknown as string,
      "company-logo.png"
    );
    expect(result).toBe("s3-url/company-logo.png");
  });

  test("adds unique ID query parameter when withUniqueId is true", () => {
    // Mock Date to have consistent test results
    const originalDate = global.Date;
    const mockDate = new Date("2023-01-01T12:00:00Z");

    // Create a mock Date class
    global.Date = class extends Date {
      constructor() {
        super();

        // eslint-disable-next-line no-constructor-return
        return mockDate;
      }

      // eslint-disable-next-line @typescript-eslint/naming-convention
      toISOString(): string {
        return "2023-01-01T12:00:00.000Z";
      }
    } as unknown as DateConstructor;

    const result = getImageSource("logos/", "company-logo.png", true);

    // Restore original Date
    global.Date = originalDate;

    expect(result).toBe(
      "s3-url/logos/company-logo.png?uniqueid=2023-01-01T12:00:00.000Z"
    );
  });
});
