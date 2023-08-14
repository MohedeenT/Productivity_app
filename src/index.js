import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {App} from './App';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    <Footer/>
  </React.StrictMode>
);