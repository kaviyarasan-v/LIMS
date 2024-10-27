import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaboratoryListPage from './pages/LaboratoryListPage';
import LaboratoryDetailsPage from './pages/LaboratoryDetailsPage';
import LaboratoryForm from './components/LaboratoryForm';
import { useDispatch } from 'react-redux';
import { setLaboratories } from './redux/laboratorySlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/laboratories.json')
      .then(response => response.json())
      .then(data => dispatch(setLaboratories(data)));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaboratoryListPage />} />
        <Route path="/lab-details/:id" element={<LaboratoryDetailsPage />} />
        <Route path="/create-laboratory" element={<LaboratoryForm />} />
        <Route path="/edit-laboratory/:id" element={<LaboratoryForm isEditMode={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
