import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../assests/icons/download.png';
import '../styles/details.css';

function Details() {
  const navigate = useNavigate();
  const Listings = {
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
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <article className="details-container">
      <button type="button" className="arrow-button" onClick={() => { goToHome(); }}>
        <img src={arrow} alt="" />
      </button>
      <section className="image-sec">
        <img src={Listings.imageUrl} alt="" />
        <div className="">
          <h1>{Listings.title}</h1>
        </div>
      </section>
      <section className="info-sec">
        <div className="property-details">
          <h2>Property Details</h2>
          <ul>
            <li>
              <strong>Address:</strong>
              {' '}
              {Listings.address}
              ,
            </li>
            <li>
              <strong>Beds:</strong>
              {' '}
              {Listings.beds}
              ,
            </li>
            <li>
              <strong>Bathrooms:</strong>
              {' '}
              {Listings.bath}
              ,
            </li>
            <li>
              <strong>Covered Area:</strong>
              {' '}
              {Listings.coveredAreaSQFT}
              {' '}
              sqft,
            </li>
            <li>
              <strong>Property Type:</strong>
              {' '}
              {Listings.propertyType}
              ,
            </li>
          </ul>
        </div>
        <p style={{ fontWeight: 'bold' }}>
          {Listings.isCommercial ? 'Commercial Property' : 'Residential Property'}
          ,
        </p>
        <p style={{ fontWeight: 'bold' }}>
          Total Price:
          {' '}
          {Listings.price.toLocaleString()}
          Rs
        </p>
      </section>
    </article>
  );
}

export default Details;
