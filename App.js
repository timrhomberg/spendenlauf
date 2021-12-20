import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import DSGVOScreen from "./screens/DSGVOScreen";
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {FeatherIconsPack} from './feather-icons';
import Tabs from "./navigation/tabs";
import InfoScreen from "./screens/InfoScreen";
import RunnerScreen from "./screens/RunnerScreen";

const Stack = createNativeStackNavigator();

export default class App extends Component {
    render() {
        return (
            <ApplicationProvider {...eva} theme={eva.light}>
                <IconRegistry icons={FeatherIconsPack} />
                <NavigationContainer style={styles.container}>
                    <Stack.Navigator>
                        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                        <Stack.Screen options={{headerShown: false}} name="MyTabs" component={Tabs}/>
                        <Stack.Screen name="Profile" component={ProfileScreen}/>
                        <Stack.Screen name="Info" component={InfoScreen}/>
                        <Stack.Screen name="DSGVO" component={DSGVOScreen}/>
                        <Stack.Screen name="Runner" component={RunnerScreen}/>
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
