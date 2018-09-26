import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import Generation from './components/Generation';
import Dragon from './components/Dragon';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
  );

render(
  <Provider store={store}>
    <div>
      <h2>Dragons</h2>
      <Generation />
      <Dragon />
    </div>
  </Provider>,
  document.getElementById('root')
);