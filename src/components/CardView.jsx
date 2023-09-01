import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/CardView.css';

function CardView({ Listings, currentPageIndex, itemsPerPage }) {
  const navigate = useNavigate();
  const goToDetails = (id) => {
    navigate(`details/${id}`);
  };

  return (
    <div className="cardView-container">
      {Listings?.map((listing, index) => (
        <div
          key={listing.id}
          className="card"
          onClick={() => { goToDetails(listing.id); }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              goToDetails(listing.id);
            }
          }}
        >
          <span style={{ opacity: '50%' }}>{currentPageIndex * itemsPerPage + index + 1}</span>
          <h3 className="card-title">{listing.title}</h3>
          <address className="card-address">{listing.address}</address>
          <p className="card-property-type">
            Property Type:
            {listing.propertyType}
          </p>
          <p className="card-price">
            Price:
            {listing.price}
          </p>
        </div>
      ))}
    </div>
  );
}

CardView.propTypes = {
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

export default CardView;
