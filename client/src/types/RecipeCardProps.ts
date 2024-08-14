export interface RecipeCardProps {
    // Define the data you want to pass to the component
    id:             string;
    title:          string; // Titlu
    imageUrl?:      string; // Optional image URL
    cookingTime:    string; // Time for cooking (timp preparare, timp gatit)
    prepTime:       string;
    type:           string; // Vegan/Pui/Porc/Peste
    options:        string; // Dimineata/Pranz/Seara/Gustare
    servings:       number; // Numar de portii
    difficulty:     string; // Difficulty level
    price:          number; // 1-4 $$$$
    kitchen:        string; // Romaneasca, Italiana, Spaniola...
    otherKitchen?:  string;
    ingredients:    string; // 400gr Pui, 1/2 linguri sare, 1 ou
    steps:          string; // se prajesc cartofii, se pune puiul pe grill
    author:         string;
    likes:          number; 
    views:          number;
    commentsCount:  number;
    userId:         string;
    isPublic:       boolean;
    approved:       boolean;
  }