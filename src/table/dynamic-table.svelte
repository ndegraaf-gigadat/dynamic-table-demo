<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import {
    CellType,
    type CellProperties,
    type ColumnConfig,
    type RowData,
  } from "./types/types";
  import { cellComponentMapping } from "./utilities/content-mapping";

  export let columns: ColumnConfig[] = [];
  export let rows: RowData[] = [];
  export let tableClass = "";

  const dispatch = createEventDispatcher();

  function getCellComponent(column: ColumnConfig) {
    return (
      cellComponentMapping[
        column.cellType as keyof typeof cellComponentMapping
      ] || cellComponentMapping[CellType.DEFAULT]
    );
  }

  function getCellProperties(
    column: ColumnConfig,
    row: RowData
  ): CellProperties {
    let properties: CellProperties = { row, column };

    if (column.cellType === CellType.REFRESH) {
      properties.refreshHandler = (event) =>
        dispatch("refresh", { column, row, event });
    }

    if (column.cellProps) {
      if (typeof column.cellProps === "function") {
        properties = { ...properties, ...column.cellProps(row, column) };
      } else if (typeof column.cellProps === "object") {
        properties = { ...properties, ...column.cellProps };
      }
    }

    return properties;
  }
</script>

<div class="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
  <table class={`min-w-full table-auto divide-y divide-gray-200 ${tableClass}`}>
    <thead class="bg-gray-50">
      <tr>
        {#each columns as column}
          <th
            class={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.headerClass || ""}`}
          >
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each rows as row (row.id)}
        <tr class="hover:bg-gray-50 transition-colors duration-150">
          {#each columns as column}
            <td class={`px-6 py-4 whitespace-nowrap ${column.cellClass || ""}`}>
              <svelte:component
                this={getCellComponent(column)}
                {...getCellProperties(column, row)}
              />
            </td>
          {/each}
        </tr>
      {:else}
        <tr>
          <td
            colspan={columns.length}
            class="px-6 py-4 text-center text-sm text-gray-500"
          >
            No data available
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
