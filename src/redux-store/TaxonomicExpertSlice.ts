/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { TaxonomicExpert } from 'app/Types';


export interface TaxonomicExpertState {
    taxonomicExpert?: TaxonomicExpert,
    taxonomicExperts: TaxonomicExpert[]
};

const initialState: TaxonomicExpertState = {
    taxonomicExpert: undefined,
    taxonomicExperts: []
};

export const TaxonomicExpertSlice = createSlice({
    name: 'taxonomicExpert',
    initialState,
    reducers: {
        setTaxonomicExpert: (state, action: PayloadAction<TaxonomicExpert>) => {
            state.taxonomicExpert = action.payload;
        },
        setTaxonomicExperts: (state, action: PayloadAction<TaxonomicExpert[]>) => {
            state.taxonomicExperts = action.payload;
        },
        concatToTaxonomicExperts: (state, action: PayloadAction<TaxonomicExpert[]>) => {
            state.taxonomicExperts = state.taxonomicExperts.concat(action.payload);
            state.taxonomicExperts.sort((a, b) => a < b ? 1 : 0);
        }
    }
})

/* Action Creators */
export const {
    setTaxonomicExpert,
    setTaxonomicExperts,
    concatToTaxonomicExperts
} = TaxonomicExpertSlice.actions;

/* Connect with Root State */
export const getTaxonomicExpert = (state: RootState) => state.taxonomicExpert.taxonomicExpert;
export const getTaxonomicExperts = (state: RootState) => state.taxonomicExpert.taxonomicExperts;

export default TaxonomicExpertSlice.reducer;