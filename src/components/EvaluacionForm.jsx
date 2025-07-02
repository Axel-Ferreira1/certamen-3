import React, { useState, useEffect } from 'react';

function EvaluacionForm({ addOrUpdateEvaluacion, evaluacionToEdit }) {
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');
  const [error, setError] = useState('');

  // Cargar datos si se está editando una evaluación
  useEffect(() => {
    if (evaluacionToEdit) {
      setNombreAlumno(evaluacionToEdit.nombreAlumno);
      setAsignatura(evaluacionToEdit.asignatura);
      setPromedio(evaluacionToEdit.promedio.toString());
    } else {
      // Limpiar formulario cuando no se está editando
      setNombreAlumno('');
      setAsignatura('');
      setPromedio('');
    }
  }, [evaluacionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validación básica de campos
    if (!nombreAlumno || !asignatura || !promedio) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const promedioNum = parseFloat(promedio);
    if (isNaN(promedioNum) || promedioNum < 0 || promedioNum > 7.0) {
      setError('El promedio debe ser un número entre 0.0 y 7.0.');
      return;
    }

    const nuevaEvaluacion = {
      id: evaluacionToEdit ? evaluacionToEdit.id : Date.now(), // Usa el ID existente si es edición
      nombreAlumno,
      asignatura,
      promedio: promedioNum,
    };

    addOrUpdateEvaluacion(nuevaEvaluacion);
    // Limpiar el formulario después de agregar/actualizar
    setNombreAlumno('');
    setAsignatura('');
    setPromedio('');
  };

  return (
    <form onSubmit={handleSubmit} className="evaluacion-form">
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="nombreAlumno">Nombre del Alumno:</label>
        <input
          type="text"
          id="nombreAlumno"
          placeholder="Ej: Juan Pérez"
          value={nombreAlumno}
          onChange={(e) => setNombreAlumno(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="asignatura">Asignatura:</label>
        <input
          type="text"
          id="asignatura"
          placeholder="Ej: Matemáticas"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="promedio">Promedio (0.0 - 7.0):</label>
        <input
          type="number"
          id="promedio"
          step="0.1"
          placeholder="Ej: 5.5"
          value={promedio}
          onChange={(e) => setPromedio(e.target.value)}
        />
      </div>
      <button type="submit">
        {evaluacionToEdit ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
    </form>
  );
}

export default EvaluacionForm;