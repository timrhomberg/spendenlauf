import React from 'react'
import { ScrollView } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import { Button, CheckBox, Layout, Text } from '@ui-kitten/components';
import * as Linking from 'expo-linking';

export default class DSGVOScreen extends React.Component {
    static navigationOptions = {
        title: 'Datenschutzerklärung'
        /*headerStyle: {
            backgroundColor: HEADER_COLOR
        },
        headerTintColor: HEADER_TINT_COLOR*/
    };

    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidMount() {
        this.getDSGVOStatus();
    }

    getDSGVOStatus() {
        firestore.collection('users').doc(auth.currentUser.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data (user):", doc.data());
                    console.log(doc.data()["acceptsTerms"]);
                    this.updateInputVal(doc.data()["acceptsTerms"], "checked");
                    console.log("checked Information:", this.state.checked);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
    }

    getVisibility() {
        if (this.state.checked) {
            return "none";
        }
    }

    agree = async () => {
        await firestore.collection('users').doc(auth.currentUser.uid).update({agreedToAppDSGVO: true});
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <Layout style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'stretch' }}>
                <Layout style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: 15 }}>
                        <Text category='h4'>Kurzfassung</Text>
                        <Text>Diese Datenschutzerklärung gilt nur für die Limmattalerlauf App.</Text>
                        <Text onPress={() => Linking.openURL('https://limmattalerlauf.ch/privacy-policy/')} status='info'>Die Datenschutzerklärung des Limmattalerlaufes findest du hier</Text>
                        <Text style={{ paddingTop: 5 }}>Mit der Aktivierung der "Standort Mitteilen" Funktion in dieser App überträgst du deinen aktuellen Standort alle paar Sekunden an den Limmattalerlauf. Andere Läufer können jederzeit auf einer Onlinekarte die Standorte aller Läufer einsehen.</Text>
                        <Text>Falls du deinen Standort ungewollt ausserhalb des Laufes überträgst, kannst du deinen Standort jederzeit über den Knopf "Standortdaten löschen" vom Limmattalerlauf Server löschen.</Text>

                        <Text category='h4' style={{ paddingTop: 15 }}>Ausführliche Version</Text>
                        <Text>Die ausführliche Version findest du auf der Webseite des Limmattalerlaufes.</Text>
                        <Text onPress={() => Linking.openURL('https://limmattalerlauf.ch/privacy-policy/')} status='info'>Klicke hier um die ausführliche Version zu öffnen</Text>
                    </ScrollView>
                </Layout>
                <Layout style={{ padding: 15, display: this.getVisibility() }}>
                    <CheckBox
                        checked={this.state.checked}
                        onChange={ () => {
                            this.setState({ checked: !this.state.checked })
                            }
                        }
                    >
                        Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden.
                        </CheckBox>
                    <Button
                        disabled={!this.state.checked}
                        onPress={this.agree}
                    >
                        Bestätigen
                    </Button>
                </Layout>
            </Layout>
        );
    }
}
