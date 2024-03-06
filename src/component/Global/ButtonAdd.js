import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonAdd = ({ dataProduct, addButton, deleteButton }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            deleteButton(dataProduct);
          }}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{dataProduct?.quantity}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addButton(dataProduct);
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  button: {
    width: 20,
    padding: 1,
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 2,
  },
});

export default ButtonAdd;
