import React from 'react'

const SearchContext = React.createContext({
  userInput: 'a',
  clickedSearchButton: () => {},
})
export default SearchContext
