import React, { useContext } from "react";
import Card from "../components/Card";
import { ProductContext } from "../hooks/useProductContext";


const Home = () => {
  const {
    products,
    searchFilterName,
    name,
    setName,
    category,
    preco,
    setPreco,
    setCategory,
    searchCategory,
    searchPrice,
    priceMin, 
    setPriceMin,
    priceMax, 
    setPriceMax,
    order, 
    setOrder,
    filteredProducts,
  } = useContext(ProductContext);

  return (
    <>
      <div className="flex mt-4flex flex-wrap gap-2 justify-center mt-4 mb-4">
      <select
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          name="filter-order"
          id="filtersOrder"
        >
          <option value="order">Ordem</option>
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
      </select>

      <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none"
          type="search"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          placeholder="Valor Mínimo"
        />

        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none"
          type="search"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          placeholder="Valor Máximo"
        />

        <div className="bg-gray-100 flex flex-wrap justify-center">
          {filteredProducts
            .filter(searchCategory)
            .filter(searchPrice)
            .filter(searchFilterName)
            .filter((product) => {
              return product.price >= priceMin || priceMin === "";
            })
            .filter((product) => {
              return product.price <= priceMax || priceMax === "";
            })
            .map((product, index) => {
              return <Card product={product} key={index} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
