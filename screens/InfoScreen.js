import React from 'react'
import {Text, Layout} from '@ui-kitten/components'

export default class InfoScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Text category='h2'>Herausgeber</Text>
                <Text category='c1'>Tim Rhomberg</Text>

                <Text category='h2'>Version 1.0.0</Text>
            </Layout>
        )
    }
}
