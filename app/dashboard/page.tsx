import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCategory, getInventory, getInventoryCountByCategory, getOverview, getStockLevelByInterval } from "@/serveractions/inventoryactions"
import { Suspense } from "react"
import { DataTable } from "@/components/globals/Datatable/DataGrid"
import { categorycolumns, columns } from "./inventorycolumns"
import AddInventory from "@/components/inventory/AddInventory"
import EditInventory from "@/components/inventory/EditInventory"
import AddCategory from "@/components/inventory/AddCategory"
import EditCategory from "@/components/inventory/EditCategory"
import HighChart from "@/components/globals/Highchart/HighChart"
import StockLineChart from "@/components/inventory/StockLineChart"


export const dynamic = "force-dynamic"

export default async function Dashboard() {
  // fetch inventory and categories
  const inventory = await getInventory() || []
  const categories = await getCategory() || []
  const overview = await getOverview() || []
  const categoriescount = await getInventoryCountByCategory() || []
  const stockleveldata = await getStockLevelByInterval() || []


  inventory.sort((a: any, b: any) => b.id - a.id)

  console.log(stockleveldata)

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Categories'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.percentage:.1f}%'
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Inventory',
      data: categoriescount.map((category: any) => ({
        name: category.name, // Ensure this matches the key in your data
        y: parseInt(category.inventoryCount),
        sliced: true // Optionally highlight the first slice
      }))
    }]
  };

  return (

    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

      {/* inventory overview */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(parseFloat(overview?.totalInventoryValue))}</div>
            <p className="text-xs text-muted-foreground">

            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low stock items
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.lowStockItems}</div>

          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recently Added Inventory in the last hour</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.recentlyAddedItems}</div>
            <p className="text-xs text-muted-foreground">
              since the last hour
            </p>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Added Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview?.totalInventoryToday}</div>
            <p className="text-xs text-muted-foreground">
              today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full">     {/* holds inventory and category tabs */}
        <Tabs defaultValue="inventory" className="w-full">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="category">Category</TabsTrigger>

            </TabsList>
          </div>
          <TabsContent value="inventory" className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Card
                className="w-full" x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Inventory List</CardTitle>
                    <CardDescription>
                      Availble products in store
                    </CardDescription>
                  </div>
                  <div className="ml-auto gap-1">

                    <AddInventory categories={categories} />
                    <EditInventory categories={categories} />
                  </div>
                </CardHeader>
                <CardContent className="w-full">
                  <Suspense fallback="...loading">
                    <div className="md:w-full h-[400px]">
                      <DataTable data={inventory} columns={columns} title={"name"} page={"inventory"} />
                    </div>

                  </Suspense>
                </CardContent>
              </Card>

            </div>

            <div className="">
              <Card x-chunk="dashboard-01-chunk-5" className="shrink-0 h-[530px] flex-1">
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8 col-span-2">
                  <HighChart props={options} />

                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="category" className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Card
                className="" x-chunk="dashboard-01-chunk-4"
              >
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Category List</CardTitle>
                    <CardDescription>
                      various categories in store
                    </CardDescription>
                  </div>
                  <div className="ml-auto gap-1">

                    <AddCategory />
                    <EditCategory />
                  </div>
                </CardHeader>
                <CardContent className="w-full">
                  <Suspense fallback="...loading">
                    <div className="w-full">
                      <DataTable data={categories} columns={categorycolumns} title={"name"} page={"category"} />
                    </div>

                  </Suspense>
                </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </div>


      {/* line chart */}
      <div className="w-full shadow-md bg-white border p-4">
        <StockLineChart data={stockleveldata.length <= 0 ? stockleveldata : stockleveldata?.stockLevelsOverTime} />
      </div>
    </main>

  )
}


