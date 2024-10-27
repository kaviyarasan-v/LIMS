import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Laboratory, LabsState } from '../types';

const initialState: LabsState = {
    laboratories: [],
    filteredLaboratories: [],
    filterCriteria: {
        global: '',
        city: '',
        cluster: '',
        status: ''
    }
};

const laboratorySlice = createSlice({
    name: 'laboratories',
    initialState,
    reducers: {
        setLaboratories(state, action: PayloadAction<Laboratory[]>) {
            state.laboratories = action.payload;
            state.filteredLaboratories = action.payload;
        },
        addLaboratory(state, action: PayloadAction<Laboratory>) {
            state.laboratories.push(action.payload);
            state.filteredLaboratories.push(action.payload);
        },
        updateLaboratory(state, action: PayloadAction<Laboratory>) {
            const index = state.laboratories.findIndex(lab => lab.id === action.payload.id);
            if (index !== -1) {
                state.laboratories[index] = action.payload;
                state.filteredLaboratories[index] = action.payload;
            }
        },
        deleteLaboratory(state, action: PayloadAction<number>) {
            state.laboratories = state.laboratories.filter(lab => lab.id !== action.payload);
            state.filteredLaboratories = state.filteredLaboratories.filter(
                lab => lab.id !== action.payload);
        },
        setFilterCriteria(state, action: PayloadAction<Partial<LabsState['filterCriteria']>>) {
            state.filterCriteria = { ...state.filterCriteria, ...action.payload };
        },
        applyFilters(state) {
            const { global, city, cluster, status } = state.filterCriteria;

            state.filteredLaboratories = state.laboratories.filter((lab) => {
                const matchesGlobal =
                    global ? lab.name.toLowerCase().includes(global.toLowerCase()) : true;
                const matchesCity = city ? lab.city === city : true;
                const matchesCluster = cluster ? lab.cluster === cluster : true;
                const matchesStatus = status ? lab.status === status : true;

                return matchesGlobal && matchesCity && matchesCluster && matchesStatus;
            });
        },
        resetFilters(state) {
            state.filterCriteria = { global: '', city: '', cluster: '', status: '' };
            state.filteredLaboratories = [...state.laboratories];
        },
    }
});

export const {
    setLaboratories,
    addLaboratory,
    updateLaboratory,
    deleteLaboratory,
    setFilterCriteria,
    applyFilters,
    resetFilters,
} = laboratorySlice.actions;
export default laboratorySlice.reducer;
