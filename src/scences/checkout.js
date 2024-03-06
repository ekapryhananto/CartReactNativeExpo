import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const checkout = ({ navigation, route }) => {
  const data = route.params;
  console.log("data checkout", route.params);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 12 }}>
          <View>
            <FlatList
              data={data?.dataProduct}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.dataCheckout}>
                  <Text>Nama Product : {item.product}</Text>
                  <Text>Nama Clinic : {item.nama_clinic}</Text>
                  <Text>Price : {item.price}</Text>
                  <Text>Jumlah : {item.quantity}</Text>
                </View>
              )}
            />
            <Text style={{ marginTop: 4 }}>
              Total Price : {data.totalPrice}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default checkout;

const styles = StyleSheet.create({
  dataCheckout: {
    backgroundColor: "#d4d4d4",
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
  },
});
