import React from 'react'
import { StyleSheet, View } from 'react-native'
import { auth } from '../firebase/firebase'
import {Button, Input, Layout, Text} from '@ui-kitten/components';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidUpdate() {
        auth.onAuthStateChanged(user => {
            if (user) {
                const { navigation } = this.props;
                navigation.replace("MyTabs");
            }
        })
    }

    handleSignUp() {
        auth
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    handleLogin() {
        auth
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    render() {
        return (
            <Layout
                style={styles.container}
            >
                <View style={styles.headerContainer}>
                    <Text
                        category='h1'
                        status='control'>
                        Hello
                    </Text>
                    <Text
                        style={styles.signInLabel}
                        category='s1'
                        status='control'>
                        Sign in to your account
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(val) => this.updateInputVal(val, 'email')}
                        style={styles.input}
                        size='medium'
                    />
                    <Input
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                        style={styles.input}
                        size='medium'
                        secureTextEntry
                    />
                    <Button
                        onPress={() => this.handleLogin()}
                        style={styles.button}
                    >
                        Login
                    </Button>
                    <Button
                        onPress={() => this.handleSignUp()}
                        style={[styles.button]}
                        appearance='ghost'
                        status='control'
                    >
                        Register
                    </Button>
                </View>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: '#0782F9',
    },
    signInLabel: {
        marginTop: 16,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: '80%',
        borderRadius: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5
    }
})
