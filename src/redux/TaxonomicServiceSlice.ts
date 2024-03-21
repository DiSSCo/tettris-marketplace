/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { TaxonomicService } from 'app/types/TaxonomicService';


export interface TaxonomicServiceState {
    taxonomicService?: TaxonomicService,
    taxonomicServices: TaxonomicService[]
};

const initialState: TaxonomicServiceState = {
    taxonomicService: undefined,
    taxonomicServices: []
};

export const ServiceSlice = createSlice({
    name: 'taxonomicService',
    initialState,
    reducers: {
        setTaxonomicService: (state, action: PayloadAction<TaxonomicService>) => {
            state.taxonomicService = action.payload;
        },
        setTaxonomicServices: (state, action: PayloadAction<TaxonomicService[]>) => {
            state.taxonomicServices = action.payload;
        }
    }
})

/* Action Creators */
export const {

} = ServiceSlice.actions;

/* Connect with Root State */
export const getTaxonomicService = (state: RootState) => state.taxonomicService.taxonomicService;
export const getTaxonomicServices = (state: RootState) => state.taxonomicService.taxonomicServices;

export default ServiceSlice.reducer;