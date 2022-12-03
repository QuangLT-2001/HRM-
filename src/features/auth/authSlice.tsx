import  {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"

import axios, { AxiosHeaders } from "axios";
import axiosClient from "./axiosClient";
export interface TAuthState  {
     lishMent?: string;
     typeContract?: string;
     status?: number |string|boolean;
     description?: string;
     id?: string | number ;
     createdAt ?: string | number|undefined,

}
export interface TLishMentState {
     id?: any;
     createdAt?: string|number;
     nameLishMent?: string;
     MST?: string|number;
     flagActive?: boolean;
     orgId?: string |number,
     nameAbb?:string,
     typeLishMent?: string,
     address?: string,
     userContact?: string,
     emailContact?:string,
     telContact?: string
}

export interface AuthState {
     contract?: TAuthState[],
     isLoading: boolean,
     lishMent?: TLishMentState[],
     lishMentDetail?: TLishMentState
}
const initialState: AuthState = {
     contract: [],
     lishMent: [],
     isLoading: false,
     lishMentDetail: {}
}
const BASE_URL = "https://622a9e9914ccb950d220ac3e.mockapi.io"
export let getContract = createAsyncThunk("contract/getContract", async (thunkApi) => {

     try {
          const url = thunkApi;



          const respon = await axiosClient.get(`/${url}`)
          return respon
     }catch(err) {}
})
export let deleteContract = createAsyncThunk("contract/deleteContract", async (params:any, thunkApi?:any) => {
     try {

          const respon = await axios.delete(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch (err) {}
})


export let postContract = createAsyncThunk("contract/postContract", async (params:any) => {
     try {
          const respon = await axios.post(`${BASE_URL}/${params.url}`, params.state)

          return respon
     }catch (err) {}
})
export let putContract = createAsyncThunk("contract/putContract", async(params:any) => {
     try {
          const respon = await axios.put(`${BASE_URL}/${params.url}/${params.state.id}`, params.state)


          return respon;
     }catch(err) {}
})
export let getLishMent = createAsyncThunk("lishMent/getLishMent", async(params:any) => {
    try {
     const respon = await axios.get(`${BASE_URL}/${params}`)
     return respon;
    }catch(err) {}
})


export let putLishMent = createAsyncThunk("lishMent/putLishMent", async(params:any) => {
     try {
          const respon = await axios.put(`${BASE_URL}/${params.url}/${params.state.id}`, params.state)


          return respon;
     }catch(err) {}
})

export let deleteLishMent = createAsyncThunk("lishMent/deleteLishMent", async (params:any, thunkApi?:any) => {
     try {

          const respon = await axios.delete(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch (err) {}
})

export let postLishMent = createAsyncThunk("lishMent/postLishMent", async (params:any) => {
     try {
          const respon = await axios.post(`${BASE_URL}/${params.url}`, params.state)

          return respon
     }catch (err) {}
})

export let getLishMentByCode = createAsyncThunk("lishMent/getLishmentByCode", async (params:any,thunkApi) => {

     try {

          const respon = await axiosClient.get(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch(err) {}
})


export const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
           getLstContract(state, {payload}) {
               state.contract = payload
          },

     },
     extraReducers(builder) {
          builder.addCase(getContract.pending, (state, action) => {
               state.isLoading = true
          })
          builder.addCase(getContract.fulfilled, (state, action) => {
               state.isLoading = false
               state.contract = action.payload?.data

          })
          builder.addCase(deleteContract.fulfilled, (state, action) => {
               state.isLoading = false
               let data = state.contract?.filter(item => item.id !== action.payload?.data.id)
               state.contract = data
             })
             builder.addCase(postContract.pending, (state, action) => {
                   state.isLoading = true

             })
             builder.addCase(postContract.fulfilled, (state, action) => {
               state.isLoading = false
               state.contract?.push(action.payload?.data)



         })
         builder.addCase(putContract.pending, (state, action) => {
               state.isLoading = true;
         })
         builder.addCase(putContract.fulfilled, (state, action) => {
          state.isLoading = false;
          const data = state.contract?.map(item => {
               if(item.id == action.payload?.data.id) {
                    return action.payload?.data
               }return item;
          })
          state.contract = data;
         })
         builder.addCase(getLishMent.pending, (state, action) => {
          state.isLoading = true
         })
         builder.addCase(getLishMent.fulfilled, (state , action) => {
               state.isLoading = false;
               state.lishMent = action.payload?.data;
         })


     builder.addCase(deleteLishMent.fulfilled, (state, action) => {
          state.isLoading = false
          let data = state.lishMent?.filter(item => item.id !== action.payload?.data.id)
          state.lishMent = data
        })

        builder.addCase(postLishMent.pending, (state, action) => {
          state.isLoading = true

    })
    builder.addCase(postLishMent.fulfilled, (state, action) => {
      state.isLoading = false
      state.lishMent?.push(action.payload?.data)



})
builder.addCase(getLishMentByCode.pending, (state, action) => {
     state.isLoading = true
})
builder.addCase(getLishMentByCode.fulfilled, (state, action) => {
     state.isLoading = false;
     state.lishMentDetail = action.payload?.data;
})


builder.addCase(putLishMent.fulfilled, (state, action) => {

const data = state.lishMent?.map(item => {
     if(item.id == action.payload?.data.id) {
          return action.payload?.data
     }return item;
})
state.lishMent = data;
})

     }

})





// action
export const authActions = authSlice.actions;

// reducer
const authReducer = authSlice.reducer;
export const selectContract = (state:any) => state.auth.contract
export const selectIsLoading = (state:any) => state.auth.isLoading
export const selectLishMent = (state:any) => state.auth.lishMent
export const selectLishMentDetail = (state:any) => state.auth.lishMentDetail
export default authReducer;
