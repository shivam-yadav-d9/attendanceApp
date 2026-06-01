import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";

import { router } from "expo-router";
import * as Location from "expo-location";

import {
  OFFICE_LOCATION,
  MAX_DISTANCE,
  calculateDistance,
} from "../utils/location";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check Email & Password
    if (
      email !== "shivam@gmail.com" ||
      password !== "shivam123!"
    ) {
      Alert.alert(
        "Login Failed",
        "Invalid Email or Password"
      );
      return;
    }

    // Ask Location Permission
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow location access"
      );
      return;
    }

    try {
      // Get Current Location
      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

      const currentLat =
        location.coords.latitude;

      const currentLng =
        location.coords.longitude;

      const distance =
        calculateDistance(
          currentLat,
          currentLng,
          OFFICE_LOCATION.latitude,
          OFFICE_LOCATION.longitude
        );

      console.log("Distance:", distance);

      // Check Office Range
      if (distance > MAX_DISTANCE) {
        Alert.alert(
          "Access Denied",
          `You are ${Math.round(
            distance
          )} meters away from office`
        );
        return;
      }

      Alert.alert(
        "Success",
        "Login Successful"
      );

      router.push("/home");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Location Error",
        "Unable to get current location"
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>
        <Text style={styles.heading}>
          Welcome Back 👋
        </Text>

        <Text style={styles.subHeading}>
          Login to continue
        </Text>

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push("/signup")
          }
        >
          <Text style={styles.link}>
            Don't have an account? Signup
          </Text>
        </TouchableOpacity>
{/* 
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>
            Demo Credentials
          </Text>

          <Text style={styles.demoText}>
            Email: shivam@gmail.com
          </Text>

          <Text style={styles.demoText}>
            Password: shivam123!
          </Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    elevation: 10,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  link: {
    marginTop: 22,
    textAlign: "center",
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },

  demoBox: {
    marginTop: 25,
    backgroundColor: "#EEF2FF",
    padding: 15,
    borderRadius: 14,
  },

  demoTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1E3A8A",
  },

  demoText: {
    color: "#374151",
    marginBottom: 4,
  },
});