import { CellType } from "./types";

describe("CellType enum", () => {
  it("should have the correct values", () => {
    expect(CellType.DEFAULT).toBe("default");
    expect(CellType.REFRESH).toBe("refresh");
    expect(CellType.LOGO).toBe("logo");
  });

  it("should be usable in a switch statement", () => {
    const getCellTypeDescription = (type: CellType): string => {
      switch (type) {
        case CellType.DEFAULT: {
          return "Default cell type";
        }

        case CellType.REFRESH: {
          return "Refresh button cell type";
        }

        case CellType.LOGO: {
          return "Logo image cell type";
        }
      }
    };

    expect(getCellTypeDescription(CellType.DEFAULT)).toBe("Default cell type");
    expect(getCellTypeDescription(CellType.REFRESH)).toBe(
      "Refresh button cell type"
    );
    expect(getCellTypeDescription(CellType.LOGO)).toBe("Logo image cell type");
  });
});
