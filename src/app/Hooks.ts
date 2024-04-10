/* Import Dependencies */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/* Import Types */
import type { RootState, AppDispatch } from './Store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;