import fetchWrapper from './fetchWrapper';
import { getAuthToken } from './storage';

export interface RecipeCardProps {
  id: string;
  // Add other properties as needed
}

export interface MealPlan {
  day: string;
  meals: (string | RecipeCardProps)[];
  nutrition: { carbs: number; protein: number; calories: number };
}

export interface AlimentaryPlan {
  name: string;
  isShared: boolean;
  cards: {
    day: number;
    lines: (string | RecipeCardProps)[];
  }[];
}

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/alimentaryPlans`;

const alimentaryPlanService = {
  createPlan: async (plan: AlimentaryPlan) => {
    try {
      const response = await fetchWrapper(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(plan)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to create plan:', error);
      throw error;
    }
  },

  getUserPlans: async () => {
    try {
      const response = await fetchWrapper(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch user plans:', error);
      throw error;
    }
  },

  sharePlan: async (planId: number) => {
    try {
      const response = await fetch(`${API_URL}/${planId}/share`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to share plan:', error);
      throw error;
    }
  },

  addCard: async (planId: number, card: { day: number; lines: (string | RecipeCardProps)[] }) => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ planId, ...card })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to add card:', error);
      throw error;
    }
  },

  getCards: async (planId: number) => {
    try {
      const response = await fetch(`${API_URL}/${planId}/cards`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch cards:', error);
      throw error;
    }
  },

  getPlan: async (planId: string) => {
    try {
      const response = await fetch(`${API_URL}/${planId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const plan = await response.json();

      // Fetch related cards
      const cardsResponse = await fetch(`${API_URL}/${planId}/cards`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!cardsResponse.ok) {
        throw new Error(`Failed to fetch cards for plan with ID ${planId}`);
      }

      const cards = await cardsResponse.json();
      console.log(cards)

      // Parse lines as JSON
      const enrichedCards = cards.map((card: any) => ({
        ...card,
        lines: typeof card.lines === 'string' ? JSON.parse(card.lines) : card.lines
      }));

      return { ...plan, cards: enrichedCards };
    } catch (error) {
      console.error('Failed to fetch plan:', error);
      throw error;
    }
  },

  updatePlan: async (planId: string, plan: AlimentaryPlan) => {
    try {
      const response = await fetchWrapper(`${API_URL}/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(plan)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update plan:', error);
      throw error;
    }
  },

  removePlan: async (planId: string) => {
    try {
      const response = await fetch(`${API_URL}/${planId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to remove plan:', error);
      throw error;
    }
  },
};

export default alimentaryPlanService;
