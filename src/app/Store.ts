/* Import Dependencies */
import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

/* Import Redux Slices */
import AppServiceReducer from '../redux-store/AppStore';
import TaxonomicServiceReducer from '../redux-store/TaxonomicServiceSlice';


const rootReducer = combineReducers({
    app: AppServiceReducer,
    taxonomicService: TaxonomicServiceReducer
});

export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;