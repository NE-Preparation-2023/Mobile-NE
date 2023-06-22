import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import SearchBar from "../components/SearchBar";
import axiosInstance from "../config";
import jwtDecode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

const ScanScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          setUserEmail(email);
        }
      } catch (error) {
        console.error("Failed to retrieve token from secure store", error);
      }
    };

    retrieveToken();
  }, []);

  const handleSearch = (searchText) => {
    axiosInstance
      .get(`/resto/search/${searchText}`)
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("ListRestaurants", { searchedResto: res.data });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} style={styles.searchBar} />
      <Text style={styles.orText}>Logged in as: {userEmail}</Text>
      <Image source={require("../assets/scan.png")} style={styles.scanLogo} />
      <Text style={styles.scanText}>Scan, Pay & Enjoy!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#475bd8",
    height: "100%",
  },
  orText: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },
  scanText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 80,
  },
  scanLogo: {
    marginLeft: 130,
    marginTop: 50,
  },
});

export default ScanScreen;
