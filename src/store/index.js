import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../slice/auth'
import ArticlesReducer from '../slice/article'

export default configureStore({
	reducer: {
		auth: AuthReducer,
		article: ArticlesReducer, 
	},
	devTools: process.env.NODE_ENV !== 'production',
})