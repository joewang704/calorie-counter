import { ReactNode, createContext, useContext } from 'react';

import { useFoods } from 'utils/food';
import { StoredFood } from 'utils/db';

type FoodsContext = {
  foods: StoredFood[] | undefined;
  loading: boolean;
  refetch: () => void;
}

const initialState: FoodsContext = {
  foods: [],
  loading: true,
  refetch: () => {},
};

export const FoodsContext = createContext<FoodsContext>(initialState);

export const useFoodsContext = () => useContext(FoodsContext);

export const FoodsProvider = ({ children }: { children: ReactNode }) => {
  const { foods, loading, refetch } = useFoods();

  return (
    <FoodsContext.Provider value={{
      foods,
      loading,
      refetch,
    }}>
      {children}
    </FoodsContext.Provider>
  );
}