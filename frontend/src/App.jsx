import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { ThemeProvider } from './components/context/ThemeContext';
import nprogress from 'nprogress';
import { Provider } from 'react-redux';
import store from './store/store';

nprogress.configure({ showSpinner: false });
// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Category =lazy(()=>import('./pages/NavbarCategory'))
const Content = lazy(() => import('./pages/Content'));
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        {/* Suspense wrapper with fallback */}
        <Suspense fallback={<div className=" min-h-screen text-center py-10 text-gray-700 dark:text-gray-300">Loading...</div>}>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:topic" element={<Category />} />
              <Route path="/content/:id" element={<Content />} />
            </Routes>
          </div>
        </Suspense>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
