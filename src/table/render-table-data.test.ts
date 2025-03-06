import { render } from "@testing-library/svelte";

import RenderTableData from "./render-table-data.svelte";
import { CellType } from "./types/types";

describe("RenderTableData", () => {
  const mockColumn = {
    field: "name",
    label: "Name",
    cellType: CellType.DEFAULT,
    headerClass: "",
    cellClass: "",
  };

  test("renders data from row using column field", () => {
    const mockRow = { id: 1, name: "Company A" };

    const { getByText } = render(RenderTableData, {
      props: { row: mockRow, column: mockColumn },
    });

    expect(getByText("Company A")).toBeTruthy();
  });

  test("renders dash when field is undefined", () => {
    const mockRow = { id: 1 }; // No name field

    const { getByText } = render(RenderTableData, {
      props: { row: mockRow, column: mockColumn },
    });

    expect(getByText("-")).toBeTruthy();
  });

  test("renders dash when field is null", () => {
    const mockRow = { id: 1, name: undefined };

    const { getByText } = render(RenderTableData, {
      props: { row: mockRow, column: mockColumn },
    });

    expect(getByText("-")).toBeTruthy();
  });

  test("renders zero value correctly", () => {
    const mockRow = { id: 1, count: 0 };
    const numberColumn = { ...mockColumn, field: "count" };

    const { getByText } = render(RenderTableData, {
      props: { row: mockRow, column: numberColumn },
    });

    expect(getByText("0")).toBeTruthy();
  });
});
