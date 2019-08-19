import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose  } from 'redux';
import reducers from './redux/reducers/index';
import thunk from "redux-thunk";

import Firebase, { FirebaseContext } from "./components/Firebase";
import App from './components/App/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware( thunk ) )
);

ReactDOM.render(
    <Provider store={ store }>
        <FirebaseContext.Provider value={ new Firebase() }>
            <App />
        </FirebaseContext.Provider>
    </Provider>,
    document.querySelector('#root')
);

