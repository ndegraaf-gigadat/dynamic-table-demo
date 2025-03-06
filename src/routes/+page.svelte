<script lang="ts">
  import DynamicTable from "../table/dynamic-table.svelte";
  import { CellType } from "../table/types/types";
  import { success } from "../toast/toast-functions.js";
  import Toast from "../toast/toast.svelte";

  import type { ColumnConfig, RowData } from "../table/types/types";

  let columns: ColumnConfig[] = [
    {
      field: "column1",
      label: "Column 1",
      cellType: CellType.DEFAULT,
      headerClass: "w-1/3 text-left",
      cellClass: "text-left",
    },
    {
      field: "column2",
      label: "Column 2",
      cellType: CellType.DEFAULT,
      headerClass: "text-center",
      cellClass: "text-center",
    },
    {
      field: "column3",
      label: "Column 3",
      cellType: CellType.DEFAULT,
      headerClass: "text-center",
      cellClass: "text-center",
    },
    {
      field: "refresh",
      label: "Refresh",
      cellType: CellType.REFRESH,
      headerClass: "text-center",
      cellClass: "text-center",
    },
    {
      field: "logo",
      label: "Logo",
      cellType: CellType.LOGO,
      headerClass: "text-center",
      cellClass: "flex justify-center",
      imageSource: "/path/to/image.png",
    },
  ];

  const rows: RowData[] = [
    {
      id: 1,
      column1: "Row 1 Column 1",
      column2: "Row 1 Column 2",
      column3: "Row 1 Column 3",
      refresh: "refresh",
      logo: "logo.png",
    },
    {
      id: 2,
      column1: "Row 2 Column 1",
      column2: "Row 2 Column 2",
      column3: "Row 2 Column 3",
      refresh: "refresh",
      logo: "logo.png",
    },
    {
      id: 3,
      column1: "Row 3 Column 1",
      column2: "Row 3 Column 2",
      column3: "Row 3 Column 3",
      refresh: "refresh",
      logo: "logo.png",
    },
  ];

  const cellTypeOptions: Array<{ value: CellType; label: string }> = [
    { value: CellType.DEFAULT, label: "Default" },
    { value: CellType.REFRESH, label: "Refresh" },
    { value: CellType.LOGO, label: "Logo" },
  ];

  function updateColumnCellType(index: number, newType: CellType) {
    columns[index].cellType = newType;
    columns = [...columns];
  }
</script>

<div class="p-4">
  <h1 class="text-2xl mb-4">Dynamic Table Demo</h1>

  <Toast />

  <div class="mb-12">
    <h2 class="text-xl mb-2">
      Column Configuration, please update the column type and header class to
      see dynamic changes.
    </h2>
    {#each columns as column, index}
      <div class="mb-2 flex items-center">
        <label for={`column-type-${index}`} class="mr-2 font-semibold">
          {column.label}:
        </label>
        <select
          id={`column-type-${index}`}
          bind:value={column.cellType}
          on:change={() => {
            updateColumnCellType(index, column.cellType);
          }}
          class="p-1 border"
        >
          {#each cellTypeOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        <!-- Optional inputs to change styling dynamically -->
        <label for={`header-class-${index}`} class="sr-only"
          >Header Class for {column.label}</label
        >
        <input
          id={`header-class-${index}`}
          type="text"
          placeholder="Header Class"
          class="ml-2 p-1 border"
          bind:value={column.headerClass}
        />
        <label for={`cell-class-${index}`} class="sr-only"
          >Cell Class for {column.label}</label
        >
        <input
          id={`cell-class-${index}`}
          type="text"
          placeholder="Cell Class"
          class="ml-2 p-1 border"
          bind:value={column.cellClass}
        />
      </div>
    {/each}
  </div>

  <!-- This is the part that matters -->
  <DynamicTable
    {columns}
    {rows}
    on:refresh={(event) => {
      console.log(
        `Refresh clicked for row ${event.detail.row.id} in column ${event.detail.column.label}`
      );
      success(
        `Refreshing data for row ${event.detail.row.id} in column ${event.detail.column.label}`
      );
    }}
  />
  <!-- ----------------------------- -->
</div>
