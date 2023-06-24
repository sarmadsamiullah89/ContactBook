import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    list: {
        width:'100%',
        height:'90%',
        backgroundColor:'white',
    },
    contactMainContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        width:'95%',
        alignSelf:'center'
    },
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: '#888',
    },
    selectedContactList:{
        width:'95%',
        height:100,
        alignSelf:'center',
    },
    removeImageCon:{
            width: 10,
            height: 10,
            position: "absolute",
            top: 5,
            right: 10
    }
});