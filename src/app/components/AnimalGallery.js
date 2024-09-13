"use client";
import React, { useEffect, useState } from 'react';
import Animal from './Animal';

const AnimalGallery = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState([]);
  const [money, setMoney] = useState(0);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('/data1.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Không thể đọc dữ liệu.');
        }
        return response.json();
      })
      .then(data => {
        setAnimals(data);
        setLikes(data.map(animal => animal.energy)); // Khởi tạo số lượng tim dựa trên năng lượng (energy)
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const handleLike = (index) => {
    const cost = 500;
    const newLikes = [...likes];

    if (money >= cost) {
      setMoney(money - cost);
      newLikes[index] += 48; // Tăng thêm 48 tim
      setLikes(newLikes);
    } else {
      alert("Không đủ tiền!");
    }
  };

  const handleCircus = (index) => {
    const reward = 1400;
    const decrease = 99;
    const newLikes = [...likes];

    newLikes[index] -= decrease;

    if (newLikes[index] <= 0) {
      setAnimals(prevAnimals => prevAnimals.filter((_, i) => i !== index));
      setLikes(prevLikes => prevLikes.filter((_, i) => i !== index));
      setMoney(money + reward);
    } else {
      setLikes(newLikes);
      setMoney(money + reward);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnimals = animals.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(animals.length / itemsPerPage);

  if (error) {
    return <div className="text-center mt-3">{error}</div>;
  }

  return (
    <div>
      <div className="text-center mt-3">
        <p>Tiền: {money}</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {currentAnimals.map((animal, index) => (
          <Animal
            key={animal.id}
            animal={animal}
            likeCount={likes[startIndex + index]}
            onLike={() => handleLike(startIndex + index)}
            onCircus={() => handleCircus(startIndex + index)}
          />
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary me-2"
        >
          Lùi
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`btn ${currentPage === i + 1 ? 'btn-success' : 'btn-light'} me-2`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Tiến
        </button>
      </div>
    </div>
  );
};

export default AnimalGallery;
