import { Table as AntTable } from "antd";
import type { TableProps } from "antd";
import * as React from "react";

export type CustomTableProps<T> = TableProps<T> & {
  loading?: boolean;
};

export function Table<T extends object>({
  loading = false,
  pagination = { pageSize: 10 },
  ...props
}: CustomTableProps<T>) {
  return (
    <AntTable<T>
      loading={loading}
      pagination={pagination}
      {...props}
      ref={null}
    />
  );
}
