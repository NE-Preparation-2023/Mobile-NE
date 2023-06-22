import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import TopTabs from "../components/topTabs";
import { FlatList } from "react-native-gesture-handler";
import MomoOptions from "../components/Momo";
import CreditCard from "../components/CreditCard";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";

const CheckoutScreen = ({navigation}) => {
    const [activeTab, setActiveTab] = useState("momo");

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <ScrollView style={styles.scrollView}>
        {/* details */}
        <View style={styles.detailsView}>
          <View style={{ width: "91%", height: "100%", marginHorizontal: 20 }}>
            <View style={styles.backIcon}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="#25D482"
                onPress={handleGoBack}
              />
            </View>
  
            <View
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View>
                <Text style={styles.pageTitle}>Checkout</Text>
                <Image source="" resizeMode="contain" />
              </View>
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    { color: "#25D482", marginBottom: 10 },
                    styles.pageTitle,
                  ]}
                >
                  Frw 16,000
                </Text>
                <Text style={{ color: "#B1B1B1" }}>Including VAT(18%)</Text>
              </View>
            </View>
          </View>
        </View>
  
        {/* <TopTabs/> */}
        <View style={styles.togglePayment}>
          <TouchableOpacity
            onPress={() => setActiveTab("creditCard")}
            style={styles.toggleItem}
          >
            <Text style={styles.toggleInactive}>Credit Card</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => setActiveTab("momo")}
            style={[styles.toggleItem, styles.toggleItemActive]}
          >
            <Text style={styles.toggleActive}>Mobile & Cash</Text>
          </TouchableOpacity>
        </View>
  
            {activeTab == "momo" ? <MomoOptions /> : <CreditCard />}
            
            <View style={{width:'100%',display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <Text style={styles.pageText}>We will send you an order details to your email after the successfull payment</Text>
            </View>
  
        <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('Success')} >
            <Image source={require('../assets/lock.png')} resizeMode="cover" style={{marginRight: 15}} />
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Pay for the order</Text>
        </TouchableOpacity>

    </ScrollView>
          
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#ffffff',
      overflow: 'scroll'
      },
      
      scrollView: {
          flexGrow: 1,
          maxHeight: '100%'
        },
  
    detailsView: {
      backgroundColor: "#ffffff",
      width: "96%",
      height: "32%",
      borderBottomEndRadius: 15,
      borderBottomLeftRadius: 15,
      elevation: 20,
      shadowColor: "#25D482",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
    },
  
    backIcon: {
      backgroundColor: "#f8f8fb",
      width: 40,
      height: 40,
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 30,
    },
  
    pageTitle: {
      fontStyle: "bold",
      fontSize: 20,
    },
  
    flexHorizontal: {
      display: "flex",
    },
  
    togglePayment: {
      backgroundColor: "#F8F8FB",
      height: "8.5%",
      width: "80%",
      borderRadius: 14,
      marginHorizontal: 35,
      position: "absolute",
      top: 190,
      elevation: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  
    toggleItem: {
      width: "50%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 14,
    },
  
    toggleItemActive: {
      backgroundColor: "#25D482",
    },
  
    toggleInactive: {
      font: "bold",
      fontSize: 18,
    },
  
    toggleActive: {
      color: "#ffffff",
      fontStyle: "normal",
      fontSize: 18,
    },
  
    momoOption: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 20, //use padding for height
      width: "100%",
      },
    
      pageText: {
          color: '#B1B1B1',
          fontSize: 15,
          width: '60%',
          textAlign: 'center'
    },

    paymentButton: {
        width: "90%",
        marginHorizontal: 20,
        padding: SIZES.padding,
        backgroundColor: '#25D482',
        alignItems: "center",
        borderRadius: 13,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70
    }
  });

export default CheckoutScreen;