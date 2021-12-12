import React from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native'
import {Layout, Text} from "@ui-kitten/components";
import RunningComponent from "../components/RunningComponent";
import ExampleComponent from "../components/ExampleComponent";
import {auth, firestore} from "../firebase/firebase";
import {Touchable} from "react-native-web";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runArray: [],
            runInformation: [],
            groupArray: [],
            groupInformation: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.getUserRunInformation()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    let runArray = [...this.state.runArray];
                    runArray.push(doc.data());
                    this.updateInputVal(runArray, "runArray");
                    console.log("Length run Array:", this.state.runArray.length);
                    this.state.runArray.push(doc.data());
                });
            })
            .then(() => {
                for (let i = 0; i < this.state.runArray.length; i++) {
                    this.getDonationRunInformation(this.state.runArray[i]["laufId"]).then((doc) => {
                            if (doc.exists) {
                                console.log("Document data (laufe):", doc.data());
                                let runInformation = [...this.state.runInformation];
                                runInformation.push(doc.data());
                                this.updateInputVal(runInformation, "runInformation");
                                console.log("Length run Information:", this.state.runInformation.length);
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }
                    )
                }
            })
            .then(() => {
                this.getUserGroupInformation()
                    .then((querySnapshot) => {
                        console.log("1")
                        querySnapshot.forEach((doc) => {

                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            let groupArray = [...this.state.groupArray];
                            groupArray.push(doc.data());
                            this.updateInputVal(groupArray, "groupArray");
                            console.log("Length group Array:", this.state.groupArray.length);
                            this.state.groupArray.push(doc.data());
                        });
                    })
                    .then(() => {
                        for (let i = 0; i < this.state.groupArray.length; i++) {
                            this.getGroupInformation(this.state.groupArray[i]["laufId"]).then((doc) => {
                                    if (doc.exists) {
                                        console.log("Document data (group):", doc.data());
                                        let groupInformation = [...this.state.groupInformation];
                                        groupInformation.push(doc.data());
                                        this.updateInputVal(groupInformation, "groupInformation");
                                        console.log("Length group Information:", this.state.groupInformation.length);
                                    } else {
                                        // doc.data() will be undefined in this case
                                        console.log("No such document!");
                                    }
                                }
                            )
                        }
                    })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    async getUserRunInformation() {
        //const userRunRef = firestore.collection('users-in-lauf').where('userId', '==', auth.currentUser.uid);
        return firestore.collection('users-in-lauf').where("userId", "==", auth.currentUser.uid).get();
        //return await userRunRef.get();
    }

    async getUserGroupInformation() {
        return firestore.collection('users-in-group').where("userId", "==", auth.currentUser.uid).get();
    }

    async getGroupInformation() {
        return firestore.collection('groups').doc("8CWX9HPgRm3av86H0vJe").get();
    }

    async getDonationRunInformation(laufId) {
        return firestore.collection('laufe').doc("T0Ti0DqJwrCBSVLHwhOz").get();
        //console.log(laufId);
        //return firestore.collection('laufe').doc(laufId).get();
    }

    getActiveRuns(index) {
        return new Date().getDate() === new Date(this.state.runInformation[index]["date"] * 1000).getDate();
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={() => this.getData()}
                >
                    <Text>press</Text>
                </TouchableOpacity>
                {this.state.runInformation.map((item, index) => {
                    return (
                        <View style={styles.container}>
                            <RunningComponent name={item["name"]}
                                              length={item["length"]}
                                              duration={item["duration"]}
                                              date={new Date(item["date"] * 1000).toLocaleDateString("de-CH")}
                                              runnerNumber={this.state.runArray[0]["runnerNumber"]}
                                              einzellaufer={true}
                                              active={true || this.getActiveRuns(index)}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '85%'
    }
})


