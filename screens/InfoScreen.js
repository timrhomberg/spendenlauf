import React from 'react'
import {Text, Layout} from '@ui-kitten/components'
import * as Linking from 'expo-linking';
import {StyleSheet, TouchableOpacity} from "react-native";

export default class InfoScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleOpenWithLinking() {
        Linking.openURL('https://github.zhaw.ch/rhombtim/moba1');
    };

    render() {
        return (
            <Layout level="3">
                <Text category='h2' style={styles.container}>Herausgeber</Text>
                <Text style={styles.text}>Tim Rhomberg</Text>
                <Text style={styles.text}>IT Student</Text>

                <Text category='h2' style={styles.container}>Quellcode</Text>
                <Text style={styles.text}>Der Quellcode der Spendenlauf App ist Open-Source und kann auf GitHub eingesehen werden.</Text>
                <TouchableOpacity
                    onPress={() => this._handleOpenWithLinking()}
                >
                    <Text style={{color: 'blue', paddingLeft: 15}}>github.zhaw.ch/rhombtim/moba1</Text>
                </TouchableOpacity>

                <Text category='h2' style={styles.container}>Version 1.0.0</Text>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        padding: 15,
    },
    text: {
        paddingLeft: 15
    }
})
