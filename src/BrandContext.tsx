import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Brand } from './types';
import { MOCK_BRANDS } from './mockData';

interface BrandContextType {
  currentBrand: Brand;
  setCurrentBrand: (brand: Brand) => void;
  brands: Brand[];
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: ReactNode }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand>(MOCK_BRANDS[0]);

  return (
    <BrandContext.Provider value={{ currentBrand, setCurrentBrand, brands: MOCK_BRANDS }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) throw new Error('useBrand must be used within a BrandProvider');
  return context;
};
