import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const user = {
    email: email,
    password: password
  };

  const handleSubmit = async () => {
    // Clear previous error messages
    setErrors({ email: "", password: "" });

    let formIsValid = true;

    if (email.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email is required"
      }));
      formIsValid = false;
    } else if (!isValidEmail(email.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Enter a valid email"
      }));
      formIsValid = false;
    }

    if (password.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password is required"
      }));
      formIsValid = false;
    }

    if (formIsValid) {
        try {
            const response = await axios.post("http://192.168.0.91:7000/auth/login", user);
            const token = response.data.token;
            console.log("token", token);
            // Store the user token securely
            
            await SecureStore.setItemAsync("token", token);

            console.log("User login successful");
            navigation.navigate("Scan");
            setEmail("");
            setPassword("");
          } catch (error) {
            console.error("Login failed", error);
          }
    }
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Spooky</Text>
      <Text style={styles.welcome}>Welcome...</Text>
      <Text style={styles.grayText}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {errors.email !== "" && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      {errors.password !== "" && <Text style={styles.errorText}>{errors.password}</Text>}

      <CustomButton title="Sign In" onPress={handleSubmit} />
      <Text style={styles.or}>OR</Text>
      <CustomButton
        title="Login with Google"
        onPress={handleSubmit}
        buttonStyle={styles.googleButton}
        textStyle={styles.textStyle}
      />
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      <Text style={styles.register}>
        Don't have an account?{" "}
        <Text style={styles.spanText} onPress={() => navigation.navigate("Signup")}>
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
    color: "#475bd8",
    marginTop: 50
  },
  spanText: {
    color: "#475BD8"
  },
  welcome: {
    fontSize: 13,
    fontWeight: "bold",
    color: "darkblue",
    marginLeft: 145,
    paddingTop: 15,
    paddingBottom: 6
  },
  grayText: {
    fontSize: 11,
    color: "gray",
    marginLeft: 120,
    marginBottom: 20
  },
  input: {
    width: "90%",
    height: 40,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderColor: "#00000017",
    borderRadius: 7,
    marginLeft: 20,
    backgroundColor: "#E2E5FA"
  },
  or: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
    marginLeft: 170,
    marginBottom: 10,
    marginTop: 10
  },
  forgotPassword: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#475BD8",
    marginLeft: 130,
    marginBottom: 20
  },
  register: {
    fontSize: 11,
    color: "gray",
    marginLeft: 120,
    marginTop: 10,
    marginBottom: 10
  },
  googleButton: {
    borderWidth: 1,
    borderColor: "#475BD8",
    backgroundColor: "#fff",
    color: "#475BD8"
  },
  textStyle: {
    color: "#475BD8"
  },
  errorText: {
    fontSize: 11,
    color: "red",
    marginLeft: 20,
    marginBottom: 10
  }
});

export default Loginscreen;
