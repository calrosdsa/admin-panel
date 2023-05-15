import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// export const getRole = (state:RootState) =>state.auth.u
export const getUser = (state:RootState) => state.auth.user

// export const countSelector = createSelector(showSideBar, state => state);
