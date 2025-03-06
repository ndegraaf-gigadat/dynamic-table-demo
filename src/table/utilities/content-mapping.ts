import RenderTableData from "../render-table-data.svelte";
import TableLogo from "../table-logo.svelte";
import RefreshButton from "../table-refresh-button.svelte";
import { CellType } from "../types/types";

export const cellComponentMapping = {
  [CellType.LOGO]: TableLogo,
  [CellType.REFRESH]: RefreshButton,
  [CellType.DEFAULT]: RenderTableData,
};
