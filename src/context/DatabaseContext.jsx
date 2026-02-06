import React, { createContext, useState } from 'react';

export  const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
    const [Key] = useState('https://uber-clone-backend-k0fm.onrender.com');
    const contextValue = {
        Key,
    };

    return (
        <DatabaseContext.Provider value={contextValue}>
            {children}
        </DatabaseContext.Provider>
    );
};
