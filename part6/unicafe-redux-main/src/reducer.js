const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

/** Reducer is a function used to associate store and actions */
const counterReducer = (state = initialState, action) => {
  console.log(action)
  /** Remember that the state shoud not be changed directly */
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1}
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      return {...state, bad: state.bad + 1}
    case 'ZERO':
      return initialState
    default: return initialState
  }
}

export default counterReducer