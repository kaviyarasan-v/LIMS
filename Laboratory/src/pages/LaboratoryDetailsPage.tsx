import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LaboratoryForm from '../components/LaboratoryForm';

const LaboratoryDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const laboratory = useSelector((state: RootState) =>
        state.laboratories.laboratories.find(lab => lab.id === Number(id))
    );

    return (
        <div>
            {laboratory && <LaboratoryForm initialData={laboratory} isEditMode />}
        </div>
    );
};

export default LaboratoryDetailsPage;
