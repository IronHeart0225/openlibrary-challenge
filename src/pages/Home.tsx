import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import SearchInput from '../components/SearchInput';
import Spinner from '../components/Spinner';
import BooksList from '../components/BooksList';
import styled from "styled-components";
import config from '../config/config';
import useDebounce from '../hooks/useDebounce';

const PAGE_LIMIT = 20;

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, handleSetSearchQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [sortToggle, setSortToggle] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const handleSearch = useCallback(() => {
    setLoadingData(true);
    setSearchError("");
    fetch(
      `${config.SEARCH_API}${debouncedSearchTerm}&page=${page}${sortToggle ? "&sort=new" : ""}&limit=${PAGE_LIMIT}`
    )
      .then((response) => response.json())
      .then(({ docs, numFound }) => {
        setTotalRecords(numFound);
        setSearchError("");
        setLoadingData(false);
        setSearchResults(docs);
      })
      .catch((e) => {
        setPage(1);
        setTotalRecords(0);
        setSearchError("There was an error while performing this search.");
        setLoadingData(false);
        setSearchResults([]);
      });
  }, [debouncedSearchTerm, page, sortToggle]);

  useEffect(() => {
    if (debouncedSearchTerm.length && debouncedSearchTerm.length > 3) {
      handleSearch();
    }
  }, [debouncedSearchTerm, page, handleSearch]);

  const onSortToggle = () => {
    setSortToggle(!sortToggle);
  }

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        handleSetSearchQuery={handleSetSearchQuery}
      />
      <StyledContainer>
        {searchResults.length ? (
          <>
          <ReactPaginate
            onPageChange={({ selected }) => {
              setPage(selected === 0 ? 1 : selected + 1);
            }}
            containerClassName={"pagination"}
            initialPage={page - 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            activeClassName={"active"}
            pageCount={Math.ceil(totalRecords / PAGE_LIMIT)}
          />
          <button
            type="button"
            onClick={onSortToggle}
            disabled={loadingData}
          >{sortToggle ? "Sort by first publish year" : "Sort by relevance"}</button>
          </>
        ) : null}
        {loadingData ? <Spinner /> : <BooksList books={searchResults} />}
        {searchError ? <div>{searchError}</div> : null}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  margin: 0 1rem 1rem;
  .pagination {
    display: inline-block;
    padding: 0;
    li {
      display: inline-block;
      margin: 0 1rem;
      a {
        cursor: pointer;
        outline: none;
      }
      &:first-child {
        margin: 0;
      }
      &.disabled {
        opacity: 0.6;
      }
      &.active {
        font-weight: bold;
      }
    }
  }
`;

export default Home;
