import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const AddHomeNext = () => {
  return (
    <View style={styles.content}>
      <View style={styles.roomInformation}>
        <Text style={styles.roomExtensionTitle}>Mô tả phòng</Text>
        <ScrollView
          vertical={true}
          showsVerticalScrollIndicator={false}
          style={styles.extensionsOverlay}
        >
          <View>
            <View style={styles.roomItem}>
              <Text>Tiêu đề</Text>
              <TextInput
                multiline={true}
                numberOfLines={2}
                style={styles.roomInput}
              />
            </View>
            <View style={styles.roomItem}>
              <Text>Mô tả chi tiết</Text>
              <TextInput
                multiline={true}
                numberOfLines={6}
                style={styles.roomInput}
              />
            </View>
            <View style={styles.roomItem}>
              <Text>Hình ảnh</Text>
              <TextInput
                multiline={true}
                numberOfLines={6}
                style={styles.roomInput}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    height: 500,
  },
  roomInformation: {
    width: "94%",
    height: "auto",
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
  },
  roomExtensionTitle: {
    width: "100%",
    height: "auto",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "#ABB4BD",
    borderBottomWidth: 1,
  },
  extensionsOverlay: {
    width: "100%",
  },
  extensions: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: 600,
  },
  extensionsItem: {
    width: 140,
    height: 40,
    marginBottom: 5,
  },
  roomItem: {
    marginBottom: 10,
  },
  roomInput: {
    width: "100%",
    borderColor: "#ABB4BD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
});

export default AddHomeNext;
