import { createSlice } from '@reduxjs/toolkit'

const initialState={
    data:[],
    mylib:[],
    fav:"false",
};

const bookslice = createSlice({
    name:"book",
    initialState:initialState,
    reducers:{
        favourite:(state,action)=>{
            const product = state.data.find((item) => item.id === action.payload);
            const index=state.data.findIndex((item)=> item.id === action.payload.id);
            if (index !== -1) {
               
                state.data.splice(index,1);
                state.fav="false";
            } else {
                state.data.push(action.payload);
                state.fav="true";
              }
        
      },
      remove: (state,action)=>{
        const index=state.data.findIndex((item)=> item.id === action.payload)
        if(index!== -1){
          state.data.splice(index,1)
        }
      },
      libremove: (state,action)=>{
        const index=state.mylib.findIndex((item)=> item.id === action.payload)
        if(index!== -1){
          state.mylib.splice(index,1)
        }
      },
      mylibrary:(state,action)=>{
        const product = state.mylib.find((item) => item.id === action.payload.id);

        if (!product) {
            state.mylib.push(action.payload);
          }
    
  },
    },
});

export const { favourite,remove,mylibrary,libremove } = bookslice.actions;
export default bookslice.reducer;