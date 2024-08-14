import React, { useEffect, useState } from 'react';
import '../styles/retetapage.scss';
import { CookingPot, Eye, MessagesSquare, User, Heart } from 'lucide-react';
import { RecipeCardProps } from '../types/RecipeCardProps';
import HoverImage from './HoverImage';
import SocialSection from './SocialSection';
import { incrementRecipeViews } from '../redux/commentService';

interface RecipeDetailsProps {
  recipe: RecipeCardProps;
}

type DifficultyLevel = 'easy' | 'medium' | 'hard';

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const { id, steps: stepsString, ingredients: ingredientsString, type, title, options, servings, difficulty, price, kitchen, views, commentsCount, likes, prepTime, cookingTime, imageUrl, author } = recipe;

  const steps = JSON.parse(stepsString);
  const ingredients = JSON.parse(ingredientsString);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSocialSectionOpen, setIsSocialSectionOpen] = useState(false);

  useEffect(() => {
    incrementRecipeViews(id).catch(error => {
      console.error('Error incrementing views:', error);
    });
  }, [id]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const showBackButton = currentStep > 0;
  const showNextButton = currentStep < steps.length - 1;

  const isDifficultyLevel = (value: any): value is DifficultyLevel => {
    return ['easy', 'medium', 'hard'].includes(value);
  };

  const getDifficultyImagePath = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'easy':
        return '/easy.png';
      case 'medium':
        return '/medium.png';
      case 'hard':
        return '/hard.png';
      default:
        return '';
    }
  };

  const getOverlayImage = (options: string) => {
    switch (options) {
      case 'High-Protein':
        return '/protein.png';
      case 'Vegan':
        return '/vegan.png';
      case 'Balanced':
        return '/balanced.png';
      case 'Traditional':
        return '/traditional.png';
      default:
        return '/protein.png';
    }
  };

  const getOverlayType = (type: string) => {
    switch (type) {
      case 'fel principal':
        return '/maincourse.png';
      case 'salate':
        return '/salad.png';
      case 'supe':
        return '/supe.png';
      case 'gustare':
        return '/chips.png';
      case 'sushi':
        return '/sushi.png';
      case 'desert':
        return '/desert.png';
      default:
        return '/desert.png';
    }
  };

  const difficultyImage = isDifficultyLevel(difficulty) ? getDifficultyImagePath(difficulty) : '';
  const overlayImage = getOverlayImage(recipe.options);
  const overlayType = getOverlayType(recipe.type)

  const renderDollarTags = (price: number) => {
    const tags = [];
    for (let i = 0; i < price; i++) {
      tags.push(<img key={i} src='/price.png' alt='dollar tag' style={{ width: '20px' }} />);
    }
    return tags;
  };

  const toggleSocialSection = () => setIsSocialSectionOpen(!isSocialSectionOpen);
  return (
    <>
      <div className="page-box">
        <div className="reteta-page">
          <div className="image-containe">
            <div className="image-wrape bs">
              <img src={`${import.meta.env.VITE_API_BASE_URL}${imageUrl}`} alt="" className="recipeimg" />
            </div>
          </div>
          <div className="ingredients-container bd">
            <h3 className='listing'><img src="/ingredients.png" alt="" style={{ width: '50px' }} />INGREDIENTE</h3>
            <ul className="ingredients-list">
              {ingredients.map((ingredient: string) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="header bd">
            <h1 className="titlez">{title}</h1>
            <div className="chestii">
            <div className="type"><img src={overlayType} alt={type} style={{ width: '50px' }}/></div>
            <div className="optionnn"><img src={overlayImage} alt={options} style={{ width: '50px' }} /></div>
            </div>
          </div>
          <div className="options ">
            <div className="option-item"><img src="/person.png" alt="" style={{ width: '25px' }} />{servings}</div>
            <div className="option-item">
              {difficultyImage && <img src={difficultyImage} alt={`${difficulty} difficulty`} style={{ width: '30px' }} />}
            </div>
            <div className="option-item">
              {renderDollarTags(price)}
            </div>
            <div className="option-item">{kitchen}</div>
          </div>
          <div className="times">
            <div className="time-item bd"><img src='/prepare.png' alt='prepare' className="ic" /> <p>{prepTime} min</p></div>
            <div className="time-item bd"><img src='/cook.png' alt='cook' className="ic" /> <p>{cookingTime} min</p></div>
          </div>
          <div className="instructions-container bd">
            <h3 style={{ display: 'flex', alignItems: 'center' }}><img src="/instructions.png" alt="" style={{ width: '50px' }} />INSTRUCTIUNI DE PREPARARE:</h3>
            <div className="instructiuni">
              <div className="ins-text">
                <CookingPot className="icon" />
                <p>{steps[currentStep]}</p>
              </div>
              <div className="Step-nav">
                {showBackButton && (
                  <button className="ins-button" onClick={handlePreviousStep}>Inapoi</button>
                )}
                {showNextButton && (
                  <button className="ins-button" onClick={handleNextStep}>Urmatoarea &gt;</button>
                )}
              </div>
            </div>
          </div>
          <div className="menu-edit">
            <div className="icon-wrapper inapoi">
              <HoverImage
                key='1'
                defaultSrc='/backi.png'
                hoverSrc='/back.png'
                alt='like'
                action='navigate'
              />
            </div>
            <div className="like-print-share bd">
              <div className="icon-wrapper inima">
                <HoverImage
                  key='1'
                  defaultSrc='/hearti.png'
                  hoverSrc='/hearta.png'
                  alt='like'
                  action='switch'
                  switchSrc='/hearta.png'
                  recipeId={id}
                />
              </div>
              <div className="icon-wrapper printer">
                <HoverImage
                  key='2'
                  defaultSrc='/printerinactive.png'
                  hoverSrc='/printeractive.png'
                  alt='printer'
                  action='print'
                />
              </div>
              <div className="icon-wrapper share">
                <HoverImage
                  key='3'
                  defaultSrc='/sharei.png'
                  hoverSrc='/sharea.png'
                  alt='share'
                  action='share'
                />
              </div>
            </div>
          </div>
          <div className="social bd" onClick={toggleSocialSection}>
            <div className="views icn sc"><Eye className="icon" /> {views}</div>
            <div className="comments icn sc"><MessagesSquare className="icon" /> {commentsCount}</div>
            <div className="likes icn sc"><Heart className="icon" /> {likes}</div>
            <div className="username icn sc"><User className="icon" /> {author}</div>
          </div>
        </div>
        {isSocialSectionOpen && (
          <div className="social-wrapper">
            <SocialSection recipeId={id} commentsCount={commentsCount} likes={likes} />
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;


