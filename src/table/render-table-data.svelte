<script lang="ts">
  import type { RowData, ColumnConfig } from "./types/types";

  export let row: RowData;
  export let column: ColumnConfig;
</script>

<div>
  {#if row[column.field] !== undefined}
    {row[column.field]}
  {:else}
    -
  {/if}
</div>
