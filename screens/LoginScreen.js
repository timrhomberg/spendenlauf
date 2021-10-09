import React from 'react'
import { StyleSheet, View } from 'react-native'
import { auth } from '../firebase/firebase'
import { Button, Input, Layout } from '@ui-kitten/components';

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
                navigation.replace("Home");
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
                </View>

                <View style={styles.buttonContainer}>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5
    }
})
