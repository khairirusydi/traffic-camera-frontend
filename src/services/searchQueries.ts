import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddNewQueryRequest, SearchQuery } from '../types/searchQueries';
import ApiClient from '../utils.ts/ApiClient';
import { TrafficEndpoints } from './traffic';

export const SearchQueriesEndpoints = {
  ADD_NEW_QUERY: '/api/queries',
} as const;

export const addNewQuery = async (payload: AddNewQueryRequest) => {
  const { data } = await ApiClient.post<SearchQuery>(SearchQueriesEndpoints.ADD_NEW_QUERY, payload);
  return data;
};

export const useAddNewQuery = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: AddNewQueryRequest) => addNewQuery(payload),
    onSettled: (searchQuery) => {
      if (searchQuery) {
        queryClient.invalidateQueries({ queryKey: [TrafficEndpoints.GET_TRAFFIC_IMAGES] });
      }
    },
  });
  return mutation;
};
