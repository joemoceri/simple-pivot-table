import { Component, ViewEncapsulation } from '@angular/core';
import { PivotTable, TableColumn } from './pivot-table/pivot-table.component';
export interface BusinessOrder {
  orderId: number;
  businessName: string;
  zipCode: string;
  dateShipped: string;
  unitsSold: number;
  total: number;
}

@Component({
    selector     : 'about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AboutComponent
{
  tableColumns: TableColumn[] = [
    {
      key: 'orderId',
      label: 'Order ID',
      aggregate: (tableData: BusinessOrder[], key: string): string => {
        return (tableData[0] as any)[key];
      },
      show: false,
    },
    {
      key: 'businessName',
      label: 'Business Name',
      aggregate: (tableData: any[], key: string): string => {
        return (tableData[0] as any)[key];
      },
      show: false,
    },
    {
      key: 'zipCode',
      label: 'Zip Code',
      aggregate: (tableData: any[], key: string): string => {
        return (tableData[0] as any)[key];
      },
      show: false,
    },
    {
      key: 'dateShipped',
      label: 'Date Shipped',
      aggregate: (tableData: any[], key: string): string => {
        return (tableData[0] as any)[key];
      },
      show: false,
    },
    {
      key: 'unitsSold',
      label: 'Units Sold',
      aggregate: (tableData: any[], key: string): string => {
        var result = 0;

        tableData.forEach(td => {
          result += (td as any)[key];
        });

        return `${result}`;
      },
      show: false,
    },
    {
      key: 'total',
      label: 'Total',
      aggregate: (tableData: any[], key: string): string => {
        var result = 0;

        tableData.forEach(td => {
          result += (td as any)[key];
        });

        return `${result}`;
      },
      show: false,
    },
  ];

  tableData = [
    {
      orderId: 1,
      businessName: 'Homegood Essentials',
      zipCode: '12345',
      dateShipped: '1/1/1980',
      unitsSold: 15,
      total: 1000,
    },
    {
      orderId: 2,
      businessName: 'Homegood Essentials',
      zipCode: '67890',
      dateShipped: '1/1/1980',
      unitsSold: 25,
      total: 2000,
    },
    {
      orderId: 3,
      businessName: 'Homegood Essentials',
      zipCode: '12345',
      dateShipped: '1/1/1981',
      unitsSold: 35,
      total: 3000,
    },
    {
      orderId: 4,
      businessName: 'Homegood Essentials',
      zipCode: '67890',
      dateShipped: '1/1/1981',
      unitsSold: 45,
      total: 4000,
    },
    {
      orderId: 5,
      businessName: 'All Mart',
      zipCode: '12345',
      dateShipped: '1/1/1982',
      unitsSold: 55,
      total: 5000,
    },
    {
      orderId: 6,
      businessName: 'All Mart',
      zipCode: '67890',
      dateShipped: '1/1/1982',
      unitsSold: 65,
      total: 6000,
    },
    {
      orderId: 7,
      businessName: 'All Mart',
      zipCode: '12345',
      dateShipped: '1/1/1980',
      unitsSold: 75,
      total: 7000,
    },
    {
      orderId: 8,
      businessName: 'All Mart',
      zipCode: '67890',
      dateShipped: '1/1/1980',
      unitsSold: 85,
      total: 8000,
    },
  ];

  pivotValues: any[] = [];
  pivotTable: PivotTable;
  selectedPivots: any[] = [
    {
      label: 'Date Shipped',
      key: 'dateShipped',
    },
    {
      label: 'Zip Code',
      key: 'zipCode',
    },
    {
      label: 'Business Name',
      key: 'businessName',
    },
  ];
  selectedColumnGroups: any[] = [
    {
      label: 'Date Shipped',
      key: 'dateShipped',
    },
    {
      label: 'Zip Code',
      key: 'zipCode',
    },
    {
      label: 'Business Name',
      key: 'businessName',
    },
  ];

  selectedAggregates: any[] = [
    {
      label: 'Units Sold',
      key: 'unitsSold',
      tableHeader: 'Sum of Units Sold',
    },
    {
      label: 'Total',
      key: 'total',
      tableHeader: 'Sum Total',
    },
  ];

  selectedPivot: any;
  selectedColumnGroup: any;
  selectedAggregate: any;
  addEmptyRowAtBottom: boolean = false;

  constructor(
  )
  {
    this.pivotTable = {
      columns: this.tableColumns,
      data: this.tableData,
    };

    this.selectedAggregate = this.selectedAggregates.filter(a => a.key === 'unitsSold')[0];
    this.onChangeAggregate();

    this.selectedPivot = this.selectedPivots.filter(sp => sp.key === 'zipCode')[0];
    this.onChangePivot();

    this.selectedColumnGroup = this.selectedColumnGroups.filter(cg => cg.key === 'businessName')[0];
    this.onChangeColumnGroup();
  }

  onAddEmptyRowAtBottomChange(): void {
    const column = this.pivotTable.columns.filter(c => !!c.columnGroup)[0];
    column.columnGroup!.addEmptyRowAtBottom = this.addEmptyRowAtBottom;
  }

  onChangeAggregate(): void {
    this.setAggregate(this.selectedAggregate.key);
  }

  setAggregate(selectedAggregateKey: string): void {
    this.pivotTable.tableHeader = this.selectedAggregate.tableHeader;
    const aggColumns = this.pivotTable.columns.filter(c => this.selectedAggregates.some(a => a.key === c.key));
    aggColumns.forEach(ac => ac.show = false);

    aggColumns.filter(c => c.key === selectedAggregateKey)[0].show = true;
  }

  onChangeColumnGroup(): void {
    this.setColumnGroup(this.selectedColumnGroup.key);
  }

  setColumnGroup(selectedColumnGroupKey: string): void {
    var column = this.pivotTable.columns.filter(c => c.key === selectedColumnGroupKey)[0];
    var previousGroup = this.pivotTable.columns.filter(c => !!c.columnGroup)[0];
    if (previousGroup) {
      previousGroup.show = false;
    }

    this.pivotTable.columns.forEach(c => c.columnGroup = undefined);

    column.columnGroup = {
      data: this.getUnique(this.tableData, selectedColumnGroupKey),
      aggregate: (data, key, columnGroupKey): string => {
        var result = 0;

        data.forEach(td => {
          if (columnGroupKey === td[key]) {
            result += (td as any)[this.selectedAggregate.key];
          }
        });

        return `${result}`;
      },
      addEmptyRowAtBottom: this.addEmptyRowAtBottom,
    };
    column.show = true;

    this.pivotTable.columnHeader = column.label;
  }

  onChangePivot(): void {
    this.setPivot(this.selectedPivot.key);
  }

  setPivot(selectedPivotKey: any) {
    this.pivotTable.pivotKey = selectedPivotKey;
    this.pivotTable.pivotValues = this.getUnique(this.tableData, this.pivotTable.pivotKey!);
    this.pivotTable.pivotHeader = this.tableColumns.filter(c => c.key === this.pivotTable.pivotKey)[0].label;
  }

  getPivotData(key: string, pivotValue: string, pivotKey: string, columnGroupKey?: string): string {
    var data = this.tableData.filter(td => (td as any)[pivotKey] === pivotValue);

    var column = this.tableColumns.filter(th => th.key === key)[0];

    var result = "";

    if (column.columnGroup) {
      result = column.columnGroup.aggregate(data, key, columnGroupKey!);
    }
    else if (column.aggregate) {
      result = column.aggregate(data, key);
    }

    return result;
  }

  getUnique(data: any[], key: string): any[] {
    var result = [...new Set(data.map(item => item[key]))];

    return result;
  }
}
