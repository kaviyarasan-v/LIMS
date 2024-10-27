import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCriteria, applyFilters } from '../redux/laboratorySlice';
import { RootState } from '../redux/store';

const FilterBar: React.FC = () => {
    const dispatch = useDispatch();
    const labs = useSelector((state: RootState) => state.laboratories.laboratories);

    const [filters, setFilters] = useState({
        global: '',
        city: '',
        cluster: '',
        status: '',
    });

    useEffect(() => {
        dispatch(setFilterCriteria(filters));
        dispatch(applyFilters());
    }, [filters, dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGlobal = e.target.value;
        setFilters(prevFilters => ({ ...prevFilters, global: newGlobal }));
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCity = e.target.value;
        setFilters(prevFilters => ({ ...prevFilters, city: newCity }));
    };

    const handleClusterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCluster = e.target.value;
        setFilters(prevFilters => ({ ...prevFilters, cluster: newCluster }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setFilters(prevFilters => ({ ...prevFilters, status: newStatus }));
    };

    return (
        <div className="filter-bar space-between">
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={filters.global}
                    onChange={handleSearchChange}
                />
            </div>
            <div>
                <select value={filters.city} onChange={handleCityChange}>
                    <option value="">All Cities</option>
                    {Array.from(new Set(labs.map(lab => lab.city))).map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <select value={filters.cluster} onChange={handleClusterChange}>
                    <option value="">All Clusters</option>
                    {Array.from(new Set(labs.map(lab => lab.cluster))).map((cluster) => (
                        <option key={cluster} value={cluster}>{cluster}</option>
                    ))}
                </select>
                <select value={filters.status} onChange={handleStatusChange}>
                    <option value="">All Status</option>
                    {Array.from(new Set(labs.map(lab => lab.status))).map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
