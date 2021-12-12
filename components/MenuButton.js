import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";

export default class MenuButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
            onPress={() => this.goToProfile()}
            style={styles.button}
        >
            <Text style={styles.buttonText}>
                <AntDesign name='user' size={24}/>
                Profile
            </Text>
        </TouchableOpacity>
        )
    }
}
