import { useContext } from "react";

import { useCartContext } from "../hooks/useCartContext";
import { Link } from "react-router-dom";
import React from "react";
import { MdClose } from "react-icons/md";

const CartItem = ({ item }) => {

  const { id, name, imagem, price, amount } = item;
  const { removeCart, increaseAmount, descreaseAmount } = useContext(useCartContext);


  return (
    <div className="flex gap-x-4 py-2 lg:border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img src={imagem} alt="Imagem do produto" className="max-w-[70px]" />
        </Link>

        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2"
          to={`/product/${id}`}>
            <Link              
              className="text-sm uppercase max-w-[200px] hover:underline"
            >
            {name}
            <br/>
            {`R$ ${price}`}
            <br/>
            {`Quantidade: (${amount})`}
            <div className="flex gap-3 items-center">
          <div className="w-6 h-4 bg-black text-white flex items-center justify-center flex-col">
            <span onClick={() => increaseAmount(id)} className="m-auto cursor-pointer">+</span>
          </div>
          <div onClick={() => descreaseAmount(id)} className="w-6 h-4 bg-black text-white flex items-center justify-center flex-col">
            <span className="m-auto cursor-pointer">-</span>
          </div>
        </div>
            </Link>

            <div className="text-xl cursor-pointer">
              <MdClose
                className="hover:text-red-600 transition"
                onClick={() => removeCart(id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;