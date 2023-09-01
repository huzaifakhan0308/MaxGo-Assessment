import React from 'react';
import PropTypes from 'prop-types';
import { prevNextBtn, paginationBtn } from '../pages/style';

function Pagination({
  searchInputValue,
  filteredListingsLength,
  ascListingsLength,
  currentPageIndex,
  setCurrentPageIndex,
}) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    (searchInputValue.length > 1
      ? filteredListingsLength
      : ascListingsLength)
        / itemsPerPage,
  );

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };
  return (
    <div className="justify-self-center">
      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={currentPageIndex === 0}
        className={prevNextBtn}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          type="button"
          key={index}
          onClick={() => setCurrentPageIndex(index)}
          className={`${index === currentPageIndex ? '' : ''
          } ${paginationBtn}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPageIndex === totalPages - 1}
        className={prevNextBtn}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  filteredListingsLength: PropTypes.number.isRequired,
  ascListingsLength: PropTypes.number.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  setCurrentPageIndex: PropTypes.func.isRequired,
};

export default Pagination;
