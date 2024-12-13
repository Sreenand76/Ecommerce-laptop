import React, { createContext, useContext,useState } from 'react';


// Create Context
const LaptopContext = createContext();

// Create a custom hook to use the LaptopContext
export const useLaptopContext = () => {
  return useContext(LaptopContext);
};

// Create a provider component
export const LaptopProvider = ({ children }) => {
  const [laptops, setLaptops] = useState([]);
  
  const [brands, setBrands] = useState([]);
  
  return (
    <LaptopContext.Provider
      value={{
        laptops,
        setLaptops,
        brands,
        setBrands
      }}
    >
      {children}
    </LaptopContext.Provider>
  );
};
