import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Avatar, Layout} from '@ui-kitten/components'
import {AntDesign, Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {auth} from "../firebase/firebase";

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: 'Admin'
        }
    }

    goToProfile() {
        const {navigation} = this.props;
        navigation.navigate("Profile");
    }

    goToChangePassword() {
        const {navigation} = this.props;
        navigation.navigate("ChangePassword");
    }

    goToDSGVO() {
        const {navigation} = this.props;
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

    goToInfo() {
        const {navigation} = this.props;
        navigation.navigate("Info");
    }

    render() {
        return (
            <Layout style={styles.layout} level='1'>
                <View style={styles.container}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/head.png')}/>
                    <Text>Email: {auth.currentUser?.email}</Text>
                    <Text>Role: {this.state.role}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.goToProfile()}
                        style={styles.button}
                    >
                        <AntDesign style={styles.iconLeft} name='user' size={20}/>
                        <Text style={styles.buttonText}>Profile</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.goToChangePassword()}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='key' size={20}/>
                        <Text style={styles.buttonText}>Password wechseln</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.goToDSGVO()}
                        style={styles.button}
                    >
                        <MaterialIcons style={styles.iconLeft} name='privacy-tip' size={20}/>
                        <Text style={styles.buttonText}>DSGVO</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.goToDSGVO()}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='user-plus' size={20}/>
                        <Text style={styles.buttonText}>Füge Läufer hinzu</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.goToDSGVO()}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='bar-chart-2' size={20}/>
                        <Text style={styles.buttonText}>Zeige Läufer Statistik</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.goToInfo()}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='info' size={20}/>
                        <Text style={styles.buttonText}>Über</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.handleSignOut()}
                        style={styles.button}
                    >
                        <AntDesign style={styles.iconLeft} name='logout' size={20}/>
                        <Text style={styles.buttonText}>Abmelden</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                </View>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    layout: {
        height: 1000
    },
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
