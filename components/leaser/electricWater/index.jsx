import { StyleSheet, Text, View } from "react-native";

const ElectricWater = () => {
  return (
    <View style={styles.container}>
      <Text>ElectricWater</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ElectricWater;
