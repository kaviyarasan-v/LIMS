import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditableTable from '../components/EditableTable';
import FilterBar from '../components/FilterBar';
import { FaPlus } from 'react-icons/fa';

const LaboratoryListPage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/create-laboratory');
    };

    return (
        <div className="laboratory-list-page">
            <div className='space-between' style={{ alignItems: 'center' }}>
                <h1>Laboratory List</h1>
                <button onClick={handleCreateNew} className='btn'><FaPlus /> Laboratory</button>
            </div>
            <FilterBar />
            <EditableTable />
        </div>
    );
};

export default LaboratoryListPage;
