import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import './styles/all.scss'
import App from './pages/App'
import reducer from './reducers/game_reducer';

const store = createStore(reducer);

ReactDOM.render(
    (
    <Provider store={store}>
        <App />
    </Provider>
    ),
  document.getElementById('app')
)
