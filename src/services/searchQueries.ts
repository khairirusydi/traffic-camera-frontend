import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { AddNewQueryRequest, GetRecentQueriesResponse, SearchQuery } from '../types/searchQueries';
import ApiClient from '../utils.ts/ApiClient';
import { TrafficEndpoints } from './traffic';

export const SearchQueriesEndpoints = {
  GET_RECENT_QUERIES: '/api/queries/recent-queries',
  ADD_NEW_QUERY: '/api/queries',
} as const;

export const addNewQuery = async (payload: AddNewQueryRequest) => {
  const { data } = await ApiClient.post<SearchQuery>(SearchQueriesEndpoints.ADD_NEW_QUERY, payload);
  return data;
};

export const useAddNewQuery = (onSuccess: (data: SearchQuery) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: AddNewQueryRequest) => addNewQuery(payload),
    onSuccess,
    onSettled: (searchQuery) => {
      if (searchQuery) {
        queryClient.invalidateQueries({ queryKey: [TrafficEndpoints.GET_TRAFFIC_IMAGES] });
        queryClient.invalidateQueries({ queryKey: [SearchQueriesEndpoints.GET_RECENT_QUERIES] });
      }
    },
  });
  return mutation;
};

const getRecentQueries = async (): Promise<SearchQuery[]> => {
  const { data } = await ApiClient.get<GetRecentQueriesResponse>(SearchQueriesEndpoints.GET_RECENT_QUERIES);

  return data.queries;
};

export const useGetRecentQueries = () => {
  const query = useQuery({
    queryKey: [SearchQueriesEndpoints.GET_RECENT_QUERIES],
    queryFn: () => getRecentQueries(),
  });

  return query;
};
