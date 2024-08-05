import { configureStore } from '@reduxjs/toolkit'
import { InventoryReducer } from './inventoryslices/inventoryslice'


export const store = configureStore({
  reducer: {
    inventory :InventoryReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch