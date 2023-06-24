import React, { useState, useEffect, useRef } from 'react'
import {
    FlatList,
    Text,
    View,
    SafeAreaView,
    PermissionsAndroid,
    Platform,
    Image,
    TouchableOpacity,
} from 'react-native'
import styles from './styles';
import Contacts from 'react-native-contacts';
import SearchBar from '../../Components/SearchBar';
import { contacts } from './schema';

const ContactsScreen = () => {

    const [contacts, setContacts] = useState<Array<contacts>>([]);
    const [filterConatcts, setFilterContacts] = useState<Array<contacts>>([])
    const [emptyContactList, setEmptyContactList] = useState(false)
    const [searchText, setSearchText] = useState<string>('')
    const [selectContact, setSelectedContact] = useState<Array<contacts>>([])

    useEffect(() => {
        getContacts()
    }, [])

    // Fetch Contacts
    const getContacts = () => {
        try {
            if (Platform.OS === "android") {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                    title: "Contacts",
                    message: "This app would like to view your contacts."
                }).then((response) => {
                    console.log("PhoneContacts-response", response)
                    loadContacts();
                });
            }
            else {
                loadContacts();
            }
        } catch (error) {
            console.log("Contacts Error -->>>", error);

        }
    }
    const loadContacts = async () => {
        try {
            let sortedArray: contacts[] = []
            const response = await Contacts?.getAll()
            let info = response
            sortedArray = info.sort((a, b) => (a?.givenName > b?.givenName ? 1 : -1))
            setContacts(sortedArray)
            setFilterContacts(sortedArray)

        } catch (error) {
            console.log('contacts error==>>>', error)
        }
    }

    // Remove Selected Contacts 
    const deleteItemById = (id: string, item: contacts) => {
        const filteredData = selectContact.filter(item => item?.recordID !== id);
        setSelectedContact(filteredData)
        item.isSelected = false
    }

    // RenderItem of Contacts List
    const renderItem = (item?: contacts | any) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    let tempArray: Array<contacts> = [...selectContact]
                    item.item.isSelected = true
                    tempArray.push(item?.item)
                    setSelectedContact(tempArray)
                }}
                style={styles.contactMainContainer}>
                <View style={styles.contactCon} >
                    <View style={styles.imgCon}>
                        <View style={styles.placeholder}>
                            {
                                item?.item?.thumbnailPath ?
                                    <Image source={{ uri: item?.item?.thumbnailPath }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                                    :
                                    <Text style={styles.txt}>{item?.item?.givenName?.charAt(0)}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.contactDat}>
                        <Text style={styles.name}>
                            {item?.item?.givenName} {item?.item?.middleName && item?.item?.middleName + ' '}
                            {item?.familyName}
                        </Text>
                        <Text style={styles.phoneNumber}>
                            {item?.item?.phoneNumbers[0]?.number}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: item?.item?.isSelected ? 'white' : 'black',
                        backgroundColor: "white"
                    }}>
                    {
                        item?.item?.isSelected == true &&
                        <Image style={{ width: 25, height: 25 }} source={require('../../Icons/correct.png')} />
                    }
                </View>
            </TouchableOpacity>
        );
    };

    // RenderItem of Selected Contact List
    const selectedContactRenderItem = (item: contacts) => {
        return (
            <View style={{ margin: 5 }}>
                <View style={[styles.placeholder, { marginTop: 8 }]}>
                    {
                        item?.item?.thumbnailPath ?
                            <Image source={{ uri: item?.item?.thumbnailPath }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            :
                            <Text style={styles.txt}>{item?.item?.givenName?.charAt(0)}</Text>
                    }
                </View>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>{item?.item?.givenName}</Text>
                <TouchableOpacity
                    onPress={() => deleteItemById(item?.item?.recordID as string, item?.item)}
                    style={styles.removeImageCon}>
                    <Image style={{ width: 20, height: 20, tintColor: 'grey' }}
                        source={require('../../Icons/cross.png')} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <SearchBar
                onChangeText={(text: string) => {
                    let newSearchList = [...contacts]
                    if (text.length > 0) {
                        setEmptyContactList(false)
                        newSearchList = newSearchList?.filter((item) => {
                            return item?.givenName?.toLowerCase()?.indexOf(text.toLowerCase()) == 0
                                || item?.familyName?.toLowerCase()?.indexOf(text.toLowerCase()) == 0
                        })
                    }
                    if (newSearchList?.length === 0) {
                        setEmptyContactList(true)
                    }
                    setFilterContacts(newSearchList)
                    setSearchText(text)
                }}
                value={searchText}
            />
            {
                selectContact.length > 0 &&
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.selectedContactList}
                    horizontal
                    data={selectContact}
                    extraData={selectContact}
                    renderItem={selectedContactRenderItem}
                    keyExtractor={(item) => item && item.recordID as string}
                />
            }


            <FlatList
                data={filterConatcts}
                renderItem={renderItem}
                keyExtractor={(item) => item && item.recordID as string}
                pagingEnabled
                style={styles.list}
                ListEmptyComponent={() => {
                    if (emptyContactList) {
                        return (
                            <Text style={{
                                alignSelf: 'center',
                                textAlign: 'center',
                                color: 'black',
                                fontSize: 14
                            }}>
                                {'Contact not found'}
                            </Text>
                        )
                    }
                }}

            />
        </SafeAreaView>
    )
}

export default ContactsScreen