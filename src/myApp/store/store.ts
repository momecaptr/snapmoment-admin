import {configureStore} from "@reduxjs/toolkit";
import {appSlice} from "@/myApp/store/appSlice/appSlice";

export const makeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    reducer: {
      app: appSlice,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']