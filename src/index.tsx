import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FirebaseProvider } from './api/FirebaseContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <FirebaseProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </FirebaseProvider>
  // </React.StrictMode>
)


// Todos feature

// Shopping List: save to wise list function
// Shopping List: add to basket
// Shopping List: product details page
// Product Filter: if no products shown, filter options should hide
// Login
// Wish List
// Basket
// STRIPE PAYMENT
// Footer: about
// Footer: contact
// Home page: new arrive section, MAN , WONMAN, SHOP ALL
// Home page: catego section
// Dark Mode
