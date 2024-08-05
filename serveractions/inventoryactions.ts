"use server"

import { auth } from "@/auth";
import axios from "axios";

type User = {
    username: string;
    email: string;
    password: string;
}

export async function getInventory() {
    try {


        const session = await auth()


        if (session) {
            const res = await fetch(process.env.BASE_URL! + "getinventories", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                },
                next: { tags: ["inventories"] }

            })

            const data = await res.json()



            if (res.status === 200) {
                return data
            }

            return null
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        return e?.message
    }

}


export async function postInventory(data: {
    name: string,
    quantity: number,
    price: any;
    categoryid: any;
    description: string;
}) {
    try {


        const session = await auth()

        data.categoryid = parseInt(data.categoryid)

        console.log(data)

        if (session) {

            const res = await axios.post(process.env.BASE_URL! + "createinventory", { ...data }, {
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                }
            })

            console.log(res)

            if (res.status === 201) {
                return res.data
            }

            return {
                error: "error creating inventory"
            }
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        console.log(e?.message)
        return {
            error: e?.message
        }
    }

}
export async function updateInventory(data: {
    id: number,
    name: string,
    quantity: number,
    price: any;
    categoryid: any;
    description: string;
}) {
    try {


        const session = await auth()

        data.categoryid = parseInt(data?.categoryid)

        console.log(data)

        if (session) {

            const res = await axios.patch(process.env.BASE_URL! + `updateinventory/${data.id}`, {
                name: data.name,
                quantity: data.quantity,
                price: data.price,
                categoryid: data.categoryid,
                description: data.description
            }, {
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                }
            })

            console.log(res)

            if (res.status === 201) {
                return res.data
            }

            return {
                error: "error updating inventory"
            }
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        console.log(e?.message)
        return {
            error: e?.message
        }
    }

}

// global delete
export async function performDelete(id: number, page: string) {
    try {
        console.log(id, page)

        let url = ""
        page === "inventory" ? url = `deleteinventory/${id}` : url = `deletecategory/${id}`


        const session = await auth()
        if (session) {

            const res = await axios.delete(process.env.BASE_URL! + url, {
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                }
            })


            if (res.status === 204) {
                return res.data
            }

            return {
                error: "error deleting inventory"
            }
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        console.log(e?.message)
        return {
            error: e?.message
        }
    }

}




// category actions
export async function postCategory(data: {
    name: string,
    description: string;
}) {
    try {


        const session = await auth()

        if (session) {

            const res = await axios.post(process.env.BASE_URL! + "createcategory", { ...data }, {
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                }
            })


            if (res.status === 201) {
                return res.data
            }

            return {
                error: "error creating category"
            }
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        console.log(e?.message)
        return {
            error: e?.message
        }
    }

}
export async function updateCategory(data: {
    id: number,
    name: string,
    description: string;
}) {
    try {


        const session = await auth()

        if (session) {

            const res = await axios.patch(process.env.BASE_URL! + `updatecategory/${data.id}`, { 
                name:data.name,
                description:data.description
             }, {
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                }
            })


            if (res.status === 201) {
                return res.data
            }

            return {
                error: "error updating category"
            }
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        console.log(e?.message)
        return {
            error: e?.message
        }
    }

}


export async function getOverview() {
    try {


        const session = await auth()


        if (session) {
            const res = await fetch(process.env.BASE_URL! + "getdashboarddata", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                },
                next: { tags: ["dashboard"] }

            })

            const data = await res.json()



            if (res.status === 200) {
                return data
            }

            return null
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        return e?.message
    }

}


export async function getCategory() {
    try {


        const session = await auth()


        if (session) {
            const res = await fetch(process.env.BASE_URL! + "getcategories", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                },
                next: { tags: ["categories"] }
            })

            if (res.status === 200) {
                return await res.json()
            }

            return null
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        return e?.message
    }

}


export async function getInventoryCountByCategory() {
    try {


        const session = await auth()


        if (session) {
            const res = await fetch(process.env.BASE_URL! + "getinventoriescountbycategory", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                },
                next: { tags: ["categoriescount"] }
            })

            if (res.status === 200) {
                return await res.json()
            }

            return null
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        return e?.message
    }

}
export async function getStockLevelByInterval() {
    try {


        const session = await auth()


        if (session) {
            const res = await fetch(process.env.BASE_URL! + "fetchstocklevelsovertime?interval=day", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + session?.data?.access
                },
                
                next: { tags: ["stocklevel"] }
            })

            if (res.status === 200) {
                return await res.json()
            }

            return null
        } else {
            return {
                error: "session not available, please sign in"
            }
        }


    } catch (e: any) {
        return e?.message
    }

}
