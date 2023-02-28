import authSlice from "./slices/auth-slice";
import {configureStore} from '@reduxjs/toolkit';
import uiSlice from "./slices/ui-slice";
import splashSlice from "./slices/splash-slice";
import dashboardSlice from "./slices/dashboard-slice";
import userSlice from "./slices/user-slice";

const store = configureStore(
    {
        reducer:{
            auth:authSlice.reducer,
            ui:uiSlice.reducer,
            splash:splashSlice.reducer,
            dashboard:dashboardSlice.reducer,
            user:userSlice.reducer,
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store