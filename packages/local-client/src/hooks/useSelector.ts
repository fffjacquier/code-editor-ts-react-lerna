import { createSelectorHook } from 'react-redux'
import { RootState } from '../state'

export const useSelector = createSelectorHook<RootState>()
