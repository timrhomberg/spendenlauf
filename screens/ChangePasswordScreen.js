import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Avatar, Menu, MenuItem, MenuGroup, Button, Icon, Layout} from '@ui-kitten/components'
import {AntDesign, Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {auth} from "../firebase/firebase";

export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: 'Admin'
        }
    }

    goToProfile() {
        const {navigation} = this.props;
        console.log("Hello")
        navigation.navigate("Profile");
    }

    goToDSGVO() {
        const {navigation} = this.props;
        console.log("Hello")
        navigation.navigate("DSGVO");
    }

    handleSignOut() {
        auth
            .signOut()
            .then(() => {
                const {navigation} = this.props;
                navigation.replace("Login");
            })
            .catch(error => alert(error.message))
    }

    render() {
        return (
            <Layout style={styles.layout} level='1'>
                <View style={styles.container}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/head.png')}/>
                    <Text>Email: {auth.currentUser?.email}</Text>
                    <Text>Role: {this.state.role}</Text>
                </View>
                <Button>Change Password</Button>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        margin: 8
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#0782F9',
        width: '80%',
        padding: 12,
        borderRadius: 20,
        marginTop: 20,
    },
    iconLeft: {
        color: 'white',
        flex: 1
    },
    iconRight: {
        color: 'white',
        flex: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        flex: 8
    }
})
