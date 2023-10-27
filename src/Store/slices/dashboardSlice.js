import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../fierbase";


export const dashboardProducts = createAsyncThunk(
    "dashboardSlice/dashboardProducts",
    async () => {
      return new Promise((resolve, reject) => {
        const collRef = collection(db, "products");
        const orderedRef = query(collRef, orderBy("product.id", "desc"));
  
        const unsubscribe = onSnapshot(
          orderedRef,
          (snapshot) => {
            const  data = snapshot.docs.map((doc) => doc.data());
            unsubscribe(); // Unsubscribe when data is retrieved
            resolve(data);
          },
          (error) => {
            console.error("Error getting articles: ", error);
            unsubscribe(); // Unsubscribe on error
            reject(error);
          }
        );
      });
    }
    );
const dashboardSlice =createSlice({
    name:'dashboardSlice',
    initialState:{
        isloading:false,
        allProducts: [],
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(dashboardProducts.pending, (state,action) => {
            state.isloading=true;
          })
          builder.addCase(dashboardProducts.fulfilled, (state,action) => {
            state.isloading=false;
            state.allProducts=action.payload;
          })
        builder.addCase(dashboardProducts.rejected, (state,action) => {
            state.allProducts=action.payload;
            state.isloading=true;

          })
         
      },
    })
    export default dashboardSlice.reducer;