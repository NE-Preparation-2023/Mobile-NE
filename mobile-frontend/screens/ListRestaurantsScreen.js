import React, { useEffect } from "react";
import { TouchableOpacity, Image } from "react-native";
import { StyleSheet, View, Text, FlatList} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RestaurantItem from "../components/Restaurant";
import { useState } from "react";
import axiosInstance from "../config";
import {useFetch} from "../hooks/useFetch";

const ListRestaurantsScreen = ({ navigation }) => {

    const searchedResto = navigation.getParam("searchedResto");
    const [restaurantData, setRestaurantData] = useState([]);

    useEffect(() => {
        setRestaurantData(searchedResto);
    }, [])
    // const restaurantData = useFetch('http://192.168.0.186:3000/resto/');
    // console.log(restaurantData);
    

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.topNav}>
                {/**Top block */}
                <View style={{marginLeft: 10}}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 10}}>
                    <Text>Search here...</Text>
                </View>
            </View>

            <Text style={{marginTop: 20, padding:5, marginLeft: 12, color:'#F7941D', fontSize: 12}}>Nearby Restaurant</Text>

            {/* <ScrollView style={styles.scrollview}> */}
                <View style={styles.scrollview}>
                   <FlatList 
                   showsVerticalScrollIndicator={false}
                   data={restaurantData}
                   keyExtractor={(item) => item.id}
                   renderItem={({item}) => <RestaurantItem restaurant={item} navigation={navigation}/> }
                   />
                </View>
            {/* </ScrollView> */}

            {/* Navigation bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Ionicons name="notifications" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Ionicons name="cart" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Ionicons name="settings" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Ionicons name="alarm" size={24} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topNav: {
        backgroundColor: '#F7941D',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center'
    },
    scrollview: {
        flex: 1,
        padding: 16,
        height: '75%',
        // backgroundColor: 'yellow'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30,
        paddingVertical: 35,
        height: '15%',
        // position: 'fixed',
        // bottom: 0,
        // backgroundColor: '#F7941D',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: 'gray',
        shadowOffset: {
            width: 1.0,
            height: 1.0
        },
        shadowOpacity: 1.0,
        shadowRadius: 25.0,
        elevation: 10
    },
    content: {
        padding: 20,
    }
})

export default ListRestaurantsScreen;