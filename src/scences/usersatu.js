import React, { useState, useEffect } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { dataCart } from "../constants/data";
import ButtonAdd from "../component/Global/ButtonAdd";

function UserSatu({ navigation }) {
  const [data, setData] = useState();
  const [check, setCheck] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);
  var totalPrice = 0;
  useEffect(() => {
    getData();
  }, [totalHarga]);

  const getData = () => {
    const newData = dataCart.map((item) => {
      return {
        ...item,
        isChecked: false,
        data: item.data.map((data) => {
          if (data.product == "Beras") {
            return {
              ...data,
              isChecked: false,
              quantity: 1,
              minOrder: 2,
            };
          }
          if (data.product == "Yamie") {
            return {
              ...data,
              isChecked: false,
              quantity: 1,
              minOrder: 4,
            };
          }
          if (data.product == "Mie") {
            return {
              ...data,
              isChecked: false,
              quantity: 1,
              maxOrder: 3,
            };
          } else {
            return {
              ...data,
              isChecked: false,
              quantity: 1,
            };
          }
        }),
      };
    });
    setData(newData);
  };

  const addCount = (dataCount) => {
    var addData = [...data];
    addData.forEach((item) => {
      item.data.forEach((data) => {
        if (data.product == dataCount.product) {
          if (!data.hasOwnProperty("quantity")) {
            data.quantity = 1;
          } else if (
            data.hasOwnProperty("maxOrder") &&
            data.maxOrder == dataCount.quantity
          ) {
            Alert.alert(
              "Info",
              "Mencapai batas maxsimal order",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          } else {
            data.quantity += 1;
          }
        }
      });
    });
    return setData(addData);
  };
  const deleteCount = (dataCount) => {
    var addData = [...data];
    addData.forEach((item) => {
      item.data.forEach((data) => {
        if (data.product == dataCount.product) {
          if (!data.hasOwnProperty("quantity")) {
            data.quantity = 1;
          } else if (
            data.hasOwnProperty("minOrder") &&
            dataCount.quantity == data.minOrder
          ) {
            Alert.alert(
              "Info",
              "Mencapai batas minimal order",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          } else if (dataCount.quantity > 1) {
            data.quantity -= 1;
          }
        }
      });
    });
    return setData(addData);
  };

  const handleCheckProduct = (isChecked, product) => {
    var addData = [...data];
    addData.forEach((item) => {
      item.data.forEach((data) => {
        if (data.id == product.id && data.product == product.product) {
          data.isChecked = !isChecked;
        }
      });
    });
    return setData(addData);
  };

  const handleCheckClinic = (clinic) => {
    var addData = [...data];
    addData.forEach((item) => {
      if (item.clinic_name == clinic) {
        item.isChecked = !item.isChecked;
        item.data.forEach((data) => {
          data.isChecked = item.isChecked;
        });
      }
    });
    return setData(addData);
  };

  const handleCheckAll = () => {
    var addData = [...data];
    if (check == false) {
      addData.forEach((item) => {
        item.isChecked = true;
        item.data.forEach((data) => {
          data.isChecked = true;
        });
      });
    } else {
      addData.forEach((item) => {
        item.isChecked = false;
        item.data.forEach((data) => {
          data.isChecked = false;
        });
      });
    }
    setCheck(!check);
    return setData(addData);
  };

  const SliderItem = ({ data }) => {
    return (
      <View style={styles.cart}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              handleCheckProduct(data.isChecked, data);
            }}
          >
            <View
              style={{
                width: 14,
                height: 14,
                borderColor: "black",
                backgroundColor: data.isChecked ? "black" : "white",
                borderWidth: 1,
                marginRight: 5,
                paddingVertical: 7,
              }}
            ></View>
          </TouchableOpacity>
          <View>
            <Text>{data?.product}</Text>
            <Text>{data?.price}</Text>
          </View>
        </View>
        <ButtonAdd
          dataProduct={data}
          addButton={addCount}
          deleteButton={deleteCount}
        />
      </View>
    );
  };

  const handleTotal = () => {
    data?.forEach((item) => {
      item.data.forEach((data) => {
        if (data.isChecked) {
          totalPrice += data.price * data.quantity;
        }
      });
    });
    return totalPrice;
  };

  const handleCheckout = () => {
    let dataProduct = [];
    let totalCheck = [];
    let minsProduct = [];
    data?.forEach((item) => {
      item.data.forEach((data) => {
        if (data.isChecked && data.quantity < data.minOrder) {
          minsProduct += 1;
          Alert.alert(
            "Info",
            `Order ada pada ${data.product} kurang dari ${data.minOrder}`,
            [
              {
                text: "Close",
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
          minsProduct += 1;
          totalCheck += 1;
        } else if (data.isChecked) {
          totalCheck += 1;
          data.nama_clinic = item.clinic_name;
          dataProduct.push(data);
        }
      });
    });
    if (totalCheck.length == 0) {
      Alert.alert(
        "Info",
        "Tidak ada yang di checkout",
        [
          {
            text: "Close",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else if (totalCheck.length > 0 && minsProduct == 0) {
      navigation.navigate("checkout", { dataProduct, totalPrice });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: "row", padding: 8 }}>
          <TouchableOpacity
            style={{
              width: 14,
              height: 14,
              borderColor: "black",
              backgroundColor: check ? "black" : "white",
              borderWidth: 1,
              marginRight: 5,
            }}
            onPress={() => {
              handleCheckAll();
            }}
          />
          <Text>Pilih Semua</Text>
        </View>
        {data?.map((item) => {
          return (
            <View style={{ padding: 8 }}>
              <View style={styles.cartClinic}>
                <TouchableOpacity
                  style={{
                    width: 14,
                    heihght: 24,
                    borderColor: "black",
                    backgroundColor: item.isChecked ? "black" : "white",
                    borderWidth: 1,
                    marginRight: 5,
                  }}
                  onPress={() => {
                    handleCheckClinic(item.clinic_name);
                  }}
                />
                <Text>{item?.clinic_name}</Text>
              </View>
              <FlatList
                data={item?.data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => <SliderItem data={item} />}
              />
            </View>
          );
        })}
        <Text style={{ padding: 8 }}>Total Harga : {handleTotal()}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleCheckout();
          }}
        >
          <Text style={styles.text}>Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserSatu;

const styles = StyleSheet.create({
  cart: {
    backgroundColor: "#d4d4d4",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  cartClinic: {
    backgroundColor: "#d4d4d4",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "blue",
    width: "80%",
    borderRadius: 10,
    padding: 12,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
  },
});
