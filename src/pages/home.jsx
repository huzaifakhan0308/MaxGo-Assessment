import React, { useEffect, useState } from 'react';
import DataTableView from '../components/DataTableView';
import CardView from '../components/CardView';
import '../styles/home.css';
import arrow from '../assests/icons/download.png';

function Home() {
  const [changeView, setChangeView] = useState(true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const productsPerPage = 20;
  const totalPages = Math.ceil(10 / productsPerPage);
  // const startIndex = currentPageIndex * productsPerPage;
  // const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

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

  useEffect(() => {
    const getData = async () => {

    };
    getData();
  }, [currentPageIndex]);

  const switchView = () => {
    if (changeView) {
      setChangeView(false);
    } else {
      setChangeView(true);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Real Estate Viewer!</h1>
      <button
        className="
          justify-self-center
          bg-green-500
          text-white
          m-2
          px-3
          py-2
          rounded
          hover:bg-green-400
          active:bg-green-800
          focus:outline-none
          focus:ring
          focus:ring-green-500
        "
        onClick={() => { switchView(); }}
        type="button"
      >
        {changeView ? 'Switch to CardView ' : 'Switch to TableView'}
      </button>
      <h2>
        Find Your Dream Home
        <img className="animate-bounce" src={arrow} alt="down-arrow" />
      </h2>
      {changeView
        ? <DataTableView />
        : <CardView />}
      <div className="justify-self-center">
        <button type="button" onClick={handlePreviousPage} disabled={currentPageIndex === 0} className="btn btn-outline-dark btn-sm">Prev</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentPageIndex(index)}
            className={`${index === currentPageIndex ? '' : ''} btn btn-outline-dark btn-sm`}
            style={{ margin: '5px' }}
          >
            {index + 1}
          </button>
        ))}
        <button type="button" onClick={handleNextPage} disabled={currentPageIndex === totalPages - 1} className="btn btn-outline-dark btn-sm">Next</button>
      </div>
    </div>
  );
}

export default Home;
