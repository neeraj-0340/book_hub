import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Library } from './Library app/Library';
import Demo from './demo';
import { Provider } from 'react-redux';
import Store from './Library app/Store';
import { Favourites } from './Library app/Favourites';
import { Mylibrary } from './Library app/Mylibrary';
import { Detailedpage } from './Library app/Detailedpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route path="/Library" element={<Library/>}></Route>
      <Route path="/Favourites" element={<Favourites/>}></Route>
      <Route path="/mylibrary" element={<Mylibrary/>}></Route>
      <Route path="/detailedpage/:id" element={<Detailedpage/>}></Route>
      <Route path="/demo" element={<Demo/>}></Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
