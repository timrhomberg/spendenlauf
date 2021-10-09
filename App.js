import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DSGVOScreen from "./screens/DSGVOScreen";
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const Stack = createNativeStackNavigator();

export default class App extends Component {

    render() {
        return (
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer style={styles.container}>
                    <Stack.Navigator>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="DSGVO" component={DSGVOScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </ApplicationProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
