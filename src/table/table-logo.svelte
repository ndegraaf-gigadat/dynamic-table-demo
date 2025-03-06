<script lang="ts">
  import { getImageSource } from "./utilities/get-image-source";

  import type { RowData, ColumnConfig } from "./types/types";

  export let row: RowData;
  export let column: ColumnConfig;

  let sourceUrl = getImageSource(
    column.imageSource ?? "",
    row[column.field] as string | undefined,
    column.shouldFetchLatestImage
  );

  // For the sake of testing
  // @ts-expect-error - this is a test
  $: sourceUrl = undefined;
</script>

{#if sourceUrl && sourceUrl.trim() !== ""}
  <img src={sourceUrl} alt="logo" class="mx-auto w-12" />
{:else}
  <div
    class="mx-auto w-12 h-12 flex items-center justify-center bg-gray-100 rounded"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="text-gray-400"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="3" y1="3" x2="21" y2="21"></line>
    </svg>
  </div>
{/if}
