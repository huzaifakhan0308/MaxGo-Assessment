import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { useDispatch, useSelector } from 'react-redux';
import DataTableView from '../components/DataTableView';
import CardView from '../components/CardView';
import Pagination from '../hooks/pagination';
import { fetchProperties } from '../redux/listings/listingsSlice';
import { setItem, getItem } from '../hooks/localStorage';
import { changeViewBtn, sortByBtn } from './style';
import arrow from '../assests/icons/download.png';

function Home() {
  const { listings, status } = useSelector((store) => store.listings);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // changing views of Listings
  const [changeView, setChangeView] = useState(() => (getItem('changeView') !== null ? getItem('changeView') : true));
  const switchView = () => {
    if (changeView) {
      setChangeView(false);
      setItem(false, 'changeView');
    } else {
      setChangeView(true);
      setItem(true, 'changeView');
    }
  };

  const [ascOrder, setAscOrder] = useState(false);
  const [ascListings, setAscListings] = useState([]);

  useEffect(() => {
    setAscListings(listings);
  }, [listings]);

  // setting Listings in ascending order
  const handleSort = () => {
    if (!ascOrder) {
      const sortedListings = [...listings];
      const sorted = sortedListings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setAscListings(sorted);
      setAscOrder(true);
    } else {
      setAscListings(listings);
      setAscOrder(false);
    }
  };

  const [searchInputValue, setSearchInputValue] = useState('');
  const [filteredListings, setFilteredListings] = useState([]);
  const [maxInputValue, setMaxInputValue] = useState('');

  // searching by title and filtering by max price
  const updateFilteredListings = (titleValue, maxPriceValue) => {
    let filtered = ascListings;

    if (titleValue) {
      filtered = filtered.filter(
        (listing) => listing.title.toLowerCase().includes(titleValue.toLowerCase()),
      );
    }

    if (maxPriceValue !== '') {
      filtered = filtered.filter(
        (listing) => parseFloat(listing.price) <= parseFloat(maxPriceValue),
      );
    }

    setFilteredListings([...filtered]);
  };
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const itemsPerPage = 10;

  // set listings to show it on each page
  const sliceListings = (sourceListings, pageIndex, itemsPerPage) => sourceListings.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage,
  );

  const displayedListings = sliceListings(ascListings, currentPageIndex, itemsPerPage);
  const filterListings = sliceListings(filteredListings, currentPageIndex, itemsPerPage);

  let content;
  if (status === 'loading') {
    content = <p style={{ textAlign: 'center' }}>Loading...</p>;
  } else if (status === 'loaded') {
    content = changeView
      ? (
        <DataTableView
          Listings={(searchInputValue.length >= 1
          || maxInputValue.length >= 1) ? filterListings : displayedListings}
          currentPageIndex={currentPageIndex}
          itemsPerPage={itemsPerPage}
        />
      )
      : (
        <CardView
          Listings={(searchInputValue.length >= 1
            || maxInputValue.length >= 1) ? filterListings : displayedListings}
          currentPageIndex={currentPageIndex}
          itemsPerPage={itemsPerPage}
        />
      );
  } else {
    content = <p style={{ textAlign: 'center' }}>Oops, something went wrong! Check your internet connection.</p>;
  }
  return (
    <div className="home-container">
      <h1>Welcome to Real Estate Viewer!</h1>
      <button
        className={changeViewBtn}
        onClick={() => { switchView(); }}
        type="button"
      >
        {changeView ? 'Switch to CardView ' : 'Switch to TableView'}
      </button>
      <h2>
        Find Your Dream Home
        <img className="animate-bounce" src={arrow} alt="down-arrow" />
      </h2>
      <div className="filters-container">
        <input
          type="text"
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
            updateFilteredListings(e.target.value, maxInputValue);
          }}
          placeholder="Search by title..."
        />
        <input
          type="number"
          placeholder="Filter by max price"
          value={maxInputValue}
          onChange={(e) => {
            setMaxInputValue(e.target.value);
            updateFilteredListings(searchInputValue, e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleSort();
          }}
          className={`${ascOrder ? 'bg-green-600' : 'bg-green-400'
          } ${sortByBtn}`}
        >
          Sort by Price
          {' '}
          ↓
        </button>
      </div>
      {content}
      {/* passing value for setting pagination */}
      <Pagination
        searchInputValue={searchInputValue}
        filteredListingsLength={filteredListings.length}
        ascListingsLength={ascListings.length}
        currentPageIndex={currentPageIndex}
        setCurrentPageIndex={setCurrentPageIndex}
      />
    </div>
  );
}

export default Home;
