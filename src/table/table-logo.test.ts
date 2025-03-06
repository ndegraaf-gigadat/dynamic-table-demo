import { render } from "@testing-library/svelte";

import TableLogo from "./table-logo.svelte";
import { CellType } from "./types/types";
import * as imageSourceModule from "./utilities/get-image-source";

describe("TableLogo", () => {
  const mockRow = { id: 1, logo: "company-logo.png" };
  const mockColumn = {
    field: "logo",
    label: "Logo",
    cellType: CellType.LOGO,
    headerClass: "",
    cellClass: "",
    imageSource: "logos/",
  };

  beforeEach(() => {
    // Reset any mocks
    vi.restoreAllMocks();
  });

  test("renders fallback SVG when source URL is empty", () => {
    // Mock the getImageSource function to return an empty string
    vi.spyOn(imageSourceModule, "getImageSource").mockReturnValue("");

    const { container } = render(TableLogo, {
      props: { row: mockRow, column: mockColumn },
    });

    const svgElement = container.querySelector("svg");
    expect(svgElement).not.toBeNull();
  });

  test("renders fallback SVG when source URL is undefined", () => {
    // Mock the getImageSource function to return undefined
    vi.spyOn(imageSourceModule, "getImageSource").mockReturnValue(
      undefined as unknown as string
    );

    const { container } = render(TableLogo, {
      props: { row: mockRow, column: mockColumn },
    });

    const svgElement = container.querySelector("svg");
    expect(svgElement).not.toBeNull();
  });

  test("passes correct parameters to getImageSource", () => {
    const getImageSourceSpy = vi.spyOn(imageSourceModule, "getImageSource");

    render(TableLogo, {
      props: {
        row: mockRow,
        column: {
          ...mockColumn,
          shouldFetchLatestImage: true,
        },
      },
    });

    expect(getImageSourceSpy).toHaveBeenCalledWith(
      "logos/",
      "company-logo.png",
      true
    );
  });
});
