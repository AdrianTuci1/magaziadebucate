import React, { useState, useEffect } from 'react';
import { RecipeCardProps } from '../types/RecipeCardProps';
import '../styles/retetaform.scss';

interface RecipeFormProps {
  onSubmit: (data: FormData) => void;
  initialData: RecipeCardProps;
}

// Separate Ingredient component
interface IngredientProps {
  ingredient: string;
  onRemove: () => void;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, onRemove }) => (
  <div className="ingredient-item">
    <span>{ingredient}</span>
    <button type="button" onClick={onRemove} className='smallbtn'>-</button>
  </div>
);

// Separate Step component
interface StepProps {
  stepNumber: number;
  content: string;
  onRemove: () => void;
}

const Step: React.FC<StepProps> = ({ stepNumber, content, onRemove }) => (
  <div className="step-item">
    <h4 style={{ width: '100px' }}>{stepNumber}</h4>
    <p>{content}</p>
    <button type="button" onClick={onRemove} className='smallbtn'>-</button>
  </div>
);

const RetetaForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<RecipeCardProps>(initialData);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState('');
  const [isPublic, setIsPublic] = useState<boolean>(initialData.isPublic);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialData.ingredients && typeof initialData.ingredients === 'string') {
      try {
        const parsedIngredients = JSON.parse(initialData.ingredients);
        setIngredients(parsedIngredients);
      } catch (error) {
        console.error('Error parsing ingredients:', error);
      }
    }
    if (initialData.steps && typeof initialData.steps === 'string') {
      try {
        const parsedSteps = JSON.parse(initialData.steps);
        setSteps(parsedSteps);
      } catch (error) {
        console.error('Error parsing steps:', error);
      }
    }
    if (initialData.imageUrl) {
      setImagePreviewUrl(`${import.meta.env.VITE_API_BASE_URL}${initialData.imageUrl}`);
    }
  }, [initialData]);

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep]);
      setNewStep('');
    }
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setFormData({ ...formData, imageUrl: '' });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalData = {
      ...formData,
      ingredients,
      steps,
      isPublic,
    };

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('data', JSON.stringify(finalData));
    if (selectedImage) {
      formDataToSubmit.append('image', selectedImage);
    }

    onSubmit(formDataToSubmit);
  };

  return (
    <form id="recipe-form" onSubmit={handleSubmit} className="recipe-form">
      <h2>{initialData.title ? 'Editeaza Reteta' : 'Adauga Reteta'}</h2>

      <label htmlFor="title">Nume reteta:</label>
      <input type="text" id="title" name="title" required value={formData.title} onChange={handleChange} />

      <label htmlFor="imageUrl">Image (optional):</label>
      {imagePreviewUrl && (
        <div className="image-preview">
          <img src={imagePreviewUrl} alt="Preview" />
          <button type="button" onClick={handleRemoveImage} style={{ width: '100px' }}>Sterge imaginea</button>
        </div>
      )}
      <input type="file" id="imageUrl" name="imageUrl" onChange={handleImageChange} />

      <label htmlFor="cookingTime">Timp de gatit:</label>
      <input type="range" id="cookingTime" name="cookingTime" min={0} max={120} step={5} required value={formData.cookingTime} onChange={handleChange} />
      <span>{formData.cookingTime} min</span>

      <label htmlFor="prepTime">Timp de preparare:</label>
      <input type="range" id="prepTime" name="prepTime" min={10} max={50} step={5} required value={formData.prepTime} onChange={handleChange} />
      <span>{formData.prepTime} min</span>

      <label htmlFor="options">Optiuni:</label>
      <select id="options" name="options" value={formData.options} onChange={handleChange}>
        <option value="Vegan">Vegan</option>
        <option value="High-Protein">Bogat in proteine</option>
        <option value="Balanced">Balansat</option>
        <option value="Traditional">Traditional</option>
      </select>

      <label htmlFor="type">Tip:</label>
      <select id="type" name="type" value={formData.type} onChange={handleChange}>
        <option value="fel principal">Fel Principal</option>
        <option value="gustare">Gustare</option>
        <option value="salate">Salate</option>
        <option value="supe">Supe</option>
        <option value="sushi">Sushi</option>
        <option value="desert">Desert</option>
      </select>

      <label htmlFor="servings">Portii:</label>
      <input type="number" id="servings" name="servings" min="1" required value={formData.servings} onChange={handleChange} />

      <label htmlFor="difficulty">Difficulty Level:</label>
      <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <label htmlFor="price">Pret:</label>
      <input type="range" id="price" name="price" min={1} max={4} step={1} value={formData.price} onChange={handleChange} />
      <span>{formData.price} $$$$</span>

      <label htmlFor="kitchen">Bucatarie:</label>
      <select id="kitchen" name="kitchen" value={formData.kitchen} onChange={handleChange}>
        <option value="romaneasca">Romaneasca</option>
        <option value="italiana">Italiana</option>
        <option value="spaniola">Spaniola</option>
        <option value="altele">Alta</option>
      </select>
      {formData.kitchen === 'altele' && (
        <input type="text" name="otherKitchen" value={formData.otherKitchen || ''} onChange={handleChange} placeholder="Introduceti bucataria" />
      )}

      <h3>Ingrediente</h3>
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <Ingredient key={index} ingredient={ingredient} onRemove={() => handleRemoveIngredient(index)} />
        ))}
      </div>
      <div className="add-item">
        <input type="text" value={newIngredient} onChange={(event) => setNewIngredient(event.target.value)} placeholder="Add Ingredient" />
        <button type="button" onClick={handleAddIngredient} className='smallbtn'>+</button>
      </div>

      <h3>Instructiuni</h3>
      <div className="steps-list">
        {steps.map((step, index) => (
          <Step key={index} stepNumber={index + 1} content={step} onRemove={() => handleRemoveStep(index)} />
        ))}
      </div>
      <div className="add-item">
        <input type="text" value={newStep} onChange={(event) => setNewStep(event.target.value)} placeholder="Add Step" />
        <button type="button" onClick={handleAddStep} className='smallbtn'>+</button>
      </div>

      <label htmlFor="isPublic">Vizibilitate:</label>
      <select value={isPublic ? 'true' : 'false'} onChange={(event) => setIsPublic(event.target.value === 'true')}>
        <option value="false">Private</option>
        <option value="true">Public</option>
      </select>

      <button type="submit">
        {initialData.title ? 'Editeaza Reteta' : 'Adauga Reteta'}
      </button>
    </form>
  );
};

export default RetetaForm;

