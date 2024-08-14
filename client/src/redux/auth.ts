// src/utils/auth.ts
export const isTokenExpired = (token: string): boolean => {
    if (!token) return true;
    
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
  
    return decodedPayload.exp < currentTime;
  };
  