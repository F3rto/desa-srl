import React, { createContext, useContext, useState } from 'react';

const ArticoloContext = createContext();

export function useArticoloContext() {
  return useContext(ArticoloContext);
}

export function ArticoloProvider({ children }) {
  const [articolo, setArticolo] = useState(null);

  return (
    <ArticoloContext.Provider value={{ articolo, setArticolo }}>
      {children}
    </ArticoloContext.Provider>
  );
}
