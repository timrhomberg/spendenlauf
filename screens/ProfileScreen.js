import React from 'react'
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native'
import {
    Input,
    Layout,
    Divider,
    Icon,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction,
    Text,
    SelectItem, Select
} from "@ui-kitten/components";
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import {auth, firestore} from "../firebase/firebase";

export default class ProfileScreen extends React.Component {
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
            role: '',
            menuVisible: false
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

    async getData() {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
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

    async updateData() {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const doc = await userRef.update({
            'prename': this.state.prename,
            'surname': this.state.surname,
            'email': this.state.email,
            'street': this.state.street,
            'city': this.state.city,
            'plz': this.state.plz,
        });
    }

    render() {
        return (
            <Layout style={styles.layout} level='1'>
                <Text style={styles.title} category='h3'>General Information</Text>
                <Divider/>
                <Text style={styles.text} category='p2'>Vorname</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.prename}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'prename');
                    }}
                />
                <Text style={styles.text} category='p2'>Name</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.surname}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'surname');
                    }}
                />
                <Text style={styles.text} category='p2'>E-Mail</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.email}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'email');
                    }}
                />
                <Text style={styles.text} category='p2'>Strasse</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.street}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'street');
                    }}
                />
                <Text style={styles.text} category='p2'>Ort</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.city}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'city');
                    }}
                />
                <Text style={styles.text} category='p2'>PLZ</Text>
                <Input
                    style={styles.input}
                    placeholder='Place your Text'
                    value={this.state.plz}
                    onChangeText={(text) => {
                        this.updateInputVal(text, 'plz');
                    }}
                />
                <Text style={styles.text} category='p2'>Geschlecht</Text>
                <Select
                    style={styles.select}
                    onSelect={index => console.log(index)}
                    value={this.state.gender}>
                    <SelectItem title='Mann'/>
                    <SelectItem title='Frau'/>
                    <SelectItem title='Intersexuell'/>
                </Select>
                <Text style={styles.text} category='p2'>Tshirt Gr??sse</Text>
                <Select
                    style={styles.select}
                    onSelect={index => console.log(index)}
                    value={this.state.tshirt}>
                    <SelectItem title='XS'/>
                    <SelectItem title='S'/>
                    <SelectItem title='M'/>
                    <SelectItem title='L'/>
                    <SelectItem title='XL'/>
                </Select>
                <TouchableOpacity
                    onPress={() => this.updateData().then(() => console.log("Data was updated"))}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Speichern</Text>
                </TouchableOpacity>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    layout: {
        height: '100%'
    },
    menu: {
        flex: 1,
        margin: 8
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginRight: 20,
        marginLeft: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    input: {
        height: 40,
        marginRight: 20,
        marginLeft: 20,
        borderWidth: 1,
        marginTop: 5
    },
    select: {
        height: 40,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 6
    },
    icon: {
        width: 32,
        height: 32
    },
    text: {
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20
    },
    title: {
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20
    }
})
