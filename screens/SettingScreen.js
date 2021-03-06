import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Avatar, Button, Card, Layout, Modal} from '@ui-kitten/components'
import {AntDesign, Feather, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {auth, firestore} from "../firebase/firebase";

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: '',
            visible: false,
            text: ''
        }
    }

    goToProfile() {
        const {navigation} = this.props;
        navigation.navigate("Profile");
    }

    componentDidMount() {
        this.getRoleData().then(() => console.log("User Role loaded"))
    }

    async sendPasswordReset() {
        await auth.sendPasswordResetEmail(auth.currentUser.email);
    }

    async getRoleData() {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            this.updateInputVal(doc.data()["role"], 'role');
        }
    }

    goToDSGVO() {
        const {navigation} = this.props;
        navigation.navigate("DSGVO");
    }

    goToRunner() {
        const {navigation} = this.props;
        navigation.navigate("Runner");
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

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }


    render() {
        return (
            <View style={styles.layout}>
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
                        onPress={() => {
                            this.sendPasswordReset()
                                .then(() => {
                                    console.log('Password reset email sent successfully')
                                    this.updateInputVal('Password reset email sent successfully', 'text')
                                    this.updateInputVal(true, 'visible')
                                })
                                .catch(() => {
                                    console.log('Password reset email could not be sent successfully')
                                    this.updateInputVal('Password reset email could not be sent successfully', 'text')
                                    this.updateInputVal(true, 'visible')
                                });
                        }}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='key' size={20}/>
                        <Text style={styles.buttonText}>Password zur??cksetzen</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    <Modal
                        visible={this.state.visible}
                        backdropStyle={styles.backdrop}
                        onBackdropPress={() => this.updateInputVal(false, 'visible')}>
                        <Card disabled={true}>
                            <Text>{this.state.text} ????</Text>
                            <Button onPress={() => this.updateInputVal(false, 'visible')}>
                                Ausblenden
                            </Button>
                        </Card>
                    </Modal>
                    <TouchableOpacity
                        onPress={() => this.goToDSGVO()}
                        style={styles.button}
                    >
                        <MaterialIcons style={styles.iconLeft} name='privacy-tip' size={20}/>
                        <Text style={styles.buttonText}>DSGVO</Text>
                        <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                    </TouchableOpacity>
                    {this.state.role === "Admin" || this.state.role === "Runner" ?
                        <TouchableOpacity
                            onPress={() => this.goToRunner()}
                            style={styles.button}
                        >
                            <Feather style={styles.iconLeft} name='user-plus' size={20}/>
                            <Text style={styles.buttonText}>F??ge L??ufer hinzu</Text>
                            <Ionicons style={styles.iconRight} name="arrow-forward-outline" size={20}/>
                        </TouchableOpacity>
                        : null}
                    <TouchableOpacity
                        onPress={() => this.goToInfo()}
                        style={styles.button}
                    >
                        <Feather style={styles.iconLeft} name='info' size={20}/>
                        <Text style={styles.buttonText}>??ber</Text>
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
            </View>
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
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})
