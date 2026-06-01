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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    Alert.alert("Success", "Signup Successful");

    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>
        <Text style={styles.heading}>
          Create Account 🚀
        </Text>

        <Text style={styles.subHeading}>
          Signup to get started
        </Text>

        <TextInput
          placeholder="Enter Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>
            Signup
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/login")}
        >
          <Text style={styles.link}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
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
});