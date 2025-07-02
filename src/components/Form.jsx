import React, { useState, useEffect } from 'react';

function Form({ agregarOActualizarEvaluacion, evaluacionAEditar }) {
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');

  useEffect(() => {
    if (evaluacionAEditar) {
      setNombre(evaluacionAEditar.nombre);
      setAsignatura(evaluacionAEditar.asignatura);
      setPromedio(evaluacionAEditar.promedio);
    } else {
      setNombre('');
      setAsignatura('');
      setPromedio('');
    }
  }, [evaluacionAEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && asignatura.trim() && promedio.trim()) {
      agregarOActualizarEvaluacion({ nombre, asignatura, promedio });
      setNombre('');
      setAsignatura('');
      setPromedio('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="evaluation-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre del Alumno:</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Benjamin Gonzalez"
        />
      </div>
      <div className="form-group">
        <label htmlFor="asignatura">Asignatura:</label>
        <input
          id="asignatura"
          type="text"
          value={asignatura}
          onChange={(e) => setAsignatura(e.target.value)}
          placeholder="Ej: Programacion"
        />
      </div>
      <div className="form-group">
        <label htmlFor="promedio">Promedio (0.0 - 7.0):</label>
        <input
          id="promedio"
          type="number"
          step="0.1"
          min="0"
          max="7"
          value={promedio}
          onChange={(e) => setPromedio(e.target.value)}
          placeholder="Ej: 5.5"
        />
      </div>
      <button type="submit">
        {evaluacionAEditar ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
    </form>
  );
}

export default Form;