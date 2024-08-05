"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    SortingState,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    getPaginationRowModel,
    getFilteredRowModel,
    VisibilityState,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DeleteIcon, Edit, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./pagination"
import { DataTableViewOptions } from "./columntoggle"
import { useDispatch } from "react-redux"
import { setDelete, setEdit } from "@/redux/inventoryslices/inventoryslice"
import { performDelete } from "@/serveractions/inventoryactions"
import { toast } from "sonner"
import { RevalidateTags } from "@/lib/RevalidateTags"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title: string;
    page:string
}

export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    page
}: DataTableProps<TData, TValue>) {

    // states to handle filtering and sorting
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})


    // redux states and actions
    const dispatch=useDispatch()



    // generate our actions column
    const actionColumns = {

        id: "actions",
        cell: ({ row }: { row: any }) => {
            const item = row?.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button variant="ghost" className="h-8 w-8 p-0" onClick={()=>{
                                console.log('clicked', page)
                                dispatch(setEdit({edit:true,editdata:{...row?.original},page}))
                            }}>
                                <span className="sr-only">Open menu</span>
                                <Edit className="h-4 w-4" />
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant="ghost" className="h-8 w-8 p-0" onClick={async()=>{
                                await performDelete(row?.original?.id, page).then(()=>{
                                    // perform invalidation of data
                                    RevalidateTags(page==="inventory" ? "inventories" : "categories")
                                    RevalidateTags("dashboard")
                                    RevalidateTags("stocklevel")
                                    toast.success("deleted successfully")
                                }).catch((e)=>{
                                    toast.error(e?.message)
                                })
                            }}>
                                <span className="sr-only">Open menu</span>
                                <DeleteIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },

    }


    const updatedColumns = [...columns, actionColumns]


    // inititalize our tanstack table
    const table = useReactTable({
        data,
        columns: updatedColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        }
    })

    return (
        <div className="flex flex-col overflow-hidden items-start justify-start h-full">
            {/* handles our filtering */}
            <div className="flex w-full justify-between items-center py-4">
                <Input
                    placeholder={`Filter ${title}...`}
                    value={(table.getColumn(title)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(title)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DataTableViewOptions table={table}/>

            </div>
            <div className="rounded-md border overflow-y-scroll w-full">
                <Table className="w-full">
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="my-2">
                <DataTablePagination table={table} />
            </div>
        </div>

    )
}
