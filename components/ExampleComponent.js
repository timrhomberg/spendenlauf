import React from "react";
import {StyleSheet, View} from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";


export default class ExampleComponent extends React.Component {
    render() {
        return (
            <View style={styles.element}>
                <Button status='primary'>
                    Test
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})
