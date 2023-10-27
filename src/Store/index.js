import { configureStore } from "@reduxjs/toolkit";
import prodectsSlice from "./slices/prodects-slice";
import cartSlice from "./slices/cartSlice";
import cartNav from "./slices/cartNav";
import authReducer from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";
export const store = configureStore({
  reducer:{
      prodects:prodectsSlice,
      cart : cartSlice,
      carNav:cartNav,
      auth:authReducer,
      dashbord:dashboardSlice,
  }
});
