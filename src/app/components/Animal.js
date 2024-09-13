import React from 'react';

const Animal = ({ animal, likeCount, onLike, onCircus }) => {
  return (
    <div className="card m-3 text-center" style={{ width: '180px' }}>
      <img
        src={`/img/${animal.image}`}
        alt={animal.name}
        className="card-img-top"
        style={{ height: '150px', objectFit: 'cover' }}
      />
      <div className="position-absolute top-0 end-0 m-2 d-flex align-items-center bg-white p-2 rounded-circle shadow-sm">
        <span className="me-1">❤️</span>
        <span style={{color:"black"}}>{likeCount}</span>
      </div>
      <div className="card-body">
        <p className="card-text">{animal.name}</p>
        <button className="btn btn-success me-2" onClick={onLike}>
          Nuôi
        </button>
        <button className="btn btn-danger" onClick={onCircus}>
          Xiếc
        </button>
      </div>
    </div>
  );
};

export default Animal;
