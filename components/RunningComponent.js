import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Layout, Text} from "@ui-kitten/components";
import {auth, firestore} from "../firebase/firebase";


export default class RunningComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runnerNumber: ''
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

    render() {
        return (
            <View style={this.getStyles()}>
                <Text style={styles.text}>{this.props.name} ({this.props.length}m)</Text>
                <Text style={styles.text}>Dauer: {this.props.duration} min</Text>
                <Text style={styles.text}>Datum: {this.props.date}</Text>
                <Text style={styles.text}>Laufnummer: {this.props.runnerNumber}</Text>
                <Text style={styles.text}>Ist Einzelläufer: {this.props.einzellaufer ? "Ja" : "Nein"}</Text>
                <View style={this.getRFIDStyle()}>
                    <Text>1. Lege das Armband an</Text>
                    <Text>2. Halte dein Smartphone an das Armband</Text>
                    <Text>3. Drücke dabei den unteren Knopf</Text>
                    <Text>4. Beim erfolgreichem Beschreiben kommt ein haken</Text>
                    {this.props.active ? <Button style={styles.button} status='primary'>Write RFID Bracelet</Button> : null}
                </View>
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
        width: '70%'
    },
    rfid: {
        paddingTop: 25,
    },
    rfidNone: {
        display: "none"
    }
})
