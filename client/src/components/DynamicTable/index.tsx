/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorMode,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
import Loading from "../../components/Loading";

interface Props {
  columns: ColumnDef<ITData>[];
  data: ITData[];
  hidePagination?: boolean;
  totalCount?: number;
  setPageProps?: OnChangeFn<PaginationState>;
  pageProps?: PaginationState;
  totalPages?: number;
  isLoading?: boolean;
}

const Index = ({
  columns,
  data,
  hidePagination,
  totalCount,
  setPageProps,
  pageProps,
  totalPages,
  isLoading,
}: Props) => {
  const { colorMode } = useColorMode();
  const pagination = useMemo(
    () => ({
      pageIndex: pageProps?.pageIndex ?? 0,
      pageSize: pageProps?.pageSize ?? 10,
    }),
    [pageProps?.pageIndex, pageProps?.pageSize]
  );
  const table = useReactTable<ITData>({
    data,
    columns,
    pageCount: totalPages ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPageProps,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  const tableHeadRows = table.getHeaderGroups().map((headerGroup) => (
    <Tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <Th
          key={header.id}
          layerStyle="dark"
          textAlign="center"
          style={{ wordBreak: "keep-all" }}
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </Th>
      ))}
    </Tr>
  ));

  const tableBodyRows = table.getRowModel().rows.map((row) => (
    <Tr key={row.id}>
      {row.getVisibleCells().map((cell, index, cells) => {
        let borderRight = index < cells.length - 1 ? "1px" : "0px";
        return (
          <Td
            key={cell.id}
            maxWidth={`${85 / cells.length}vw`}
            borderRightWidth={borderRight}
            textAlign="center"
            style={{ wordBreak: "break-all" }}
            overflowY="auto"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Td>
        );
      })}
    </Tr>
  ));
  return (
    <TableContainer width="100%">
      {isLoading && <Loading text="loading data" />}
      <Table>
        <Thead backgroundColor={colorMode === "dark" ? "black" : "#F0F2F5"}>
          {tableHeadRows}
        </Thead>
        <Tbody bg="white">{tableBodyRows}</Tbody>
      </Table>
      {!hidePagination && (
        <Pagination
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          gotoPage={table.setPageIndex}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          page={table.getPageCount()}
          totalCount={totalCount ?? 0}
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
          pageIndex={table.getState().pagination.pageIndex}
          pageCount={totalPages ?? 0}
        />
      )}
    </TableContainer>
  );
};

export default Index;
