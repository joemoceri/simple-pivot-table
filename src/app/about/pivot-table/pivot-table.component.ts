import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface PivotTable {
  pivotKey?: string;
  data: any[];
  columns: TableColumn[];
  pivotValues?: string[];
  tableHeader?: string;
  pivotHeader?: string;
  columnHeader?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  aggregate?: (tableData: any[], key: string) => string;
  show: boolean;
  columnGroup?: TableColumnGroup | undefined;
}

export interface TableColumnGroup {
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

  getPivotData(key: string, pivotValue: string, pivotKey: string, columnGroupKey?: string): string {
    var data = this.table!.data.filter(td => (td as any)[pivotKey] === pivotValue);

    var column = this.table!.columns.filter(th => th.key === key)[0];

    var result = "";

    if (column.columnGroup) {
      result = column.columnGroup.aggregate(data, key, columnGroupKey!);
    }
    else if (column.aggregate) {
      result = column.aggregate(data, key);
    }

    return result;
  }
}
