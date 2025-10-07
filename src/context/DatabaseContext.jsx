import React, { createContext, useState } from 'react';

export  const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
    const [apiKey] = useState('https://uber-clone-backend-k0fm.onrender.com');
    const contextValue = {
        apiKey,
    };

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};
