/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


export interface AppState {
    isApiOnline: boolean
};

const initialState: AppState = {
    isApiOnline: true
};

export const TaxonomicSlice = createSlice({
    name: 'taxonomicService',
    initialState,
    reducers: {
        setIsApiOnline: (state, action: PayloadAction<boolean>) => {
            state.isApiOnline = action.payload;
        }
    }
}) && createSlice({
    name: 'taxonomicExpert',
    initialState,
    reducers: {
        setIsApiOnline: (state, action: PayloadAction<boolean>) => {
            state.isApiOnline = action.payload;
        }
    }
})

/* Action Creators */
export const {
    setIsApiOnline
} = TaxonomicSlice.actions;

/* Connect with Root State */
export const getIsApiOnline = (state: RootState) => state.app.isApiOnline;

export default TaxonomicSlice.reducer;
