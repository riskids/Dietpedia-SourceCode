import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import {BrowserRouter} from 'react-router-dom';

import Navbar from './Component/Navbar'


const LoadingIndicator = props => {
   const { promiseInProgress } = usePromiseTracker();
   return (
     promiseInProgress &&
     <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#94B447" height="100" width="100" />
      </div>
  );

}
export default LoadingIndicator;

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
