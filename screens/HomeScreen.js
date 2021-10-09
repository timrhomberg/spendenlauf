import React, {Component} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import { auth, firestore } from '../firebase/firebase'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            acceptsTerms: '',
            birthdate: '',
            city: '',
            email: '',
            gender: '',
            phone: '',
            plz: '',
            prename: '',
            sendMails: '',
            street: '',
            surname: '',
            tshirt: '',
            role: ''
        };
    }

    componentDidMount() {
        this.getData().then(() => console.log("User Data loaded"))
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
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

    async getData() {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
            console.log(doc.data()["role"]);
            this.updateInputVal(doc.data()["role"], 'role');
            this.updateInputVal(doc.data()["acceptsTerms"], 'acceptsTerms');
            this.updateInputVal(doc.data()["birthdate"], 'birthdate');
            this.updateInputVal(doc.data()["email"], 'email');
            this.updateInputVal(doc.data()["city"], 'city');
            this.updateInputVal(doc.data()["gender"], 'gender');
            this.updateInputVal(doc.data()["phone"], 'phone');
            this.updateInputVal(doc.data()["plz"], 'plz');
            this.updateInputVal(doc.data()["prename"], 'prename');
            this.updateInputVal(doc.data()["sendMails"], 'sendMails');
            this.updateInputVal(doc.data()["street"], 'street');
            this.updateInputVal(doc.data()["surname"], 'surname');
            this.updateInputVal(doc.data()["tshirt"], 'tshirt');
            this.updateInputVal(doc.data()["role"], 'role');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Email: {auth.currentUser?.email}</Text>
                <Text>Role: {this.state.role}</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.prename}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'prename');
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.surname}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'surname');
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'email');
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.street}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'street');
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.city}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'city');
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.plz}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'plz');
                    }}
                />
                <TouchableOpacity
                    onPress={() => this.handleSignOut()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.getData().then(() => console.log("hello"))}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Data</Text>
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
    input: {
        height: 40,
        width: '60%',
        margin: 2,
        borderWidth: 1,
        padding: 10,
    }
})
