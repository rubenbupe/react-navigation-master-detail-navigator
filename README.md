# React Navigation Master Detail Navigator

A simple React Navigation Navigator to achieve a master-detail layout in React Native, based on the Native Stack Navigator.

It can be used to create a responsive layout that changes from a single stack to a Side-by-side view, depending on the size of the screen.

When the layout is collapsed, all the screens are displayed in the same stack. If the layout is expanded, the master screen will be displayed on the left and a stack with the rest of the screens on the right. The state of the screens is preserved when switching between collapsed and extended.

## Example
![](https://github.com/rubenbupe/react-navigation-master-detail-navigator/blob/main/.github/media/example-1.gif)

## Installation and Usage

To install this component enter the following command:

```
npm install --save https://github.com/rubenbupe/react-navigation-master-detail-navigator
```

You can also fork this repository and install it from that fork.

```javascript
import { createMasterDetailNavigator } from 'react-navigation-master-detail-navigator'

import { NavigationContainer } from '@react-navigation/native';

import { Master, Detail, DetailPlaceholder } from './screens'

const ExampleNavigator = createMasterDetailNavigator()

const ExampleRoutes = () => {
	const { width, height } = useWindowDimensions()

	const isSmallScreen = width < 600

	return (
		<ExampleNavigator.Navigator
			fullScreenMasterWhenNoDetail={false}
			isDetailVisible={!isSmallScreen}
			detailPlaceholderComponent={DetailPlaceholder}
			masterStyle={{
				width: 300
			}}
			screenOptions={{
				cardShadowEnabled: true,
				cardOverlayEnabled: true
			}}
		>
			<ExampleNavigator.Screen
				options={{ title: 'Master Screen' }}
				name="MasterNavigation"
				component={Master}
			/>
			<ExampleNavigator.Screen
				options={{ title: 'Details Screen' }}
				name="DetailNavigation"
				component={Detail}
			/>
		</ExampleNavigator.Navigator>
	)
}


export default function App() {
  return (
		<NavigationContainer>
			<ExampleRoutes />
		</NavigationContainer>
	);
}
```

Check out the [example](https://github.com/rubenbupe/react-navigation-master-detail-navigator/tree/main/example) project for more examples.

## Properties

| Property | Description | Type | Required |
| --- | --- | --- | --- |
| `initialDetailsRouteName` | The name of the route to navigate to in the detail view when the navigator is mounted | string | No |
| `masterScreenOptions` | The options to use for the master screen. These options will be merged with the options for the screen and screen options from the router | NativeStackNavigationOptions | No |
| `isDetailVisible` | Whether the detail view should be visible. If set to false, the master view will be disabled and only the detail view will be visible, with the master screen being placed at the beginning of the detail screen's route stack. This allows you to mantain the screen states of the stack | boolean | No |
| `masterStyle` | The style to apply to the master view container | DrawerNavigationOptions['drawerStyle'] | No |
| `fullScreenMasterWhenNoDetail` | Whether the master view should be displayed in full screen when the detail view is empty | boolean | No |
| `masterBorderWidth` | The width of the master view border | number | No |
| `masterBorderColor` | The color of the master view border | string | No |
| `detailPlaceholderComponent` | The component to use as a placeholder for the detail view when the detail stack is empty (only one screen in navigator stack). If not specified, the detail view will be hidden. This is useful if you want to display a message to the user when the detail view is empty (e.g. "Select an item to see details") | React.ComponentType<MasterDetailPlaceholderComponentProps> | No |

