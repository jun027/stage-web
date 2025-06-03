import { memo, useCallback, useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Box, Stack, TablePagination, Typography } from '@mui/material'
import { Scrollbar } from '@/components/scrollbar'
import DataTableCheckbox from './data-table-checkbox'
import DataTableNoContent from './data-table-no-content'
import DataTableLoading from './data-table-loading'

function DataTablePro({
  data = [],
  columns = [],
  pageSizeList = [10, 30, 50, 100],
  tableMinWidth = null,
  tbodyHeight = null,
  tbodyMaxHeight = null,
  headerRowSx = {},
  enabledCheckbox = false,
  loading = false,
  defaultSortBy = [{ id: 'id', desc: true }],
  selectedViewsContent = null,
}) {
  const alignMap = useMemo(
    () => ({
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    }),
    []
  )

  const [rowSelection, setRowSelection] = useState({})

  const defaultColumns = useMemo(() => {
    // 如果啟用 checkbox，則在 columns 的最前面加上 select欄
    if (enabledCheckbox) {
      return [
        {
          id: 'select',
          header: ({ table }) => (
            <DataTableCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <DataTableCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
        },
        ...columns,
      ]
    }

    return columns
  }, [columns, enabledCheckbox])

  const rowSelectionData = useMemo(() => {
    if (enabledCheckbox) {
      return Object.keys(rowSelection).map((index) => data[parseInt(index)])
    }

    return null
  }, [data, enabledCheckbox, rowSelection])

  const table = useReactTable({
    columns: defaultColumns,
    data,
    initialState: {
      pagination: {
        pageSize: pageSizeList[0],
      },
      sorting: defaultSortBy,
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    enableSortingRemoval: false,
    sortDescFirst: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handlePageChange = useCallback(
    (e, page) => {
      table.setPageIndex(page)
    },
    [table]
  )

  const handleRowsPerPageChange = useCallback(
    (e) => {
      table.setPageSize(Number(e.target.value))
    },
    [table]
  )

  return (
    <Stack>
      <Scrollbar>
        <Stack minWidth={tableMinWidth}>
          {/* Header */}
          <Stack position={'relative'}>
            {/* Checkbox */}
            {enabledCheckbox && (table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
              <Stack
                position="absolute"
                top={0}
                left={0}
                zIndex={100}
                width={'100%'}
                height={'100%'}
                direction={'row'}
                alignItems={'center'}
                sx={{
                  backgroundColor: 'table.tableHeaderRowBackgroundSelected',
                }}
              >
                <Stack
                  width="inherit"
                  direction={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Stack direction={'row'} alignItems={'center'}>
                    <Box p={2}>
                      <DataTableCheckbox
                        {...{
                          checked: table.getIsAllRowsSelected(),
                          indeterminate: table.getIsSomeRowsSelected(),
                          onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                      />
                    </Box>
                    <Box p={2}>
                      <Typography variant="body2">
                        {`已選取 ${table.getSelectedRowModel().rows.length} 筆`}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack flex={1}>
                    {selectedViewsContent && selectedViewsContent(rowSelectionData)}
                  </Stack>
                </Stack>
              </Stack>
            )}

            {/* Header Row */}
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <Stack key={headerGroup.id} direction={'row'} sx={{ ...headerRowSx }}>
                  {/* Header */}
                  {headerGroup.headers.map((header) => {
                    const rotateY = { asc: '0', desc: '-180' }[header.column.getIsSorted()]
                    const align = alignMap[header.column.columnDef.align]

                    return (
                      <Box
                        key={header.id}
                        p={2}
                        alignItems={'center'}
                        display={'flex'}
                        flex={header.column.columnDef.width}
                        minWidth={0}
                        width={`${header.column.columnDef.width}px`}
                        minHeight={'60px'}
                      >
                        {header.isPlaceholder ? null : (
                          <Stack
                            width={'100%'}
                            direction={'row'}
                            justifyContent={align}
                            alignItems={'center'}
                            spacing={1}
                            style={{
                              userSelect: 'none',
                              cursor: header.column.getCanSort() ? 'pointer' : 'default',
                            }}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {/* 顯示內容區域 */}
                            {typeof header.column.columnDef.header === 'string' ? (
                              <Typography
                                variant="body2"
                                fontWeight={header.column.getIsSorted() && 'bold'}
                              >
                                {header.column.columnDef.header}
                              </Typography>
                            ) : (
                              flexRender(header.column.columnDef.header, header.getContext())
                            )}
                            {header.column.getIsSorted() && (
                              <ArrowUpwardIcon
                                fontSize={'small'}
                                sx={{
                                  transition: 'transform 0.2s',
                                  transform: `rotate(${rotateY}deg)`,
                                }}
                              />
                            )}
                          </Stack>
                        )}
                      </Box>
                    )
                  })}
                </Stack>
              )
            })}
          </Stack>

          {/* Body */}
          <Scrollbar sx={{ height: tbodyHeight, maxHeight: tbodyMaxHeight, position: 'relative' }}>
            {table.getRowModel().rows.map((row) => {
              return (
                <Stack
                  data-row-id={row.id}
                  key={row.id}
                  direction={'row'}
                  borderBottom={`1px solid #F4F7FA`}
                  sx={{
                    transition: 'background-color 0.25s',
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    backgroundColor: row.getIsSelected() ? 'table.selected' : 'inherit',
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Box
                        key={cell.id}
                        p={2}
                        display={'inline-flex'}
                        alignItems={'center'}
                        flex={cell.column.columnDef.width}
                        minWidth={0}
                        width={`${cell.column.columnDef.width}px`}
                        sx={{
                          typography: 'body2',
                          wordBreak: 'break-word',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Box>
                    )
                  })}
                </Stack>
              )
            })}
            <DataTableNoContent rowCount={table.getRowCount()} />

            {loading && (
              <DataTableLoading
                position={'absolute'}
                top={0}
                left={0}
                width={'100%'}
                height={'100%'}
                zIndex={100}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(2px)',
                }}
              />
            )}
          </Scrollbar>
        </Stack>
      </Scrollbar>
      {/* Footer */}
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          component={'div'}
          showFirstButton
          showLastButton
          sx={{
            borderTopColor: 'border.tableFooter',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
          }}
          count={table.getRowCount()}
          page={table.getState().pagination.pageIndex}
          onPageChange={handlePageChange}
          rowsPerPage={table.getState().pagination.pageSize || pageSizeList[0]}
          rowsPerPageOptions={pageSizeList}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage="每頁行數:"
        />
      </Box>
    </Stack>
  )
}

export default memo(DataTablePro)
