import React from "react";
import {Alert, StyleSheet, View, TouchableOpacity, Platform} from "react-native";
import {Button, Layout, Text} from "@ui-kitten/components";
import {auth, firestore} from "../firebase/firebase";
import {MaterialIcons} from "@expo/vector-icons";
import NfcManager, {NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager';


export default class RunningComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runnerNumber: '',
            buttonState: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    getStyles() {
        if (this.props.active) {
            return [styles.element, styles.borderActive];
        } else {
            return styles.element;
        }
    }

    getRFIDStyle() {
        if (this.props.active) {
            return [styles.rfid];
        } else {
            return styles.rfidNone;
        }
    }

    async addUserRunData(userId) {
        const userRef = firestore.collection('users-in-lauf').doc(userId);
        const doc = await userRef.get()

        let runs = 0;
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            runs = doc.data()["runs"]
            runs++;
            const doc2 = await userRef.set({
                runs: runs
            })
        }
    }

    componentDidMount() {
        this.initNfc().then(() => {
            this.readNdef().then(uid => {
                this.addUserRunData(uid).then(() => console.log("new Data added"));
            })
        })
    }

    // Pre-step, call this before any NFC operations
    async initNfc() {
        await NfcManager.start();
    }

    async writeNdef(userId) {
        let result = false;

        try {
            // Step 1
            await NfcManager.requestTechnology(NfcTech.Ndef, {
                alertMessage: 'Ready to write some NDEF',
            });

            const bytes = Ndef.encodeMessage([Ndef.textRecord(userId)]);

            if (bytes) {
                await NfcManager.ndefHandler // Step2
                    .writeNdefMessage(bytes); // Step3

                if (Platform.OS === 'ios') {
                    await NfcManager.setAlertMessageIOS('Successfully write NDEF');
                }
            }

            result = true;
        } catch (ex) {
            console.warn(ex);
        }

        // Step 4
        NfcManager.cancelTechnologyRequest().catch(() => 0);
        return result;
    }


    readNdef() {
        const cleanUp = () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
            NfcManager.setEventListener(NfcEvents.SessionClosed, null);
        };

        return new Promise((resolve) => {
            let tagFound = null;

            NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
                tagFound = tag;
                resolve(tagFound);
                NfcManager.setAlertMessageIOS('NDEF tag found');
                NfcManager.unregisterTagEvent().catch(() => 0);
            });

            NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
                cleanUp();
                if (!tagFound) {
                    resolve();
                }
            });

            NfcManager.registerTagEvent();
        });
    }

    render() {
        return (
            <View>
                {
                    (() => {
                        if (this.props.role === "User") {
                            return (
                                <View style={this.getStyles()}>
                                    <Text style={styles.text}>{this.props.name} ({this.props.length}m)</Text>
                                    <Text style={styles.text}>Dauer: {this.props.duration} min</Text>
                                    <Text style={styles.text}>Datum: {this.props.date}</Text>
                                    <Text style={styles.text}>Laufnummer: {this.props.runnerNumber}</Text>
                                    <Text style={styles.text}>Ist
                                        Einzelläufer: {this.props.einzellaufer ? "Ja" : "Nein"}</Text>
                                    <View style={this.getRFIDStyle()}>
                                        <Text>1. Lege das Armband an</Text>
                                        <Text>2. Halte dein Smartphone an das Armband</Text>
                                        <Text>3. Drücke dabei den unteren Knopf</Text>
                                        <Text>4. Beim erfolgreichem Beschreiben kommt ein haken</Text>
                                        {this.props.active ? <Button style={styles.button} status='primary' onPress={
                                            () => {
                                                this.initNfc().then(() => {
                                                    this.writeNdef(auth.currentUser.uid).then(r => {
                                                        if(r === true) {
                                                            console.log("Successfully written");
                                                        } else {
                                                            console.log("Successfully written");
                                                        }
                                                    })
                                                });
                                            }
                                        }>Write RFID
                                            Bracelet</Button> : null}
                                    </View>
                                </View>
                            );
                        } else {
                            return (
                                <View style={this.getStyles()}>
                                    <Text style={styles.text}>{this.props.name} ({this.props.length}m)</Text>
                                    <Text style={styles.text}>Dauer: {this.props.duration} min</Text>
                                    <Text style={styles.text}>Datum: {this.props.date}</Text>
                                    <Text style={styles.text}>Armband Scannen</Text>
                                    <TouchableOpacity onPress={() => this.updateInputVal(true, 'buttonState')}>
                                        <MaterialIcons style={styles.icon} name="nfc" size={96} color="black"/>
                                    </TouchableOpacity>
                                    {this.state.buttonState ? <Button style={styles.button} appearance='outline' status='success'>
                                        Erfolgreich Runde gescannt (Tim Rhomberg, Runde 5)
                                    </Button> : null}

                                </View>
                            );
                        }
                    })()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    element: {
        padding: 15,
        borderRadius: 20,
        marginTop: 40,
        borderWidth: 2,
        backgroundColor: 'white',
    },
    borderActive: {
        borderColor: 'green'
    },
    button: {
        marginTop: 15,
    },
    rfid: {
        paddingTop: 25,
    },
    rfidNone: {
        display: "none"
    },
    icon: {
        alignSelf: 'center'
    }
})
