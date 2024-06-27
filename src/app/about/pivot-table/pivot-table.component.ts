import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface PivotTable {
  pivotKey?: string;
  data: any[];
  columns: TableColumn[];
  pivotValues?: string[];
  tableHeader?: string;
  pivotHeader?: string;
  columnDataGroupHeader?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  aggregate?: (tableData: any[], key: string) => string;
  show: boolean;
  columnDataGroup?: TableColumnDataGroup | undefined;
}

export interface TableColumnDataGroup {
  data: any[];
  aggregate: (tableData: any[], key: string, columnGroupKey: string) => string;
  addEmptyRowAtBottom?: boolean;
}

@Component({
  selector: 'pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PivotTableComponent
{
  @Input() table?: PivotTable;

  constructor(
  )
  {

  }

  getPivotData(key: string, pivotValue: string, pivotKey: string, columnDataGroupKey?: string): string {
    // first get the data that matches the pivot key and the pivot value
    var data = this.table!.data.filter(td => (td as any)[pivotKey] === pivotValue);

    // get the column for this key
    var column = this.table!.columns.filter(th => th.key === key)[0];

    var result = "";

    // if it's a column data group use that callback
    if (column.columnDataGroup) {
      result = column.columnDataGroup.aggregate(data, key, columnDataGroupKey!);
    }
    // otherwise use the columns callback
    else if (column.aggregate) {
      result = column.aggregate(data, key);
    }

    return result;
  }
}
