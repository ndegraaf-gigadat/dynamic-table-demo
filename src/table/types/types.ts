export type RowData = {
  [key: string]: unknown;
  id: number | string;
};

export type CellProperties = {
  [key: string]: unknown;
  row: RowData;
  column: ColumnConfig;
  refreshHandler?: (event: Event) => void;
};

export enum CellType {
  DEFAULT = "default",
  REFRESH = "refresh",
  LOGO = "logo",
}

export type ColumnConfig = {
  field: string;
  label: string;
  cellType: CellType;
  headerClass: string;
  cellClass: string;
  imageSource?: string;
  shouldFetchLatestImage?: boolean;
  /**
   * Optional additional properties or a function that returns additional properties
   * for the cell component.
   */
  cellProps?:
    | Record<string, unknown>
    | ((row: RowData, column: ColumnConfig) => Record<string, unknown>);
};
