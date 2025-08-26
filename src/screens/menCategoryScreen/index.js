import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { wp, fontFamily } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";

// Images
import arrow_back from "../../assets/images/arrow_back.png";
import banner_icon from "../../assets/images/banner_men_icon.png";
import topwear_icon from "../../assets/images/topwear_men_icon.png";
import bottomwear_image from "../../assets/images/bottomwear_men_image.png";
import footwear_image from "../../assets/images/footwear_men_image.png";

// Topwear
import tishrt_icon from "../../assets/images/tishrt_men_icon.png";
import men_causal from "../../assets/images/men_causal_image.png";
import formal_image from "../../assets/images/formal_men_image.png";
import jacket_image from "../../assets/images/jacket_men_image.png";
import blazer_image from "../../assets/images/blazer_men_image.png";
import coat_image from "../../assets/images/coat_men_image.png";
import suit_image from "../../assets/images/suit_men_image.png";
import rain_image from "../../assets/images/rain_men_image.png";
import caps_image from "../../assets/images/caps_men_image.png";

const MenCategoryScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Topwear");

  const tabs = [
    { key: "Topwear", label: "Topwear", icon: topwear_icon },
    { key: "Bottomwear", label: "Bottomwear", icon: men_causal },
    { key: "Footwear", label: "Footwear", icon: formal_image },
  ];

  // Data for each category
  const categoryData = {
    Topwear: [
      { image: tishrt_icon, name: "T-Shirts" },
      { image: men_causal, name: "Casual Shirts" },
      { image: formal_image, name: "Formal Shirts" },
      { image: jacket_image, name: "Jackets" },
      { image: blazer_image, name: "Blazers" },
      { image: coat_image, name: "Coats" },
      { image: suit_image, name: "Suits" },
      { image: rain_image, name: "Rain Jackets" },
      { image: caps_image, name: "Caps" },
    ],
    Bottomwear: [
      { image: blazer_image, name: "Hip-Hop" },
      { image: coat_image, name: "Cargo-Pants" },
      { image: suit_image, name: "Baggy-Pants" },
      { image: rain_image, name: "Joggers" },
      { image: caps_image, name: "Board-Shorts" },
      { image: suit_image, name: "Touser" },
      { image: rain_image, name: "Jeans" },
      { image: caps_image, name: "Bell-Bottoms" },
      { image: jacket_image, name: "Shorts" },
      { image: jacket_image, name: "Shorts" },
      { image: jacket_image, name: "Shorts" },
    ],
    Footwear: [
      { image: tishrt_icon, name: "Sandals" },
      { image: men_causal, name: "Casual Shoes" },
      { image: formal_image, name: "Formal Shoes" },
      { image: jacket_image, name: "Boots-Shoes" },
      { image: jacket_image, name: "Loafers" },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrow_back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Men's Collection</Text>
        <View style={{ width: wp(18) }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <Image source={banner_icon} style={styles.banner} resizeMode="contain" />

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabRow}
          contentContainerStyle={styles.tabContentContainer}
          marginTop={13}
        >
          {tabs.map((tab, index) =>
            activeTab === tab.key ? (
              <LinearGradient
                key={tab.key}
                colors={["#8225AF", "#0F52BA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.activeTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab
                ]}
              >
                <TouchableOpacity
                  style={styles.tabContent}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Image source={tab.icon} style={styles.tabIcon} />
                  <Text style={styles.activeTabText}>{tab.label}</Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.inactiveTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <View style={styles.tabContent}>
                  <Image source={tab.icon} style={styles.tabIcon} />
                  <Text style={styles.tabText}>{tab.label}</Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        {/* Category Grid */}
        <Text style={styles.sectionTitle}>
          Explore {activeTab} Collections
        </Text>
        <View style={styles.grid}>
          {categoryData[activeTab].map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenCategoryScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backIcon: {
    width: wp(18),
    height: wp(18),
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: "#000",
    marginTop: 15,
  },
  banner: { 
    width: "100%", 
    height: 110, 
    borderRadius: 10,
    marginBottom: 10
  },
  tabRow: { 
    marginBottom: 10,
    marginHorizontal: 3,
    // backgroundColor: "#000"
  },
  tabContentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  activeTab: {
    borderRadius: 25,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  inactiveTab: {
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    marginRight: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  firstTab: {
    marginLeft: 0,
  },
  lastTab: {
    marginRight: 20
  },
  tabContent: { 
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    // marginRight:5,
    // marginHorizontal:15
  },
  tabIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "contain",
    right:8
  },
  activeTabText: {
    color: "#ffffff",
    fontFamily: fontFamily.poppins400,
    fontSize: 13,
    marginLeft: 15,
    right:10
  },
  tabText: {
    color: "#000000",
    fontFamily: fontFamily.poppins400,
    fontSize: 14,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: fontFamily.poppins500,
    margin: 18,
    color: "#000000",
    marginLeft: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    width: "30%",
    borderRadius: 10,
    alignItems: "center",
    margin: "1.5%",
    padding: 5,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 6,
    resizeMode: "contain",
    borderRadius: 10,
  },
  cardText: {
    fontFamily: fontFamily.poppins500,
    fontSize: 13,
    color: "#000",
    textAlign: "center",
  },
});