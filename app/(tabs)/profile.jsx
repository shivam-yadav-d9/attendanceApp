import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTag}>PROFILE</Text>
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubTitle}>
          Manage your account and personal details.
        </Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={55} color="#fff" />
        </View>

        <Text style={styles.name}>Shivam Yadav</Text>
        <Text style={styles.role}>Sales Executive</Text>
      </View>

      {/* Info Cards */}
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <View style={styles.infoCard}>
        <Ionicons name="mail-outline" size={24} color="#F59E0B" />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>shivam@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="call-outline" size={24} color="#F59E0B" />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 9876543210</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="business-outline" size={24} color="#F59E0B" />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Department</Text>
          <Text style={styles.value}>Sales</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="card-outline" size={24} color="#F59E0B" />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Employee ID</Text>
          <Text style={styles.value}>EMP001</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
        <View style={styles.infoContent}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, { color: "#10B981" }]}>Active</Text>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#0B2D52",
    height: 240,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 70,
  },

  headerTag: {
    color: "#F59E0B",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 1,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 10,
  },

  headerSubTitle: {
    color: "#D1D5DB",
    fontSize: 16,
    marginTop: 8,
  },

  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -55,
    borderRadius: 25,
    paddingVertical: 25,
    alignItems: "center",
    elevation: 8,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 15,
  },

  role: {
    color: "#6B7280",
    fontSize: 16,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 20,
    elevation: 3,
  },

  infoContent: {
    marginLeft: 15,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
  },

  value: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 3,
  },
});