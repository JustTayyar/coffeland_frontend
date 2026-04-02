import { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const getStorageKey = (base) => `${base}_${user?.email || 'guest'}`;

  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const savedFavs = localStorage.getItem(getStorageKey('favorites'));
    const savedProds = localStorage.getItem(getStorageKey('favoriteProducts'));
    setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
    setFavoriteProducts(savedProds ? JSON.parse(savedProds) : []);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('favorites'), JSON.stringify(favorites));
  }, [favorites, user]);

  useEffect(() => {
    localStorage.setItem(getStorageKey('favoriteProducts'), JSON.stringify(favoriteProducts));
  }, [favoriteProducts, user]);

  const toggleFavorite = (id, product = null) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        setFavoriteProducts(fp => fp.filter(p => p.id !== id));
        return prev.filter(fId => fId !== id);
      }
      if (product) {
        setFavoriteProducts(fp => {
          if (!fp.find(p => p.id === id)) {
            return [...fp, { id: product.id, name: product.name, price: product.price, image: product.image_url }];
          }
          return fp;
        });
      }
      return [...prev, id];
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteProducts, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
