const themes = {
    Original: {
        primary: '#0D0D0D',
        secondary: '#00FFFF',
        third: '#F72585',
        white: '#FFF'
      },

      FierySunset: {
        primary: '#FF6B35',
        secondary: '#FDD835',
        third: '#E53935',
        white: '#FFF',
      },

      MidnightNoir: {
        primary: '#1C1C1C',
        secondary: '#34495E',
        third: '#D0D0D0',
        white: '#FFF',
      },

      EnchantedForest: {
        primary: '#2E7D32',
        secondary: '#558B2F',
        third: '#9CCC6',
        white: '#FFF'
      },

      VibrantSunrise: {
        primary: '#FF9800',
        secondary: '#FFC107',
        third: '#FF5722',
        white: '#FFF'
      },

      GrassyGrove: {
        primary: '#4CAF50',
        secondary: '#8BC34A',
        third: '#CDDC39',
        white: '#FFF'
      }
    // Add other themes similarly
  };
  
  let activeTheme = themes.Original;
  
  const setActiveTheme = (themeName) => {
    activeTheme = themes[themeName];
  };
  
  const colours = {
    ...activeTheme,
    setActiveTheme,
  };
  
  export default colours;
  