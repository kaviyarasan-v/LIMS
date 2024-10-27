import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLaboratory, updateLaboratory } from '../redux/laboratorySlice';
import { useNavigate } from 'react-router-dom';
import { Laboratory, LaboratoryFormProps } from '../types';
import { RootState } from '../redux/store';
import './LaboratoryForm.css';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

const LaboratoryForm: React.FC<LaboratoryFormProps> = ({ initialData, isEditMode }) => {
    const laboratories =
        useSelector((state: RootState) => state.laboratories.laboratories);
    const [labData, setLabData] = useState<Laboratory>(initialData || {
        id: laboratories?.length + 1,
        name: '',
        city: '',
        cluster: '',
        availableEquipment: [''],
        fuelOilParameters: {
            viscosity: '',
            sulfurContent: '',
            waterContent: '',
            flashPoint: ''
        },
        status: 'Live'
    });

    const [validationErrors, setValidationErrors] =
        useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (field: string, value: string | string[]) => {
        setLabData({ ...labData, [field]: value });
        setValidationErrors({ ...validationErrors, [field]: '' });
    };

    const handleParameterChange = (parameter: string, value: string) => {
        if (parameter === 'viscosity') {
            const isValidNumber = /^\d*\.?\d*$/.test(value);
            if (!isValidNumber) return;
        }

        setLabData({
            ...labData,
            fuelOilParameters: { ...labData.fuelOilParameters, [parameter]: value }
        });
        setValidationErrors({ ...validationErrors, [parameter]: '' });
    };
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!labData.name) errors.name = 'Name is required';
        if (!labData.city) errors.city = 'City is required';
        if (!labData.cluster) errors.cluster = 'Cluster is required';
        if (!labData.fuelOilParameters.viscosity) errors.viscosity = 'Viscosity is required';
        if (!labData.fuelOilParameters.sulfurContent) errors.sulfurContent = 'Sulfur Content is required';
        if (!labData.fuelOilParameters.waterContent) errors.waterContent = 'Water Content is required';
        if (!labData.fuelOilParameters.flashPoint) errors.flashPoint = 'Flash Point is required';

        if (labData.availableEquipment.some(equip => equip.trim() === '')) {
            errors.availableEquipment = 'All equipment fields are required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            isEditMode ? dispatch(updateLaboratory(labData)) : dispatch(addLaboratory(labData));
            navigate('/');
        }
    };

    const handleEquipmentChange = (index: number, value: string) => {
        const updatedEquipment = [...labData.availableEquipment];
        updatedEquipment[index] = value;
        setLabData({ ...labData, availableEquipment: updatedEquipment });

        if (updatedEquipment.every(equip => equip.trim() !== '')) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, availableEquipment: '' }));
        }
    };

    const addEquipmentField = () => {
        setLabData({ ...labData, availableEquipment: [...labData.availableEquipment, ''] });
    };

    const removeEquipmentField = (index: number) => {
        const updatedEquipment = labData.availableEquipment.filter((_, i) => i !== index);
        setLabData({ ...labData, availableEquipment: updatedEquipment });
    };

    return (
        <div className='form-container'>
            <h1>{initialData ? `Edit ${initialData.name}` : 'Add Laboratory'}</h1>
            <form className="laboratory-form" onSubmit={handleSubmit}>
                <button className="back-button" onClick={() => navigate('/')}>
                    <FaArrowLeft /> Back
                </button>
                <div className="form-group">
                    <label>
                        Name <span className="required-symbol">*</span>
                    </label>
                    <input
                        type="text"
                        className='form-field'
                        value={labData.name}
                        onChange={e => handleChange('name', e.target.value)}
                    />
                    {validationErrors.name &&
                        <span className="error-text">
                            {validationErrors.name}
                        </span>
                    }
                </div>

                <div className="form-group">
                    <label>
                        City <span className="required-symbol">*</span>
                    </label>
                    <input
                        type="text"
                        className='form-field'
                        value={labData.city}
                        onChange={e => handleChange('city', e.target.value)}
                    />
                    {validationErrors.city &&
                        <span className="error-text">
                            {validationErrors.city}
                        </span>
                    }
                </div>

                <div className="form-group">
                    <label>Cluster <span className="required-symbol">*</span>
                    </label>
                    <input
                        type="text"
                        className='form-field'
                        value={labData.cluster}
                        onChange={e => handleChange('cluster', e.target.value)}
                    />
                    {validationErrors.cluster &&
                        <span className="error-text">
                            {validationErrors.cluster}
                        </span>
                    }
                </div>

                <div className="three-fields">
                    <div className="form-group">
                        <label>Equipment <span className="required-symbol">*</span>
                        </label>
                        {labData.availableEquipment.map((equipment, index) => (
                            <div key={index} className="equipment-row">
                                <input
                                    type="text"
                                    className="form-field equipment-field"
                                    value={equipment}
                                    onChange={e => handleEquipmentChange(index, e.target.value)}
                                    placeholder="Enter equipment name"
                                />
                                {index === labData.availableEquipment.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={addEquipmentField}
                                        className="icon-button"
                                    >
                                        <FaPlus />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => removeEquipmentField(index)}
                                        className="icon-button"
                                    >
                                        <FaMinus />
                                    </button>
                                )}
                            </div>
                        ))}
                        {validationErrors.availableEquipment &&
                            <span className="error-text">
                                {validationErrors.availableEquipment}
                            </span>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            Viscosity <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            className='form-field'
                            value={labData.fuelOilParameters.viscosity}
                            onChange={e => handleParameterChange('viscosity', e.target.value)}
                        />
                        {validationErrors.viscosity &&
                            <span className="error-text">
                                {validationErrors.viscosity}
                            </span>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            Sulfur Content <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            className='form-field'
                            value={labData.fuelOilParameters.sulfurContent}
                            onChange={e => handleParameterChange('sulfurContent', e.target.value)}
                        />
                        {validationErrors.sulfurContent &&
                            <span className="error-text">
                                {validationErrors.sulfurContent}
                            </span>
                        }
                    </div>
                </div>

                <div className="three-fields">
                    <div className="form-group">
                        <label>
                            Water Content <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            className='form-field'
                            value={labData.fuelOilParameters.waterContent}
                            onChange={e => handleParameterChange('waterContent', e.target.value)}
                        />
                        {validationErrors.waterContent &&
                            <span className="error-text">
                                {validationErrors.waterContent}
                            </span>
                        }
                    </div>
                    <div className="form-group">
                        <label>
                            Flash Point <span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            className='form-field'
                            value={labData.fuelOilParameters.flashPoint}
                            onChange={e => handleParameterChange('flashPoint', e.target.value)}
                        />
                        {validationErrors.flashPoint &&
                            <span className="error-text">
                                {validationErrors.flashPoint}
                            </span>
                        }
                    </div>
                    <div className="form-group">
                        <label>Status
                        </label>
                        <select
                            value={labData.status}
                            onChange={e => handleChange('status', e.target.value)}
                            className='form-field'
                        >
                            <option value="Live">Live</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Operational">Operational</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div className="button-group">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="save-button"
                    >
                        {isEditMode ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LaboratoryForm;
