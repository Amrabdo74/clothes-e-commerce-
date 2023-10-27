// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "../../fierbase";

export const signUpAsync = createAsyncThunk("auth/signUp", async (userData, thunkAPI) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    await updateProfile(userCredential.user, { displayName: userData.username });
    // await signOut(auth);
    // const user = userCredential.user;
    // // localStorage.setItem("user", JSON.stringify(user));
    // return user.email;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logInAsync = createAsyncThunk("auth/logIn", async (userData, thunkAPI) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    // localStorage.setItem("user", JSON.stringify(user));
    return user.email;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOutAsync = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    localStorage.setItem("user", null);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const resetPasswordAsync = createAsyncThunk("auth/resetPassword", async (email, thunkAPI) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // return email;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
    fromToogle: false,
  },
  reducers: {
    fromSubit:(state,action) => {
       state.fromToogle=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logInAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(logInAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});


// Listen for changes in the user's authentication state
export const {fromSubit } = authSlice.actions;


export default authSlice.reducer;
