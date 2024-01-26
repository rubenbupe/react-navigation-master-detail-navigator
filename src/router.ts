import { type MasterDetailRouterOptions } from './types'
import {
	type ParamListBase,
	type RouterConfigOptions,
	type StackActionType,
	type StackNavigationState,
	StackRouter
} from '@react-navigation/native'

export const MasterDetailRouter = (
	routerOptions: MasterDetailRouterOptions
) => {
	const router = StackRouter(routerOptions)

	return {
		...router,
		getInitialState (options: RouterConfigOptions) {
			const defaultState = router.getInitialState(options)
			if (
				routerOptions.initialDetailsRouteName == null ||
				routerOptions.isDetailVisible === false
			) {
				return defaultState
			}
			const tmpRouter = StackRouter({
				...routerOptions,
				initialRouteName: routerOptions.initialDetailsRouteName
			})
			const detailState = tmpRouter.getInitialState(options)

			return {
				...defaultState,
				index: 1,
				routes: [defaultState.routes[0], detailState.routes[0]]
			}
		},

		getStateForAction (
			state: StackNavigationState<ParamListBase>,
			action: StackActionType,
			options: RouterConfigOptions
		) {
			switch (action.type) {
			case 'REPLACE':{
				const defaultState = router.getStateForAction(state, action, options)

				if (defaultState == null) {
					return null
				}

				const index = defaultState.routes.findIndex((route, i) => {
					return route.key !== state.routes[i].key
				})

				if (index === -1) {
					return defaultState
				} else if (index === 0) {
					// If the screen to be replaced is the first screen (the master screen), we want it to behave like a push,
					// so that the master screen is not replaced, and the new screen is showed on top of it or in the detail screen
					return {
						...defaultState,
						index: 1,
						routes: [state.routes[0], defaultState.routes[0]]
					}
				} else {
					// If not the first screen, we want it to behave like a regular replace
					// Except if the screen is going to be replaced by the master screen, in which case we return to the initial state
					if (defaultState.routes[index].name === routerOptions.initialRouteName) {
						const masterIndex = state.routes.findIndex((route) => routerOptions.initialRouteName === route.name)
						const masterRoute = state.routes[masterIndex]
						return {
							...defaultState,
							index: masterIndex,
							routes: [masterRoute]
						}
					}
					return defaultState
				}
			} default:
				return router.getStateForAction(state, action, options)
			}
		}
	}
}
