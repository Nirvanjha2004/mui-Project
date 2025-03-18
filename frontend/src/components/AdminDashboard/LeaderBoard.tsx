"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Search, Trophy } from "lucide-react"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    Rank: 3,
    email: "ken99@example.com",
    Name: "Ken Thompson",
    Test: 32,
    Score: 98,
    avatar: "KT"
  },
  {
    id: "3u1reuv4",
    amount: 242,
    Rank: 1,
    email: "sarah.miller@example.com",
    Name: "Sarah Miller",
    Test: 45,
    Score: 100,
    avatar: "SM"
  },
  {
    id: "derv1ws0",
    amount: 837,
    Rank: 2,
    email: "james.wilson@example.com",
    Name: "James Wilson",
    Test: 38,
    Score: 99,
    avatar: "JW"
  },
  {
    id: "5kma53ae",
    amount: 874,
    Rank: 4,
    email: "alex.parker@example.com",
    Name: "Alex Parker",
    Test: 28,
    Score: 95,
    avatar: "AP"
  },
  {
    id: "bhqecj4p",
    amount: 721,
    Rank: 5,
    email: "carmella@example.com",
    Name: "Carmella Johnson",
    Test: 25,
    Score: 92,
    avatar: "CJ"
  },
]

export type Payment = {
  id: string
  amount: number
  Rank: number
  email: string
  Name: string
  Score: number
  Test: number
  avatar: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "Rank",
    header: "Rank",
    cell: ({ row }) => {
      const rank: number = row.getValue("Rank")
      
      // Special styling for top 3 ranks
      if (rank <= 3) {
        const colors = {
          1: "bg-amber-100 text-amber-800 border-amber-300",
          2: "bg-gray-100 text-gray-800 border-gray-300",
          3: "bg-orange-100 text-orange-800 border-orange-300"
        }
        
        const icons = {
          1: <Trophy size={14} className="text-amber-500" />,
          2: <Trophy size={14} className="text-gray-500" />,
          3: <Trophy size={14} className="text-orange-500" />
        }
        
        return (
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full border ${colors[rank as 1 | 2 | 3]}`}>
              {rank}
            </div>
            {icons[rank as 1 | 2 | 3]}
          </div>
        )
      }
      
      return <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center">{rank}</div>
    },
  },
  {
    accessorKey: "Name",
    header: "User",
    cell: ({ row }) => {
      const name: string = row.getValue("Name")
      const email: string = row.getValue("email")
      const avatar: string = row.original.avatar
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-gray-200">
            <AvatarImage src={`/assets/avatars/${row.id}.png`} alt={name} />
            <AvatarFallback className="bg-primary/10">{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase hidden md:block">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "Score",
    header: "Score",
    cell: ({ row }) => {
      const score: number = row.getValue("Score")
      
      return (
        <div className="flex items-center">
          <Badge variant={score >= 95 ? "default" : "outline"} className="font-medium">
            {score}%
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "Test",
    header: "Tests",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("Test")}</div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">View Test History</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Send Message</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    email: false // Hide email column by default on mobile
  })
  const [rowSelection, setRowSelection] = React.useState({})
  const [pageIndex, setPageIndex] = React.useState(0)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center py-4 gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search users..."
            value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Name")?.setFilterValue(event.target.value)
            }
            className="pl-9 pr-4"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto h-8">
                <span>Columns</span> <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "Name" ? "User" : column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-medium text-muted-foreground">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.getValue("Rank") === 1 ? "bg-amber-50 dark:bg-amber-950/10" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} user(s) selected.
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium">
            Page {pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="hidden sm:flex h-8 w-8 p-0 items-center justify-center"
            >
              <span className="sr-only">Go to first page</span>
              <ChevronLeft className="h-4 w-4" />|
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(pageIndex - 1)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(pageIndex + 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="hidden sm:flex h-8 w-8 p-0 items-center justify-center"
            >
              <span className="sr-only">Go to last page</span>
              |<ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
