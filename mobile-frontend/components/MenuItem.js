import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const MenuItem = ({ menuItem, navigation }) => {
  const handleCategoryPress = () => {
        navigation.navigate('Category', {menuItemId: menuItem._id})
    }

  return (
    <TouchableOpacity onPress={() => handleCategoryPress()} style={styles.menuItem}>
          <Text style={styles.itemText}>{menuItem.generalName}</Text>
            <Ionicons name="chevron-forward-outline" size={20} style={{color: 'white', paddingRight: 30}}/>
        </TouchableOpacity>
  )
}

export default MenuItem;

const styles = StyleSheet.create({
    menuItem:{
        color: 'white',
        fontSize: 20,
        padding: 13,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between"
  },
  
  itemText: {
    paddingLeft: 50,
    fontSize: 17,
    color: 'white'
}
})