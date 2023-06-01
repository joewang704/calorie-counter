import { useEffect, useState } from "react";
import { StoredFood, getFoods } from "./db";

export const useFoods = () => {
  const [foods, setFoods] = useState<StoredFood[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [refetch, setRefetch] = useState<number>(0);

  const refetchFn = () => {
    setRefetch(refetch + 1);
    setLoading(true);
  }

  useEffect(() => {
    getFoods().then(foods => {
      setFoods(foods as StoredFood[]);
      setLoading(false);
    });
  }, [refetch]);

  return { foods, loading, refetch: refetchFn };
}