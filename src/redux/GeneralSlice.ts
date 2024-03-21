/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


export interface GeneralState {};

const initialState: GeneralState = {};

export const GeneralSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {}
})

/* Action Creators */
export const {} = GeneralSlice.actions;

/* Connect with Root State */

export default GeneralSlice.reducer;