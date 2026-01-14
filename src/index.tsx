import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { StrictMode } from 'react';
import { ThemeProvider } from '@mui/material';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { theme } from './ThemeProvider';



const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </StrictMode>
);
