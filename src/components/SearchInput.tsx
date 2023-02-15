import React from "react";
import styled from "styled-components";

interface SearchInputProps {
  searchQuery: string;
  handleSetSearchQuery: (search: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  handleSetSearchQuery,
}) => {
  return (
    <StyledSearchInputContainer>
      <StyledSearchInput
        type="text"
        name="search"
        id="search"
        placeholder="Search books"
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          handleSetSearchQuery(target.value);
        }}
        value={searchQuery}
      />
    </StyledSearchInputContainer>
  );
};

const StyledSearchInputContainer = styled.div`
  padding: 1rem 1rem 0;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  font-size: 2rem;
  margin-bottom: 10px;
  border: 0;
  border-bottom: 1px solid #cccccc;
  padding: 0.3rem 0;
  outline: none;
  &:focus {
    border-bottom: 1px solid #333333;
  }
`;

export default SearchInput;
