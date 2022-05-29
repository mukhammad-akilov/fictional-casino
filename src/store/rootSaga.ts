import { all, fork } from 'redux-saga/effects'

import { postsWatcherSaga } from './sagas/themeSagas'

export function* rootSaga() {
  yield all([fork(postsWatcherSaga)])
}

export default rootSaga