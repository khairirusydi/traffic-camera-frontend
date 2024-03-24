import { Card, CardBody, Heading, ListItem, UnorderedList } from '@chakra-ui/react';

import { SearchQuery } from '../../types/searchQueries';
import { formatDateTimeForDisplay } from '../../utils.ts/dateUtil';

interface SearchQueriesProps {
  localSearches: SearchQuery[];
  globalSearches: SearchQuery[];
}

const SearchQueries = ({ localSearches, globalSearches }: SearchQueriesProps) => (
  <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline" justify="space-between">
    {localSearches.length > 0 && (
      <CardBody>
        <Heading size="md" mb="2">
          Recent Searches
        </Heading>
        <UnorderedList>
          {localSearches.map((ls) => (
            <ListItem key={ls.id}>{`${formatDateTimeForDisplay(ls.selectedDate)} - ${ls.name}`}</ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    )}
    {globalSearches.length > 0 && (
      <CardBody>
        <Heading size="md" mb="2">
          What Others Are Viewing
        </Heading>
        <UnorderedList>
          {globalSearches.map((ls) => (
            <ListItem key={ls.id}>{`${formatDateTimeForDisplay(ls.selectedDate)} - ${ls.name}`}</ListItem>
          ))}
        </UnorderedList>
      </CardBody>
    )}
  </Card>
);

export default SearchQueries;
