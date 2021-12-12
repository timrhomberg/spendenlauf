import React from "react";
import {StyleSheet, View} from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import {auth, firestore} from "../firebase/firebase";


export default class RunningComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            runnerNumber: ''
        }
    }

    componentDidMount() {
        /*this.getDonationRunInformation().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.updateInputVal(doc.data()["runnerNumber"], 'runnerNumber');
            });
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });*/
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    async getDonationRunInformation() {
        return firestore.collection('users-in-lauf').where("userId", "==", auth.currentUser.uid).get();
    }

    render() {
        return (
            <View style={styles.element}>
                <Text style={styles.text}>{this.props.name} ({this.props.length}m)</Text>
                <Text style={styles.text}>Dauer: {this.props.duration}min</Text>
                <Text style={styles.text}>Datum: </Text>
                <Text style={styles.text}>Laufnummer: </Text>
                <Text style={styles.text}>Ist Einzelläufer: </Text>
                <Button style={styles.button} status='primary'>
                    PRIMARY
                </Button>
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
        backgroundColor: 'white'
    }
})
