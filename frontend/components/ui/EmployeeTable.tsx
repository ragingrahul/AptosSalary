"use client"

import * as React from "react"
import {
    CaretSortIcon,
    CheckIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
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

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";

export type Employee = {
    address: string
    employeeName: string
    verified: boolean
    salary: number
    activity: string
    daysWorked: number
}

const data: Employee[] = [
    {
        address: "Ox583dbjsb9",
        employeeName: "Rahul",
        verified: false,
        salary: 10,
        activity: "Developer",
        daysWorked: 1,
    },
    {
        address: "Ox583dbjsb9",
        employeeName: "Rahul",
        verified: false,
        salary: 10,
        activity: "Developer",
        daysWorked: 1,
    },
    // {
    //     address: "Ox583dbjsb9",
    //     employeeName: "Rahul",
    //     verified: false,
    //     salary: 10,
    //     activity: "Developer",
    //     daysWorked: 1,
    // }
]

export const columns: ColumnDef<Employee>[] = [

    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("address")}</div>
        ),
    },
    {
        accessorKey: "employeeName",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("employeeName")}</div>
        ),
    },
    {
        accessorKey: "verified",
        header: "Verified",
        cell: ({ row }) => {
            const verified = row.getValue("verified") as boolean
            return (
                <div className="flex">
                    {verified ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                    ) : (
                        <RxCross2 className="h-5 w-5 text-red-500" />
                    )}
                    <span className="ml-2 capitalize">
                        {verified ? "Yes" : "No"}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "salary",
        header: () => <div className="text-center">Salary</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"))

            // Format the amount as a dollar amount
            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "APT",
            // }).format(amount)

            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "activity",
        header: () => <div className="text-center">Activity</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("activity")}</div>
        ),
    },
    {
        accessorKey: "daysWorked",
        header: () => <div className="text-center">Days Worked</div>,
        cell: ({ row }) => (
            <div className="capitalize text-center">{row.getValue("daysWorked")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const employee = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(employee.address)}
                        >
                            Copy employee ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View employee details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]



export function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
        },
        initialState: {
            pagination: {
                pageSize: 3,
            }
        }
    })

    return (
        <div className="w-full">
            <div className="flex items-center ">
                <DropdownMenu>
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
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
            <div className="flex items-center justify-end space-x-2 pt-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
