import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TmpState {
    no: number;
    id: string;
}

const initialState: TmpState = {
    no: 0,
    id: ''
}

const tmpSlice = createSlice({
    name: 'tmp',
    initialState: initialState,
    reducers: {
        setNo: (state, action: PayloadAction<number>) => {
            state.no = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
    }
});

export const { setNo, setId } = tmpSlice.actions;
export default tmpSlice.reducer;