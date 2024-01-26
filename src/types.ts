import { type DrawerNavigationOptions } from '@react-navigation/drawer'
import type * as React from 'react'

import type {
	ParamListBase,
	StackNavigationState,
	DefaultNavigatorOptions,
	StackRouterOptions,
	NavigationProp
} from '@react-navigation/native'

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export interface MasterDetailRouterOptions extends StackRouterOptions {
	isDetailVisible?: boolean
	initialDetailsRouteName?: string
}

export interface MasterDetailPlaceholderComponentProps {
	navigation: NavigationProp<ParamListBase>
}

export interface MasterDetailNavigationConfig {
	/*
	 * The name of the route to navigate to in the detail view when the navigator is mounted.
	 */
	initialDetailsRouteName?: string

	/*
	 * The options to use for the master screen.
	 * These options will be merged with the options for the screen and screen options from the router.
	 */
	masterScreenOptions?: NativeStackNavigationOptions

	/*
	 * Whether the detail view should be visible. If set to false, the master view will be disabled
	 * and only the detail view will be visible, with the master screen being placed at the beginning
	 * of the detail screen's route stack. This allows you to mantain the screen states of the stack.
	 */
	isDetailVisible?: boolean

	/*
	 * The style to apply to the master view container.
	 */

	masterStyle?: DrawerNavigationOptions['drawerStyle']

	/*
	 * Whether the master view should be displayed in full screen when the detail view is empty.
	 */

	fullScreenMasterWhenNoDetail?: boolean

	/*
	 * The width of the master view border.
	 */
	masterBorderWidth?: number

	/*
	 * The color of the master view border.
	 */
	masterBorderColor?: string

	/*
	 * The component to use as a placeholder for the detail view when the detail stack is empty (only one screen
	 * in navigator stack).
	 * If not specified, the detail view will be hidden.
	 * This is useful if you want to display a message to the user when the detail view is empty
	 * (e.g. "Select an item to see details").
	 */
	detailPlaceholderComponent?: React.ComponentType<MasterDetailPlaceholderComponentProps>
}

export interface MasterDetailNavigationEventMap {
	[key: string]: any
}

export type MasterDetailNavigationProps = DefaultNavigatorOptions<
	ParamListBase,
	StackNavigationState<ParamListBase>,
	NativeStackNavigationOptions,
	MasterDetailNavigationEventMap
> &
	StackRouterOptions &
	MasterDetailNavigationConfig
