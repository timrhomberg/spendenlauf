import React, {Component} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    handleSignOut() {
        auth
            .signOut()
            .then(() => {
                const { navigation } = this.props;
                navigation.replace("Login");
            })
            .catch(error => alert(error.message))
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Email: {auth.currentUser?.email}</Text>
                <Text>Role:</Text>
                <TouchableOpacity
                    onPress={() => this.handleSignOut()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
