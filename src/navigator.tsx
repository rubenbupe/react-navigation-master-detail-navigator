import React from 'react'
import { MasterDetailRouter } from './router'
import { View } from 'react-native'
import {
	useNavigationBuilder,
	createNavigatorFactory
} from '@react-navigation/native'

import { NativeStackView } from '@react-navigation/native-stack'

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type {
	StackNavigationState,
	ParamListBase,
	StackActionHelpers
} from '@react-navigation/native'
import type {
	MasterDetailNavigationEventMap,
	MasterDetailNavigationProps,
	MasterDetailRouterOptions
} from './types'


function MasterDetailNavigator ({
	initialRouteName,
	initialDetailsRouteName,
	children,
	screenOptions,
	masterScreenOptions,
	isDetailVisible,
	masterStyle,
	fullScreenMasterWhenNoDetail,
	masterBorderWidth,
	masterBorderColor,
	detailPlaceholderComponent,
	...rest
}: MasterDetailNavigationProps) {
	const { state, navigation, descriptors, NavigationContent } =
		useNavigationBuilder<
			StackNavigationState<ParamListBase>,
			MasterDetailRouterOptions,
			StackActionHelpers<ParamListBase>,
			NativeStackNavigationOptions,
			MasterDetailNavigationEventMap
		>(MasterDetailRouter as any, {
			children,
			screenOptions,
			initialRouteName,
			initialDetailsRouteName,
			isDetailVisible
		})

	const Placeholder = detailPlaceholderComponent

	const masterState = {
		...state,
		index: 0,
		routes: [state.routes[0]],
		routeNames: [state.routeNames[0]]
	}

	const detailState = {
		...state,
		index: state.index - 1,
		routes: state.routes.slice(1)
	}

	isDetailVisible &&
		Object.keys(descriptors).forEach((key) => {
			if (key === state.routes[0].key) {
				descriptors[key].options = {
					...descriptors[key].options,
					...(masterScreenOptions ?? {})
				}
			}
		})

	return (
		<NavigationContent>
			<View
				style={{
					flexDirection: 'row',
					flex: 1
				}}
			>
				<View
					style={[
						{ width: '30%' },
						masterStyle,
						{ display: isDetailVisible ? 'flex' : 'none', borderRightWidth: masterBorderWidth ?? 0, borderRightColor: 'transparent' },
						isDetailVisible && state.index > 0 && {
							borderRightColor: masterBorderColor ?? 'transparent'
						},
						fullScreenMasterWhenNoDetail && state.index <= 0
							? { width: '100%' }
							: {}
					]}
				>
					<NativeStackView
						{...rest}
						state={masterState}
						navigation={navigation}
						descriptors={descriptors as any}
					/>
				</View>
				{isDetailVisible && state.index <= 0
					? (
						Placeholder != null
							? (
								<Placeholder navigation={navigation as any} />
							)
							: null
					)
					: isDetailVisible
						? (
							<View
								style={{
									flex: 1
								}}
							>
								<NativeStackView
									{...rest}
									state={detailState}
									navigation={navigation}
									descriptors={descriptors as any}
								/>
							</View>
						)
						: (
							<View
								style={{
									flex: 1
								}}
							>
								<NativeStackView
									{...rest}
									state={state}
									navigation={navigation}
									descriptors={descriptors as any}
								/>
							</View>
						)}
			</View>
		</NavigationContent>
	)
}

export const createMasterDetailNavigator = createNavigatorFactory<
	StackNavigationState<ParamListBase>,
	NativeStackNavigationOptions,
	MasterDetailNavigationEventMap,
	typeof MasterDetailNavigator
>(MasterDetailNavigator)
