import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View,
} from "react-native";
import {
  MAX_DISTANCE,
  OFFICE_LOCATION,
  calculateDistance,
} from "../utils/location";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);

  // Watch location on login screen — auto login when user enters office range
  useEffect(() => {
    let subscription;

    const startWatching = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") return;

      // Check if saved credentials exist
      const saved = await AsyncStorage.getItem("savedCredentials");
      if (!saved) return; // No saved credentials = never logged in before, skip auto login

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        async (location) => {
          const dist = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude
          );

          if (dist <= MAX_DISTANCE) {
            // User is back in office range → auto login
            try {
              const { email: savedEmail, password: savedPassword } = JSON.parse(saved);

              // Validate saved credentials
              if (savedEmail !== "shivam@gmail.com" || savedPassword !== "shivam123!") {
                return;
              }

              await AsyncStorage.setItem("userToken", "logged_in");
              if (subscription) subscription.remove();
              router.replace("/(tabs)/home");
            } catch (e) {
              console.log("Auto login error:", e);
            }
          }
        }
      );
    };

    startWatching();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const handleLogin = async () => {
    // 1. Check credentials
    if (email !== "shivam@gmail.com" || password !== "shivam123!") {
      Alert.alert("Login Failed", "Invalid Email or Password");
      return;
    }

    // 2. Request foreground permission
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    if (fgStatus !== "granted") {
      Alert.alert("Permission Required", "Please allow location access");
      return;
    }

    // 3. Request background permission
    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus !== "granted") {
      Alert.alert(
        "Background Location Required",
        "Please select 'Always Allow' for location to enable auto login/logout"
      );
      return;
    }

    // 4. Get current location and check office range
    try {
      setChecking(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        OFFICE_LOCATION.latitude,
        OFFICE_LOCATION.longitude
      );

      console.log("Distance:", distance);

      if (distance > MAX_DISTANCE) {
        Alert.alert(
          "Access Denied",
          `You are ${Math.round(distance)} meters away from office`
        );
        setChecking(false);
        return;
      }

      // ✅ Save credentials for future auto-login
      await AsyncStorage.setItem("savedCredentials", JSON.stringify({ email, password }));
      await AsyncStorage.setItem("userToken", "logged_in");

      Alert.alert("Success", "Login Successful");
      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Location Error", "Unable to get current location");
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back 👋</Text>
        <Text style={styles.subHeading}>
          {checking ? "Checking location..." : "Login to continue"}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={checking}>
          <Text style={styles.buttonText}>{checking ? "Please wait..." : "Login"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.link}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "center", paddingHorizontal: 20 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 25, padding: 25, elevation: 10 },
  heading: { fontSize: 32, fontWeight: "bold", color: "#111827", marginBottom: 8 },
  subHeading: { fontSize: 16, color: "#6B7280", marginBottom: 30 },
  input: { backgroundColor: "#F3F4F6", padding: 16, borderRadius: 14, marginBottom: 18, fontSize: 16, color: "#111827" },
  button: { backgroundColor: "#2563EB", paddingVertical: 16, borderRadius: 14, marginTop: 10 },
  buttonText: { color: "#FFFFFF", textAlign: "center", fontSize: 18, fontWeight: "bold" },
  link: { marginTop: 22, textAlign: "center", color: "#2563EB", fontSize: 15, fontWeight: "600" },
});