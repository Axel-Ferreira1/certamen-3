import React, { useState, useEffect } from 'react';
import EvaluacionForm from './components/EvaluacionForm';
import EvaluacionList from './components/EvaluacionList';

function App() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [evaluacionToEdit, setEvaluacionToEdit] = useState(null);

  
  useEffect(() => {
    const storedEvaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
    setEvaluaciones(storedEvaluaciones);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  const addOrUpdateEvaluacion = (evaluacion) => {
    if (evaluacionToEdit) {
      
      setEvaluaciones(evaluaciones.map((evaluacionItem) =>
        evaluacionItem.id === evaluacion.id ? evaluacion : evaluacionItem
      ));
      setEvaluacionToEdit(null); 
    } else {
      
      setEvaluaciones([...evaluaciones, { ...evaluacion, id: Date.now() }]);
    }
  };

  const deleteEvaluacion = (id) => {
    setEvaluaciones(evaluaciones.filter((evaluacion) => evaluacion.id !== id));
  };

  const editEvaluacion = (evaluacion) => {
    setEvaluacionToEdit(evaluacion);
  };

  
  const getEscalaApreciacion = (promedio) => {
    if (promedio >= 1.0 && promedio <= 3.9) {
      return 'Deficiente';
    } else if (promedio >= 4.0 && promedio <= 5.5) {
      return 'Con mejora';
    } else if (promedio >= 5.6 && promedio <= 6.4) {
      return 'Buen trabajo';
    } else if (promedio >= 6.5 && promedio <= 7.0) {
      return 'Destacado';
    }
    return 'N/A'; 
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Evaluación de Alumnos</h1>
      <div className="form-section">
        <h2>{evaluacionToEdit ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}</h2>
        <EvaluacionForm
          addOrUpdateEvaluacion={addOrUpdateEvaluacion}
          evaluacionToEdit={evaluacionToEdit}
        />
      </div>
      <div className="list-section">
        <h2>Evaluaciones Guardadas</h2>
        {evaluaciones.length === 0 ? (
          <p>No hay evaluaciones guardadas aún. ¡Agrega una!</p>
        ) : (
          <EvaluacionList
            evaluaciones={evaluaciones}
            deleteEvaluacion={deleteEvaluacion}
            editEvaluacion={editEvaluacion}
            getEscalaApreciacion={getEscalaApreciacion}
          />
        )}
      </div>
    </div>
  );
}

export default App;