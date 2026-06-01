import { useEffect, useState, useRef } from "react";
import {
  View, Text, Alert, StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import {
  OFFICE_LOCATION, MAX_DISTANCE, calculateDistance,
} from "../utils/location";

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [isInsideOffice, setIsInsideOffice] = useState(true);
  const isInsideRef = useRef(true); // ref to avoid stale closure in callback

  useEffect(() => {
    let subscription;

    const startTracking = async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (location) => {
          const distanceInMeters = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude
          );

          setDistance(distanceInMeters.toFixed(2));

          if (distanceInMeters > MAX_DISTANCE) {
            // Left office — only alert and logout once
            if (isInsideRef.current) {
              isInsideRef.current = false;
              setIsInsideOffice(false);
              Alert.alert("Logged Out", "You left the office area");
              router.replace("/login");
            }
          } else {
            // Back inside office
            if (!isInsideRef.current) {
              isInsideRef.current = true;
              setIsInsideOffice(true);
            }
          }
        }
      );
    };

    startTracking();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome 👋</Text>
        <Text style={styles.name}>Shivam</Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Attendance Status</Text>
          <Text style={[styles.statusValue, { color: isInsideOffice ? "#10B981" : "#EF4444" }]}>
            {isInsideOffice ? "● Active" : "● Outside Office"}
          </Text>
        </View>

        <View style={styles.distanceBox}>
          <Text style={styles.distanceLabel}>Distance From Office</Text>
          <Text style={styles.distance}>{distance} m</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Office Radius</Text>
          <Text style={styles.infoText}>Allowed Range: {MAX_DISTANCE}m</Text>
          <Text style={styles.infoText}>Auto Logout Outside Radius</Text>
          <Text style={styles.infoText}>Auto Login When Back Inside</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", justifyContent: "center", paddingHorizontal: 20 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 25, padding: 25, elevation: 10 },
  welcome: { fontSize: 18, color: "#6B7280" },
  name: { fontSize: 34, fontWeight: "bold", color: "#111827", marginTop: 5, marginBottom: 25 },
  statusBox: { backgroundColor: "#ECFDF5", padding: 16, borderRadius: 16, marginBottom: 20 },
  statusLabel: { color: "#065F46", fontSize: 14, marginBottom: 5 },
  statusValue: { fontSize: 20, fontWeight: "bold" },
  distanceBox: { backgroundColor: "#EFF6FF", padding: 20, borderRadius: 16, marginBottom: 20 },
  distanceLabel: { color: "#1D4ED8", fontSize: 14 },
  distance: { fontSize: 32, fontWeight: "bold", color: "#2563EB", marginTop: 5 },
  infoBox: { backgroundColor: "#F9FAFB", padding: 18, borderRadius: 16 },
  infoTitle: { fontWeight: "bold", fontSize: 18, color: "#111827", marginBottom: 10 },
  infoText: { color: "#6B7280", marginBottom: 5 },
});