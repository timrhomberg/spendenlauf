import React from 'react'
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native'
import {Layout, Text} from "@ui-kitten/components";
import RunningComponent from "../components/RunningComponent";
import ExampleComponent from "../components/ExampleComponent";
import {auth, firestore} from "../firebase/firebase";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runArray: [],
            runInformation: [],
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
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    getDate() {
        console.log(this.state.runInformation.length);
        console.log(this.state.runInformation[0]["date"] * 1000);
        //this.state.runInformation[0]["date"].padEnd(13, '0');
    }

    async getUserRunInformation() {
        //const userRunRef = firestore.collection('users-in-lauf').where('userId', '==', auth.currentUser.uid);
        return firestore.collection('users-in-lauf').where("userId", "==", auth.currentUser.uid).get();
        //return await userRunRef.get();
    }

    async getDonationRunInformation(laufId) {
        return firestore.collection('laufe').doc("T0Ti0DqJwrCBSVLHwhOz").get();
        //console.log(laufId);
        //return firestore.collection('laufe').doc(laufId).get();
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Content of run Array", this.state.runArray);
                        console.log("Size of run Array", this.state.runArray.length);
                        console.log("Lauf Id from Array", this.state.runArray[0]["laufId"]);
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Data from state</Text>
                </TouchableOpacity>

                <Text>Info: {this.state.runInformation.length}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.getUserRunInformation().then((querySnapshot) => {
                            console.log("pressed")
                            querySnapshot.forEach((doc) => {
                                console.log(doc.exists)
                                console.log(doc.data())

                                // doc.data() is never undefined for query doc snapshots
                                console.log("LOADED", doc.id, " => ", doc.data());
                                this.updateInputVal(doc.data(), 'runs');
                                this.updateInputVal(doc.data()["runnerNumber"], 'runnerNumber');
                                this.updateInputVal(doc.data()["laufId"], 'laufId');


                            });
                        })
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Get Data</Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    <ExampleComponent style={styles.example}/>
                </View>

                {this.state.runInformation.map((item, index) => {
                    return (
                        <View>
                            <Text>{item["name"]} ({item["length"]}m)</Text>
                            <Text>Dauer: {item["duration"]}min</Text>
                            <Text>Datum: {new Date(item["date"] * 1000).toLocaleString()}</Text>
                            <Text>Laufnummer: {this.state.runArray[0]["runnerNumber"]}</Text>
                            <Text>Ist Einnzelläufer: {this.state.runArray[0]["einzellaufer"]}</Text>
                            <Text>{item["vereinId"]}</Text>
                            <RunningComponent name={item["name"]} length={item["length"]} duration={item["duration"]}/>
                        </View>
                    )
                })}


            </ScrollView>
        )
    }
}

/*
                {this.items.map((item,index)=>{
                    return (
                        <View style={styles.container}>
                            <Text>{item}</Text>
                            <RunningComponent style={styles.con}/>
                        </View>
                    )
                })}
 */
const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '80%'
    },

})


