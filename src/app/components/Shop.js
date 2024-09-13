"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch data from data.json
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setCategories(data.categories);
      });

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    console.log("Giỏ hàng đã cập nhật:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Gén
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TRANG CHỦ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  GIỚI THIỆU
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  SẢN PHẨM
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  TIN TỨC
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  CẨM NANG
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  LIÊN HỆ
                </a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <span className="me-2">[{getCartCount()}]</span>
              <Image src="/cart-icon.png" alt="Cart" width={24} height={24} />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="d-flex justify-content-center mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`btn btn-outline-primary mx-1 ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100">
                <Image
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  width={200}
                  height={200}
                  layout="responsive"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-primary fw-bold">
                    {product.price.toLocaleString("vi-VN")}đ
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <input
                      type="number"
                      className="form-control w-25"
                      min="1"
                      defaultValue="1"
                      id={`quantity-${product.id}`}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        const quantity = parseInt(
                          document.getElementById(`quantity-${product.id}`)
                            .value,
                          10
                        );
                        addToCart(product, quantity);
                      }}
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-light text-center py-3 mt-4">
        Mã sinh viên: P5xxxxx | Lớp: WDxxxxx
      </footer>
    </div>
  );
};

export default Shop;
