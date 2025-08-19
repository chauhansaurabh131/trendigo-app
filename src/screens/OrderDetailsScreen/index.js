import React from "react";
import arrow_back from '../../assets/images/arrow_back.png';
import delivery_icon from '../../assets/images/delivery_order.png';
import image_icon from '../../assets/images/imageProduct.png';
import { fontFamily, wp, fontSize, hp } from '../../utils/helpers';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderDetailsScreen = () => {
  const navigation = useNavigation();

  const handlePress = (type) => {
    console.log(`${type} pressed`);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_back}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>
      <ScrollView>
        {/* Expected Delivery */}
        <View style={styles.deliveryBox}>
          <Image
            source={delivery_icon}
            style={styles.deliveryIcon}
          />
          <Text style={styles.deliveryText}>
            <Text style={styles.deliveryHighlight}>Expected Delivery On : </Text>
            Monday , 19 Dec. 2024
          </Text>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={image_icon}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>Designer Traditional Dress</Text>
          <View style={{ borderColor: "#EBE8EB", borderBottomWidth: 1, width: "90%", marginVertical: 12 }}></View>
        </View>

        {/* Product Details */}
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.value}>S</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color</Text>
            <Text style={styles.value}>Sky Blue</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Qty</Text>
            <Text style={styles.value}>01</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.detailsBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Total Paid</Text>
            <Text style={styles.value}>Rs. 180.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid By</Text>
            <Text style={styles.value}>Mastercard</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Paid Date</Text>
            <Text style={styles.value}>02-02-2025, 10:30:10</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>BGS08975201</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FBF2FF", marginTop: 40 }]}
          onPress={() => handlePress('Track Order')}
        >
          <Text style={{ color: "#B225AF", fontFamily: fontFamily.poppins500, fontSize: wp(14) }}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F5F5F5", marginBottom: 20 }]}
          onPress={() => handlePress('Download Receipt')}
        >
          <Text style={{ color: "#000000", fontFamily: fontFamily.poppins500, fontSize: wp(14) }}>Download Receipt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backIcon: {
  width: wp(18),
      height: hp(18),
      resizeMode: 'contain',
    marginRight: 10
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginRight: 30
  },
  deliveryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    padding: 12,
    marginBottom: 15,
    width: "100%"
  },
  deliveryIcon: {
    width: 22,   // 👈 smaller size
    height: 16,  // 👈 smaller size
    marginLeft: 15
  },
  deliveryText: {
    fontSize: 14,
    color: "#000000",
    flex: 1,
    marginLeft: 15
  },
  deliveryHighlight: {
    fontWeight: "bold",
    color: "#2B9909",
    width: "100%"
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15
  },
  productImage: {
    width: 100,
    height: 130,
    borderRadius: 12,
    marginBottom: 10
  },
  productTitle: {
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
    color: "#000000",
    fontWeight: "bold"
  },
  detailsBox: {
    marginHorizontal: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EBE8EB",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 15
  },
  label: {
    fontSize: 14,
    color: "#000000",
    fontFamily: fontFamily.poppins400
  },
  value: {
    fontSize: 14,
    fontFamily: fontFamily.poppins500,
    color: "#000000"
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 10,
    paddingVertical: 13,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    fontFamily: fontFamily.poppins500,
    fontSize: wp(14),
    color: "#fff",
  },
});

export default OrderDetailsScreen;
