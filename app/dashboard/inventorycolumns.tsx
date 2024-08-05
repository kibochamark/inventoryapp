"use client"

import { DataTableColumnHeader } from "@/components/globals/Datatable/ColumnHeader"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Inventory = {
  id: string
  name:string;
  qauntity:number;
  price:string;
  description:string;
}

type Category = {
  id: string
  name:string;
  description:string;
}

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "id",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Product Ref"} />
    },
    
  },
  {
    accessorKey: "name",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Product Name"} />
    },
  },
  {
    accessorKey: "price",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Unit Price"} />
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "quantity",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Quantity"} />
    },
  },
  {
    accessorKey: "description",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Description"} />
    },
  },
]


export const categorycolumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Category Ref"} />
    },
  },
  {
    accessorKey: "name",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Category Name"} />
    },
  },

  {
    accessorKey: "description",
    header: ({column})=>{
        return <DataTableColumnHeader column={column} title={"Description"} />
    },
  }

]
