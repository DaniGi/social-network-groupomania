import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
});

const SearchContextProvider = (props) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {props.children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchContextProvider;
