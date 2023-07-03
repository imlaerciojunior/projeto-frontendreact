import { createContext, useEffect, useState } from "react";

export const useCartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  //MONITORAR O VALOR
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);

    setTotal(total);
  }, [cart]);

  //MONITORAR O CART
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);

      setAmount(amount);
    }
  }, [cart]);

  //ADICIONAR NO CART
  const addCart = (product, id) => {
    //cria a copia e inicializa o objeto com 1
    const newItem = { ...product, amount: 1 };

    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });

      setCart(newCart);

    }else{
      setCart([...cart, newItem])
    }

  };

//REMOVER ITEM DO CART

  const removeCart = (id) => {

    const newCart = cart.filter((item) => {
      return item.id !== id
    })  

    setCart(newCart)
  }


  const clearCart = () => {
    setCart([])
  }


  // AUMENTAR O VALOR DO CARRINHO 

  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id)

    addCart(cartItem, id)
  }

  // DIMINUIR O VALOR DO CARRINHO

  const descreaseAmount = (id) => {
    const cartItem = cart.find((item) =>{
      return item.id === id
    })

    if(cartItem){
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });

      setCart(newCart);
      
    }
    if (cartItem.amount < 2){
      removeCart(id)
    }
  }
  return(
    <useCartContext.Provider 
    value={{
      cart, 
      addCart, 
      removeCart, 
      clearCart,
      increaseAmount, 
      descreaseAmount, 
      amount, 
      total
    }}>{children}</useCartContext.Provider>
  )
};


export default CartProvider