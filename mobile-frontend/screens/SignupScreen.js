import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const user = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  };

  const handleSubmit = async () => {
    // Clear previous error messages
    setErrors({
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });

    let formIsValid = true;

    if (fullName.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        fullName: "Full Name is required",
      }));
      formIsValid = false;
    }

    if (phoneNumber.trim() === "") {
        setErrors((prevState) => ({
          ...prevState,
          phoneNumber: "Phone Number is required",
        }));
        formIsValid = false;
      } else if (!/^\d+$/.test(phoneNumber)) {
        setErrors((prevState) => ({
          ...prevState,
          phoneNumber: "Invalid Phone Number",
        }));
        formIsValid = false;
      }

    if (email.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      formIsValid = false;
    } else if (!isValidEmail(email.trim())) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Enter a valid email",
      }));
      formIsValid = false;
    }

    if (password.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        await axios.post("http://192.168.0.91:7000/auth/signup", user);
        console.log("User registered successfully");
        navigation.navigate("Login");
        setEmail("");
        setFullName("");
        setPassword("");
        setPhoneNumber("");
      } catch (error) {
        console.error("Signup failed", error);
      }
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Spooky</Text>
      <Text style={styles.welcome}>Welcome...</Text>
      <Text style={styles.grayText}>Please fill in the information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
      {errors.fullName !== "" && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      {errors.phoneNumber !== "" && <Text style={styles.error}>{errors.phoneNumber}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      {errors.password !== "" && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {errors.email !== "" && <Text style={styles.error}>{errors.email}</Text>}

      <CustomButton title="Signup" onPress={handleSubmit} style={{ marginTop: 30 }} />

      <Text style={styles.register}>
        Already have an account?{" "}
        <Text style={styles.spanText} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
    color: "#475bd8",
    marginTop: 50,
  },
  spanText: {
    color: "#475bd8",
  },
  welcome: {
    fontSize: 13,
    fontWeight: "bold",
    color: "darkblue",
    marginLeft: 145,
    paddingTop: 15,
    paddingBottom: 6,
  },
  grayText: {
    fontSize: 11,
    color: "gray",
    marginLeft: 120,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    height: 40,
    fontSize: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "#00000017",
    borderRadius: 7,
    marginLeft: 20,
    backgroundColor: "#E2E5FA",
  },
  or: {
    fontWeight: "bold",
    fontSize: 12,
    color: "gray",
    marginLeft: 170,
    marginBottom: 10,
    marginTop: 10,
  },
  register: {
    fontSize: 11,
    color: "gray",
    marginLeft: 120,
    marginTop: 10,
    marginBottom: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default SignupScreen;
