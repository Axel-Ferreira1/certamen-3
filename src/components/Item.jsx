import React from 'react';

function Item({ evaluacion, eliminarEvaluacion, editarEvaluacion }) {
  
  const getEstadoPromedio = (promedio) => {
    const p = parseFloat(promedio);
    if (p >= 1 && p <= 3.9) {
      return { texto: 'Deficiente', clase: 'deficiente' };
    }
    if (p >= 4.0 && p <= 5.5) {
      return { texto: 'Con Mejora', clase: 'con-mejora' };
    }
    if (p >= 5.6 && p <= 6.4) {
      return { texto: 'Buen Trabajo', clase: 'buen-trabajo' };
    }
    if (p >= 6.5 && p <= 7.0) {
      return { texto: 'Destacado', clase: 'destacado' };
    }
    return { texto: '', clase: '' };
  };

  const estado = getEstadoPromedio(evaluacion.promedio);

  return (
    <li className="evaluation-item">
      <div className="item-details">
        <p><strong>Alumno:</strong> {evaluacion.nombre}</p>
        <p><strong>Asignatura:</strong> {evaluacion.asignatura}</p>
        <p><strong>Promedio:</strong> {evaluacion.promedio}</p>
        {estado.texto && (
          <span className={`status-badge ${estado.clase}`}>{estado.texto}</span>
        )}
      </div>
      <div className="item-buttons">
        <button className="edit-btn" onClick={() => editarEvaluacion(evaluacion)}>Editar</button>
        <button className="delete-btn" onClick={() => eliminarEvaluacion(evaluacion.id)}>Eliminar</button>
      </div>
    </li>
  );
}

export default Item;