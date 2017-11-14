import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import EmailSignatureInputForm from './components/email-signature-input-form';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDom.render(
    <Provider store={ createStoreWithMiddleware(reducers)}>
        <EmailSignatureInputForm/>
    </Provider>
, document.querySelector('.main-container'));