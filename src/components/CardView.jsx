import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CardView.css';

function CardView() {
  const navigate = useNavigate();
  const Listings = [
    {
      imageUrl: 'https://placehold.co/400',
      title: '1 Kanal House for sale',
      address: 'DHA Phase 6, Lahore',
      beds: 5,
      bath: 6,
      coveredAreaSQFT: 2350,
      propertyType: 'house',
      isCommercial: false,
      price: 65000000,
      id: 1,
    },
  ];

  const goToDetails = (id) => {
    navigate(`details/${id}`);
  };

  return (
    <div className="cardView-container">
      {Listings?.map((listing) => (
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
          <h3 className="">{listing.title}</h3>
          <p className="">
            address:
            {' '}
            {listing.address}
            ,
          </p>
          <p className="">
            Property Type:
            {' '}
            {listing.propertyType}
            ,
          </p>
          <p className="">
            Price:
            {' '}
            {listing.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default CardView;
