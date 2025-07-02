import React from 'react';

function EvaluacionList({ evaluaciones, deleteEvaluacion, editEvaluacion, getEscalaApreciacion }) {
  return (
    <div className="evaluacion-list">
      {evaluaciones.map((evaluacion) => (
        <div key={evaluacion.id} className="evaluacion-item">
          <p><strong>Alumno:</strong> {evaluacion.nombreAlumno}</p>
          <p><strong>Asignatura:</strong> {evaluacion.asignatura}</p>
          <p><strong>Promedio:</strong> {evaluacion.promedio.toFixed(1)}</p>
          <p className="escala-apreciacion">
            {getEscalaApreciacion(evaluacion.promedio)}
          </p>
          <div className="actions">
            <button className="edit-button" onClick={() => editEvaluacion(evaluacion)}>Editar</button>
            <button className="delete-button" onClick={() => deleteEvaluacion(evaluacion.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EvaluacionList;