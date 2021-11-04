import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Menu, MenuItem, MenuGroup, Button, Icon} from '@ui-kitten/components'
import {AntDesign, Feather, Ionicons} from "@expo/vector-icons";

const EditIcon = (props) => (
    <Icon name='edit-2' {...props} />
    /*    <Feather name="edit-2" size={24} color="black" />*/
);
const StarIcon = (props) => (
    <Icon name='star' {...props} />
    /*    <Feather name="edit-2" size={24} color="black" />*/
);

const ForwardIcon = (props) => (
    <Ionicons name="arrow-forward-circle-outline" size={32}/>
);

const SmartphoneIcon = (props) => (
    <Ionicons {...props} name='smartphone-outline'/>
);

export default class SettingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    goToProfile() {
        const {navigation} = this.props;
        console.log("Hello")
        navigation.navigate("Profile");
    }


    render() {
        return (
            <View style={styles.container}>
                <Menu>
                    <MenuItem title='Profile'
                              accessoryRight={ForwardIcon}
                              onPress={() => this.goToProfile()}/>

                    <MenuItem title='Orders'
                              accessoryRight={ForwardIcon}
                              onPress={() => this.goToProfile()}/>

                    <MenuItem title='Transactions'
                              accessoryRight={ForwardIcon}/>

                    <MenuGroup title='Akveo React Native' accessoryLeft={StarIcon}>
                        <MenuItem title='UI Kitten' accessoryLeft={StarIcon}/>
                        <MenuItem title='Kitten Tricks' accessoryLeft={StarIcon}/>
                    </MenuGroup>
                </Menu>
                <TouchableOpacity
                    onPress={() => this.goToProfile()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        margin: 8,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
