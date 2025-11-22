const validator = require('validator');

const validate = (params) => {
  // normalizar a string para evitar excepciones si vienen undefined/null
  const title = String(params.title || '').trim();
  const content = String(params.content || params.body || '').trim();
  const summary = String(params.summary || '').trim();

  // título: obligatorio, entre 3 y 150 caracteres
  if (validator.isEmpty(title) || !validator.isLength(title, { min: 3, max: 150 })) {
    throw new Error('Título no válido (3-150 caracteres).');
  }

  // contenido: obligatorio, mínimo razonable, máximo alto para permitir posts largos
  if (validator.isEmpty(content) || !validator.isLength(content, { min: 10, max: 5000 })) {
    throw new Error('Contenido no válido (10-5000 caracteres).');
  }

  // resumen opcional: si existe, limitar su tamaño
  if (summary && !validator.isLength(summary, { min: 0, max: 500 })) {
    throw new Error('Resumen demasiado largo (máx. 500 caracteres).');
  }

  // validación correcta
  return true;
};

module.exports = validate;