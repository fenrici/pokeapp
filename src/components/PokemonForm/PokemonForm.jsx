import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemon, POKEMON_TYPES } from '../../context/PokemonContext';
import '../../styles/PokemonForm.css';

function PokemonForm() {
  const navigate = useNavigate();
  const { addPokemon } = usePokemon();
  
  // Estado inicial del formulario usando el ejemplo de clase
  const [values, setValues] = useState({
    id: '',
    name: '',
    image: '',
    typeOne: '',
    typeTwo: ''
  });

  // Estado para manejar errores
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejador de cambios usando el ejemplo de clase
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};

    if (!values.id) {
      newErrors.id = 'El ID es requerido';
    } else if (isNaN(values.id) || parseInt(values.id) <= 0) {
      newErrors.id = 'El ID debe ser un número positivo';
    }

    if (!values.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (values.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!values.image) {
      newErrors.image = 'La URL de la imagen es requerida';
    }

    if (!values.typeOne) {
      newErrors.typeOne = 'El tipo primario es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      await addPokemon({
        id: parseInt(values.id),
        name: values.name.toLowerCase(),
        image: values.image,
        typeOne: values.typeOne,
        typeTwo: values.typeTwo || null
      });
      navigate('/');
    } catch {
      setErrors({ submit: 'Error al crear el Pokemon' });
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="form-label required">ID</label>
          <input
            type="number"
            name="id"
            value={values.id}
            onChange={handleChange}
            className={`form-input ${errors.id ? 'error' : ''}`}
          />
          {errors.id && <span className="error-message">{errors.id}</span>}
        </div>

        <div className="form-control">
          <label className="form-label required">Nombre</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-control">
          <label className="form-label required">URL de la Imagen</label>
          <input
            type="text"
            name="image"
            value={values.image}
            onChange={handleChange}
            className={`form-input ${errors.image ? 'error' : ''}`}
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        <div className="form-control">
          <label className="form-label required">Tipo Primario</label>
          <select
            name="typeOne"
            value={values.typeOne}
            onChange={handleChange}
            className={`form-select ${errors.typeOne ? 'error' : ''}`}
          >
            <option value="">Selecciona un tipo</option>
            {POKEMON_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.typeOne && <span className="error-message">{errors.typeOne}</span>}
        </div>

        <div className="form-control">
          <label className="form-label">Tipo Secundario (Opcional)</label>
          <select
            name="typeTwo"
            value={values.typeTwo}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Selecciona un tipo</option>
            {POKEMON_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {errors.submit && (
          <div className="error-message submit-error">
            {errors.submit}
          </div>
        )}

        <button 
          type="submit" 
          className="form-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...' : 'Crear Pokemon'}
        </button>
      </form>
    </div>
  );
}

export default PokemonForm; 