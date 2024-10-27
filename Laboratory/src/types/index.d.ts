export type FuelOilParameters = {
    viscosity: string;
    sulfurContent: string;
    waterContent: string;
    flashPoint: string;
    [key: string]: string;
};

export type Laboratory = {
    id: number;
    name: string;
    city: string;
    cluster: string;
    availableEquipment: string[];
    fuelOilParameters: FuelOilParameters;
    status: string;
};

export interface LabsState {
    laboratories: Laboratory[];
    filteredLaboratories: Laboratory[];
    filterCriteria: {
        global: string;
        city?: string;
        cluster?: string,
        status?: string;
    };
}

export interface LaboratoryFormProps {
    initialData?: Laboratory;
    isEditMode?: boolean;
}
