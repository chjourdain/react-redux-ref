import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import PersonRoute from './route/PersonRoute'
import LoginPage from './containers/LoginPage'
import App from './containers/App'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push  } from 'react-router-redux'
import configureStore from './store/configureStore.dev.js'
import {initialAppState} from './constants'


const middleware = routerMiddleware(browserHistory);

const store = configureStore(initialAppState);

const history = syncHistoryWithStore(browserHistory, store);
store.dispatch(push('/person'))
render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={LoginPage} />
                <Route path="person" component={PersonRoute}/>
                <Route path="login" component={LoginPage}/>
            </Route>
        </Router>
    </Provider>, document.getElementById('mount-point'));