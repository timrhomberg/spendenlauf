import React from 'react'
import { ScrollView } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import { Button, CheckBox, Layout, Text } from '@ui-kitten/components';
import * as Linking from 'expo-linking';

export default class DSGVOScreen extends React.Component {
    static navigationOptions = {
        title: 'Datenschutzerkl√§rung'
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
                        <Text>Diese Datenschutzerkl√§rung gilt nur f√ľr die Limmattalerlauf App.</Text>
                        <Text onPress={() => Linking.openURL('https://limmattalerlauf.ch/privacy-policy/')} status='info'>Die Datenschutzerkl√§rung des Limmattalerlaufes findest du hier</Text>
                        <Text style={{ paddingTop: 5 }}>Mit der Aktivierung der "Standort Mitteilen" Funktion in dieser App √ľbertr√§gst du deinen aktuellen Standort alle paar Sekunden an den Limmattalerlauf. Andere L√§ufer k√∂nnen jederzeit auf einer Onlinekarte die Standorte aller L√§ufer einsehen.</Text>
                        <Text>Falls du deinen Standort ungewollt ausserhalb des Laufes √ľbertr√§gst, kannst du deinen Standort jederzeit √ľber den Knopf "Standortdaten l√∂schen" vom Limmattalerlauf Server l√∂schen.</Text>

                        <Text category='h4' style={{ paddingTop: 15 }}>Ausf√ľhrliche Version</Text>
                        <Text>Die ausf√ľhrliche Version findest du auf der Webseite des Limmattalerlaufes.</Text>
                        <Text onPress={() => Linking.openURL('https://limmattalerlauf.ch/privacy-policy/')} status='info'>Klicke hier um die ausf√ľhrliche Version zu √∂ffnen</Text>
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
                        Ich habe die Datenschutzerkl√§rung gelesen und bin damit einverstanden.
                        </CheckBox>
                    <Button
                        disabled={!this.state.checked}
                        onPress={this.agree}
                    >
                        Best√§tigen
                    </Button>
                </Layout>
            </Layout>
        );
    }
}
