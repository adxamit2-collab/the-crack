import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

interface CompareContextType {
  compareIds: string[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string, propertyTitle?: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  compareCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = 'vera_estates_compare';

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch (e) {
      console.error('Failed to save comparison to localStorage', e);
    }
  }, [compareIds]);

  const isInCompare = useCallback(
    (id: string) => compareIds.includes(id),
    [compareIds]
  );

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    setIsDrawerOpen(false);
  }, []);

  const toggleCompare = useCallback(
    (id: string, propertyTitle?: string) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) {
          showToast(
            propertyTitle ? `"${propertyTitle}" removed from comparison.` : 'Removed from comparison.',
            'info',
            'Comparison Updated'
          );
          return prev.filter((item) => item !== id);
        }

        if (prev.length >= 3) {
          showToast(
            'You can compare up to 3 properties simultaneously.',
            'error',
            'Comparison Limit'
          );
          return prev;
        }

        showToast(
          propertyTitle ? `"${propertyTitle}" added to comparison.` : 'Added to comparison.',
          'success',
          'Comparison Ready'
        );
        setIsDrawerOpen(true);
        return [...prev, id];
      });
    },
    [showToast]
  );

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        compareCount: compareIds.length,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
