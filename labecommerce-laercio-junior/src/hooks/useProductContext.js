import { createContext, useEffect, useState } from "react";

//produtos
import data from "../data/data";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [preco, setPreco] = useState("");

  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [order, setOrder] = useState ("order")

  useEffect(() => {
    setProducts(data);
  }, []);

  // FUNÇÃO QUE BUSCA PRODUTO
  const searchFilterName = (product) => {
    return product.name.toLowerCase().includes(name.toLowerCase());
  };

  // FUNÇÃO DE CATEGORIA

  const searchCategory = (product) => {
    if (category === "Viagem-Solo") {
      return product.category.includes(category);
    } else if (category === "Viagem-Familia") {
      return product.category.includes(category);
    } else {
      return product;
    }
  };

  //FUNÇÃO PARA BUSCAR POR PREÇO

  const searchPrice = (product) => {
    if (preco === 0) {
      return product;
    }

    return preco === "0" || (preco ? product.price <= preco : true);
  };


  //FUNÇÃO POR ORDEM CRESCENTE E DESCRECENTE 

  const filterItems = () => {
    let filteredProducts = [...products]; 
  
    if (order === "asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    return filteredProducts;
  };
  
  const filteredItems = filterItems();

  const filteredProducts = filteredItems === "order" ? products : filteredItems;

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
