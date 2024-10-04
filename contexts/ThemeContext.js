// import React, { createContext, useState, useEffect } from 'react';
// import { useColorScheme } from 'react-native';
// import { LightTheme, DarkTheme } from '../lib/themes'; 

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const systemTheme = useColorScheme();
//   const [theme, setTheme] = useState(systemTheme === 'dark' ? DarkTheme : LightTheme);

//   useEffect(() => {
//     if (systemTheme === 'dark') {
//       setTheme(DarkTheme);
//     } else {
//       setTheme(LightTheme);
//     }
//   }, [systemTheme]);

//   const toggleTheme = () => {
//     setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };