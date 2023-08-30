import React from 'react';
import '../styles/DataTableView.css';
import { useNavigate } from 'react-router-dom';

function DataTableView() {
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
              <td>{index + 1}</td>
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

export default DataTableView;
