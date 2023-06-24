import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import styles from './styles'


const Home = ({navigation}:any) => {
    return (
        <SafeAreaView style={styles.mainConatiner}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ContactsScreen')}
                style={styles.contactsButton}>
                <Text style={styles.buttonText}>
                    {'Fetch Contacts'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home
