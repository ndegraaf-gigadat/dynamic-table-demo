import { cellComponentMapping } from "./content-mapping";
import RenderTableData from "../render-table-data.svelte";
import TableLogo from "../table-logo.svelte";
import RefreshButton from "../table-refresh-button.svelte";
import { CellType } from "../types/types";

describe("cellComponentMapping", () => {
  test("maps DEFAULT cell type to RenderTableData component", () => {
    expect(cellComponentMapping[CellType.DEFAULT]).toBe(RenderTableData);
  });

  test("maps LOGO cell type to TableLogo component", () => {
    expect(cellComponentMapping[CellType.LOGO]).toBe(TableLogo);
  });

  test("maps REFRESH cell type to RefreshButton component", () => {
    expect(cellComponentMapping[CellType.REFRESH]).toBe(RefreshButton);
  });

  test("contains all cell types defined in CellType enum", () => {
    // Get all values from CellType enum
    const cellTypeValues = Object.values(CellType);

    // Check that each cell type has a mapping
    for (const cellType of cellTypeValues) {
      expect(cellComponentMapping[cellType as CellType]).toBeDefined();
    }
  });
});
