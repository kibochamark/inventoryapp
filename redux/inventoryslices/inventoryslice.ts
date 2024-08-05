import { createSlice } from "@reduxjs/toolkit";

type Inventory={
    isedit:boolean,
    delete:boolean,
    editdata:any /// will be used globally
    page:string;
}



const initialState:Inventory={
    isedit: false,
    editdata: {},
    page: "",
    delete:false
}


const InventorySlice=createSlice({
    name:"Inventory",
    initialState,
    reducers:{
        setEdit: (state,action)=>{
            state.isedit=action.payload.edit
            state.editdata=action.payload.editdata
            state.page=action.payload.page
        },
        setDelete: (state,action)=>{
            state.delete=action.payload.delete
            state.editdata=action.payload.editdata
            state.page=action.payload.page
        }
    }
})


export const {setEdit,setDelete}=InventorySlice.actions
export const InventoryReducer=InventorySlice.reducer