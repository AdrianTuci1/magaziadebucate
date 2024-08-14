import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthUser } from '../redux/storage';
import { addFavorite, removeFavorite, isRecipeLikedByUser } from '../redux/favoriteService';
import '../styles/hoverimage.scss';
import toast from 'react-hot-toast';

interface HoverImageProps {
  defaultSrc: string;
  hoverSrc: string;
  alt: string;
  action: 'navigate' | 'switch' | 'print' | 'share';
  route?: string; // Optional route for navigation
  switchSrc?: string;
  recipeId?: string; // ID of the recipe
}

const HoverImage: React.FC<HoverImageProps> = ({
  defaultSrc,
  hoverSrc,
  alt,
  action,
  switchSrc,
  recipeId
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false); // State for favorite/unfavorite
  const [userId, setUserId] = useState<string | null>(null); // State for userId

  const navigate = useNavigate();

  useEffect(() => {
    const user = getAuthUser();
    if (user && user.id && recipeId) {
      setUserId(user.id);
      // Check if the recipe is liked by the user
      isRecipeLikedByUser(user.id, recipeId).then(({ liked }) => {
        setIsFavorited(liked);
        setIsSwitched(liked); // Ensure the switchSrc is shown if favorited
      }).catch(error => {
        console.error('Error checking if recipe is liked by user:', error);
      });
    }
  }, [recipeId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = async () => {
    switch (action) {
      case 'navigate':
          navigate(-1);
        break;
      case 'switch':
        if (switchSrc) {
          if(!userId){
            toast("Trebuie sa fii inregistrat pentru a putea adauga la favorite!")
          }
          if (recipeId && userId) {
            try {
              if (isFavorited) {
                await removeFavorite(userId, recipeId);
                setIsFavorited(false);
                setIsSwitched(false); // Update switch state
              } else {
                await addFavorite(recipeId, userId);
                setIsFavorited(true);
                setIsSwitched(true); // Update switch state
              }
            } catch (error) {
              console.error('Error toggling favorite:', error);
            }
          }
        }
        break;
      case 'print':
        window.open('URL_TO_PRINT_PAGE', '_blank', 'width=600,height=400');
        break;
      case 'share':
        window.open('URL_TO_SHARE_PAGE', '_blank', 'width=600,height=400');
        break;
      default:
        break;
    }
  };

  return (
    <img
      src={isSwitched ? switchSrc : (isHovered ? hoverSrc : defaultSrc)}
      alt={alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="hover-image"
    />
  );
};

export default HoverImage;




