import React, { useEffect } from "react";
import DrinkItem from "../components/DrinkItem";
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CustomButton from '../components/CustomButton'
import axiosInstance from "../config";

const CategoryScreen = ({navigation}) => {
    
    const menuItemId = navigation.getParam("menuItemId");
    const [category, setCategory] = useState('');
    const [categoryItems, setCategoryItems] = useState([]);

    axiosInstance.get(`/product/${menuItemId}`)
    .then(res => {
        setCategory(res.data.name);
        setCategoryItems(res.data.options);
    }).catch(error => {
        console.error(error);
    })
    
    const [totalAmount, setTotalAmount] = useState(0);
    console.log(category);

    const handleUpdateTotal = (price, quantity) => {
        const updateTotal = totalAmount + (price*quantity);
        setTotalAmount(updateTotal);
    }

    const drinks = [
        {
            id: 1,
            name: 'Mocktail',
            description: 'Gin, Grenadine, Ginger, Citrus',
            price: 3000,
            image: require('../assets/mocktail.jpg')
        },
        {
            id: 2,
            name: 'Liquor',
            description: 'Gin, Grenadine, Ginger, Citrus',
            price: 4000,
            image: require('../assets/liquor.jpg')
        },
        {
            id: 3,
            name: 'Milkshake',
            description: 'Gin, Grenadine, Ginger, Citrus',
            price: 5000,
            image: require('../assets/milkshake.jpg')
        },
        {
            id: 4,
            name: 'Wine',
            description: 'Gin, Grenadine, Ginger, Citrus',
            price: 6000,
            image: require('../assets/wine.jpg')
        },
        {
            id: 5,
            name: 'Starbucks',
            description: 'Gin, Grenadine, Ginger, Citrus',
            price: 8000,
            image: require('../assets/starbucks.jpg')
        },
    ];

    const handleGoBack = () => {
        navigation.goBack();
    }

    return <View style={{flex: 1}}>
            {/* Top block */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="chevron-back-outline" size={24} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            
        {/* Middle block */}
        <View style={styles.middleBlock}>
        <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center'}}>Choose Kigali</Text>
        <Text style={{color: '#F7941D'}}>{category}</Text>
       <View style={styles.scrollview}>
            <FlatList
            ShowVerticalScrollIndicator={false}
            data={drinks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <DrinkItem drink={item} onUpdateTotal={handleUpdateTotal}/>}
            />
       </View>
       <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{color: '#F7941D', fontWeight: 'bold'}}>more drinks</Text>
        <Ionicons name="arrow-forward-outline" size={20} style={{color: '#F7941D'}}/>
       </View>
       <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20}}>
        <Text style={{fontWeight: 'bold'}}>Total Amount:</Text>
        <Text style={{color: '#F7941D', fontWeight: 'bold'}}>${totalAmount}</Text>
       </View>
       <CustomButton title='Proceed to Checkout' onPress={() => navigation.navigate('Checkout')} />
       </View>

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
}

const styles = StyleSheet.create({
    topNav: {
        // backgroundColor: 'orange',
        height: '10%',
        paddingTop: 35,
        paddingLeft: 10
    },
    icon: {
        backgroundColor: '#F8F8FB',
        color: '#F7941D',
        width: 25
    },
    middleBlock:{
        flex: 1,
        padding: 16,    
        height: '75%',
        // backgroundColor: 'red'
    },
    scrollview: {
        // backgroundColor: 'yellow',
        height: '70%'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 30,
        paddingVertical: 35,
        height: '15%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: 'gray',
        shadowOffset: {
            width: 1.0,
            height: 1.0
        },
        shadowOpacity: 1.0,
        shadowRadius: 25.0,
        elevation: 10,
        // backgroundColor: 'green'
    },
})
export default CategoryScreen;