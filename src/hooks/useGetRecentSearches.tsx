import { useCallback, useEffect, useState } from 'react';

import { useAddNewQuery } from '../services/searchQueries';
import { AddNewQueryRequest, SearchQuery } from '../types/searchQueries';

const LOCAL_SEARCH_HISTORY_KEY = 'LOCAL_SEARCH_HISTORY_KEY' as const;

interface RecentSearches {
  local: SearchQuery[];
  global: SearchQuery[];
}

const useGetRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearches>({
    local: [],
    global: [],
  });

  const { mutateAsync: addNewQuery } = useAddNewQuery();

  useEffect(() => {
    const localSearches = localStorage.getItem(LOCAL_SEARCH_HISTORY_KEY);
    if (localSearches) {
      setRecentSearches((p) => ({ ...p, local: JSON.parse(localSearches) }));
    }
  }, []);

  const handleAddNewQuery = useCallback(
    async (payload: AddNewQueryRequest) => {
      const addedQuery = await addNewQuery(payload);
      const updatedLocalSearches = recentSearches.local.concat(addedQuery);

      setRecentSearches((p) => ({ ...p, local: updatedLocalSearches }));
      localStorage.setItem(LOCAL_SEARCH_HISTORY_KEY, JSON.stringify(updatedLocalSearches));
    },
    [addNewQuery, recentSearches.local],
  );

  return {
    localSearches: recentSearches.local,
    globalSearches: recentSearches.global,
    handleAddNewQuery,
  };
};

export default useGetRecentSearches;
