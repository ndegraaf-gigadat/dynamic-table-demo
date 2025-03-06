import { render, fireEvent } from "@testing-library/svelte";

import DynamicTable from "./dynamic-table.svelte";
import { CellType } from "./types/types";

describe("DynamicTable", () => {
  const mockColumns = [
    {
      field: "name",
      label: "Name",
      cellType: CellType.DEFAULT,
      headerClass: "",
      cellClass: "",
    },
    {
      field: "logo",
      label: "Logo",
      cellType: CellType.LOGO,
      headerClass: "",
      cellClass: "",
      imageSource: "logos/",
    },
    {
      field: "refresh",
      label: "Actions",
      cellType: CellType.REFRESH,
      headerClass: "",
      cellClass: "",
    },
  ];

  const mockRows = [
    { id: 1, name: "Company A", logo: "company-a.png" },
    { id: 2, name: "Company B", logo: "company-b.png" },
  ];

  test("renders table with correct columns", () => {
    const { getAllByText } = render(DynamicTable, {
      props: { columns: mockColumns, rows: mockRows },
    });

    expect(getAllByText("Name")).toBeTruthy();
    expect(getAllByText("Logo")).toBeTruthy();
    expect(getAllByText("Actions")).toBeTruthy();
  });

  test("renders table with correct row data", () => {
    const { getAllByText } = render(DynamicTable, {
      props: { columns: mockColumns, rows: mockRows },
    });

    expect(getAllByText("Company A")).toBeTruthy();
    expect(getAllByText("Company B")).toBeTruthy();
  });

  test('displays "No data available" when rows array is empty', () => {
    const { getByText } = render(DynamicTable, {
      props: { columns: mockColumns, rows: [] },
    });

    expect(getByText("No data available")).toBeTruthy();
  });

  test("applies custom table class", () => {
    const customClass = "custom-table-class";
    const { container } = render(DynamicTable, {
      props: { columns: mockColumns, rows: mockRows, tableClass: customClass },
    });

    const tableElement = container.querySelector("table");
    expect(tableElement?.classList.contains(customClass)).toBe(true);
  });

  test("dispatches refresh event when refresh button is clicked", async () => {
    const { component, getAllByText } = render(DynamicTable, {
      props: { columns: mockColumns, rows: mockRows },
    });

    const mockDispatch = vi.fn();
    component.$on("refresh", mockDispatch);

    const refreshButtons = getAllByText("Refresh");
    await fireEvent.click(refreshButtons[0]);

    expect(mockDispatch).toHaveBeenCalled();
  });
});
