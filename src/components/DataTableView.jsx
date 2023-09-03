import React from 'react';
import '../styles/DataTableView.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function DataTableView({ Listings, currentPageIndex, itemsPerPage }) {
  const navigate = useNavigate();
  const goToDetails = (id) => {
    navigate(`details/${id}`);
  };

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Address</th>
            <th>Property Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Listings.map((listing, index) => (
            <tr key={listing.id} onClick={() => { goToDetails(listing.id); }}>
              <td>{currentPageIndex * itemsPerPage + index + 1}</td>
              <td>{listing.title}</td>
              <td>{listing.address}</td>
              <td>{listing.propertyType}</td>
              <td>{listing.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DataTableView.propTypes = {
  Listings: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      beds: PropTypes.number.isRequired,
      bath: PropTypes.number.isRequired,
      coveredAreaSQFT: PropTypes.number.isRequired,
      propertyType: PropTypes.string.isRequired,
      isCommercial: PropTypes.bool.isRequired,
      price: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default DataTableView;
