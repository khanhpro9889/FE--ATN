import ProfileReducer from './Profile/ProfileReducer';
import ChatFrameReducer from './ChatFrame/ChatFrameReducer';
import { combineReducers, createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';

const allReducers = combineReducers({
    ProfileReducer,
    ChatFrameReducer
})

const middlewareEnhancer = applyMiddleware(thunk)
const composedEnhancers = compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(allReducers, composedEnhancers);

export default store;