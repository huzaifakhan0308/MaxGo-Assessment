import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../redux/listings/listingsSlice';
import arrow from '../assests/icons/download.png';
import '../styles/details.css';

function Details() {
  const { id } = useParams();
  const { listings } = useSelector((store) => store.listings);
  const Listings = listings.find((listing) => listing.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="details-container">
      {Listings === undefined
        ? (
          <p style={{ textAlign: 'center' }}>
            Oops, something went wrong! Check your internet connection or select property again.
          </p>
        )
        : (
          <>
            <button type="button" className="arrow-button" onClick={() => { goToHome(); }}>
              <img src={arrow} alt="" />
            </button>
            <section className="image-sec">
              <img src={Listings?.imageUrl} alt="" />
              <div className="">
                <h1>{Listings?.title}</h1>
              </div>
            </section>
            <section className="info-sec">
              <div className="property-details">
                <h2>Property Details</h2>
                <ul>
                  <li>
                    <strong>Address:</strong>
                    {' '}
                    {Listings?.address}
                    ,
                  </li>
                  <li>
                    <strong>Beds:</strong>
                    {' '}
                    {Listings?.beds}
                    ,
                  </li>
                  <li>
                    <strong>Bathrooms:</strong>
                    {' '}
                    {Listings?.bath}
                    ,
                  </li>
                  <li>
                    <strong>Covered Area:</strong>
                    {' '}
                    {Listings?.coveredAreaSQFT}
                    {' '}
                    sqft,
                  </li>
                  <li>
                    <strong>Property Type:</strong>
                    {' '}
                    {Listings?.propertyType}
                    ,
                  </li>
                </ul>
              </div>
              <p style={{ fontWeight: 'bold' }}>
                {Listings?.isCommercial ? 'Commercial Property' : 'Residential Property'}
                ,
              </p>
              <p style={{ fontWeight: 'bold' }}>
                Total Price:
                {' '}
                {Listings?.price}
                Rs
              </p>
            </section>
          </>
        )}
    </div>
  );
}

export default Details;
