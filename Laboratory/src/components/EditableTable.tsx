import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateLaboratory } from '../redux/laboratorySlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Laboratory } from '../types';

const EditableTable: React.FC = () => {
    const filteredLaboratories = useSelector(
        (state: RootState) => state.laboratories.filteredLaboratories);
    const dispatch = useDispatch();

    const [editId, setEditId] = useState<number | null>(null);
    const [editableLab, setEditableLab] = useState<Laboratory | null>(null);
    const [selectedParameter, setSelectedParameter] = useState<keyof Laboratory[
        'fuelOilParameters']>('viscosity');

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.ceil(filteredLaboratories.length / pageSize);

    const handleEdit = (lab: Laboratory) => {
        setEditId(lab.id);
        setEditableLab({ ...lab });
        setSelectedParameter('viscosity');
    };

    const handleSave = () => {
        if (editableLab) {
            dispatch(updateLaboratory(editableLab));
        }
        setEditId(null);
    };

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const sortedLaboratories = [...filteredLaboratories].sort((a, b) => b.id - a.id);
        return sortedLaboratories.slice(startIndex, startIndex + pageSize);
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleParameterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const parameter = e.target.value as keyof Laboratory['fuelOilParameters'];
        setSelectedParameter(parameter);
    };

    const getParameterValue = () => {
        return editableLab ? editableLab.fuelOilParameters[selectedParameter] : '';
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Cluster</th>
                        <th>Equipment</th>
                        <th>Fuel Oil Parameters</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPageItems().map((lab) => (
                        <tr key={lab.id} onDoubleClick={() => handleEdit(lab)}>
                            <td><Link to={`/lab-details/${lab.id}`}>{lab.name}</Link></td>
                            <td>{lab.city}</td>
                            <td>{lab.cluster}</td>
                            <td>{lab.availableEquipment.join(', ')}</td>
                            <td>
                                {editId === lab.id ? (
                                    <>
                                        <select value={selectedParameter} onChange={handleParameterChange}>
                                            {Object.keys(lab.fuelOilParameters).map(param => (
                                                <option key={param} value={param}>{param}</option>
                                            ))}
                                        </select>
                                        <input
                                            className="small-input"
                                            value={getParameterValue()}
                                            onChange={e =>
                                                setEditableLab({
                                                    ...editableLab!,
                                                    fuelOilParameters: {
                                                        ...editableLab!.fuelOilParameters,
                                                        [selectedParameter]: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                    </>
                                ) : (
                                    <div className="fuel-oil-parameters">
                                        <div className="parameter-list">
                                            {Object.entries(lab.fuelOilParameters).map(([key, value]) => (
                                                <div key={key} className="parameter-item">
                                                    <span className="parameter-label">{key}:</span>
                                                    <strong>{value}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </td>
                            <td>{lab.status}</td>
                            <td>
                                {editId === lab.id ? (
                                    <button className="button save" onClick={handleSave}>Save</button>
                                ) : (
                                    <button className="button edit" onClick={() => handleEdit(lab)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination-controls">
                <button
                    className="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default EditableTable;
