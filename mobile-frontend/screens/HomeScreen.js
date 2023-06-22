import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = ({navigation}) => {
    
    useEffect(() => {
        //set timeout to navigate to signup page
        const timeout = setTimeout(() => {
            navigation.navigate('Signup');
        }, 1000);
        return () => clearTimeout(timeout)
    }, [])

    return (
        <View style={styles.root}>
          <Text style={styles.spooky}>
            {`Spooky`}
          </Text>
        </View>
      );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
      flexDirection: 'column',
      backgroundColor: '#475bd8',
      justifyContent: 'center',
        alignItems: 'center',
    },
    spooky: {
      height: 42,
      fontSize: 35,
      fontWeight: '700',
      textAlign: 'left',
      textAlignVertical: 'top',
      color: '#ffffff',
    },
  });
  
export default HomeScreen;