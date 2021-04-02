import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistMiddleware } from './middlewares/persistMiddleware'
import reducers from './reducers'
// import { ActionType } from './action-types'

export const store = createStore(reducers, {}, applyMiddleware(thunk, persistMiddleware))

// manually testing our redux store code
/*store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text',
  },
})
*/

//console.log(store.getState())
/*
const id = store.getState().cells?.order[1]
store.dispatch({
  type: ActionType.DELETE_CELL,
  payload: id as string,
})

console.log(store.getState())
*/
