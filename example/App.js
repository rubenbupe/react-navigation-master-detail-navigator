import { NavigationContainer } from '@react-navigation/native';
import { Button, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { createMasterDetailNavigator } from 'react-navigation-master-detail-navigator'

const Master = ({ navigation }) => {
	return (
		<View style={styles.master} >
			<Text>I am the master</Text>
			{
				Array.from({ length: 20 }).map((_, index) => (
					<Button
						style={styles.masterButton}
						key={index}
						title={`Go to detail ${index + 1}`}
						onPress={() => {
							navigation
								.navigate('DetailNavigation', {
									id: index + 1
								})
						}}
					/>
				))
			}
		</View>
	)
}

const Detail = ({ route, navigation }) => {
	const { id } = route.params || {}

	return (
		<View style={styles.detail} >
			<Text>I am the detail {id}</Text>
			<Button title="Go back" onPress={() => {
				navigation.goBack()
			}} />
		</View>
	)
}

const DetailPlaceholder = () => {
	return (
		<View style={styles.detailPlaceholder} >
			<Text style={styles.detailPlaceholderText}>Press an item to see the detail</Text>
		</View>
	)
}

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

const styles = StyleSheet.create({
  master: { flex: 1, backgroundColor: 'tomato' },
	detail: { flex: 1, backgroundColor: 'lightblue' },
	detailPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	detailPlaceholderText: { fontSize: 20, textAlign: 'center', marginTop: 20 }
});
