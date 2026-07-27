import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {wp, hp, fontFamily, fontSize} from '../../utils/helpers';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native';

import arrow_back from '../../assets/images/arrow_back.png';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {PRODUCT_CATEGORY_REQUEST} from '../../redux/actions/productCategoryActions';

// tab icons
import topwear_icon from '../../assets/images/topwear_men_icon.png';
import men_causal from '../../assets/images/men_causal_image.png';
import formal_image from '../../assets/images/formal_men_image.png';

import {images} from '../../assets';
const MenCategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {title, image, type} = route.params; // params receive
  const [activeTab, setActiveTab] = useState('Topwear');
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const tabs = [
    {key: 'Topwear', label: 'Topwear', icon: topwear_icon},
    {key: 'Bottomwear', label: 'Bottomwear', icon: men_causal},
    {key: 'Footwear', label: 'Footwear', icon: formal_image},
  ];
  const {
    loading: categoryLoading,
    products: categoryProducts,
    pagination,
  } = useSelector(state => state.productCategroy);

  console.log('PRODUCTS IN UI (ON SCREEN LOAD):', categoryProducts);

  console.log('CATEGORY LOADING =>', categoryLoading);
  console.log('PAGINATION =>', pagination);
  useEffect(() => {
    console.log('PRODUCT_CATEGORY_REQUEST Payload:', {
      category: activeTab,
      page: 1,
      // productType: type,
    });
    dispatch({
      type: PRODUCT_CATEGORY_REQUEST,
      payload: {
        category: activeTab,
        page: 1,
        // productType: type,
      },
    });

    setPage(1);
  }, [activeTab, type]);

  //product filtering
  const filteredProducts = categoryProducts.filter(
    item =>
      item.productTypeId?.value === type &&
      item.productCategoryId?.value === activeTab,
  );
  console.log('CATEGORY PRODUCTS =>', categoryProducts.length);
  console.log('FILTERED PRODUCTS =>', filteredProducts.length);

  const getSafeImageSource = product => {
    const variant =
      product?.variants?.find(v =>
        v.images?.some(img => img.isSelectedForMainScreen),
      ) || product?.variants?.[0];

    const image =
      variant?.images?.find(img => img.isSelectedForMainScreen) ||
      variant?.images?.[0];

    if (image?.imageUrl) {
      return {uri: image.imageUrl};
    }

    return images.trending_one;
  };
  console.log('ROUTE TYPE ===>', type);

  const loadMoreProducts = () => {
    console.log('LOAD MORE CALLED');
    console.log('HAS NEXT PAGE =>', pagination?.hasNextPage);
    console.log('CURRENT PAGE =>', page);

    if (!categoryLoading && pagination?.hasNextPage) {
      const nextPage = page + 1;

      console.log('FETCHING PAGE =>', nextPage);

      dispatch({
        type: PRODUCT_CATEGORY_REQUEST,
        payload: {
          category: activeTab,
          page: nextPage,
          // productType: type,
        },
      });

      setPage(nextPage);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrow_back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{width: wp(18)}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dynamic Banner */}
        <Image source={image} style={styles.banner} resizeMode="cover" />

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabRow}
          contentContainerStyle={styles.tabContentContainer}
          marginTop={13}>
          {tabs.map((tab, index) =>
            activeTab === tab.key ? (
              <LinearGradient
                key={tab.key}
                colors={['#5029F3', '#7756FF']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[
                  styles.activeTab,
                  index === 0 && styles.firstTab,
                  index === tabs.length - 1 && styles.lastTab,
                ]}>
                <TouchableOpacity
                  style={styles.tabContent}
                  onPress={() => setActiveTab(tab.key)}>
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
                  index === tabs.length - 1 && styles.lastTab,
                ]}
                onPress={() => setActiveTab(tab.key)}>
                <View style={styles.tabContent}>
                  <Image source={tab.icon} style={styles.tabIcon} />
                  <Text style={styles.tabText}>{tab.label}</Text>
                </View>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* Category Grid */}
        <Text style={styles.sectionTitle}>Explore {activeTab} Collections</Text>

        <View style={styles.grid}>
          {categoryLoading ? (
            <Text
              style={{
                marginTop: hp(60),
                // alignItems: 'center',
                marginLeft: wp(21),
                color: '#000',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
              }}>
              Loading...
            </Text>
          ) : filteredProducts.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                marginTop: hp(60),
                color: '#000',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(16),
                // marginLeft: wp(21),
              }}>
              No products available for {type}
            </Text>
          ) : (
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item._id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreProducts}
              onEndReachedThreshold={0.5}
              scrollEnabled={false}
              renderItem={({item}) => (
                console.log('FLATLIST DATA LENGTH =>', filteredProducts.length),
                (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        productId: item._id,
                      })
                    }
                    style={styles.card}>
                    <Image
                      source={getSafeImageSource(item)}
                      style={styles.cardImage}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.cardText}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            />
          )}
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenCategoryScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(10),
    marginBottom: hp(10),
  },
  backIcon: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
    marginLeft: wp(10),
    marginTop: hp(10),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamily.poppins500,
    fontSize: wp(18),
    color: '#000',
    marginTop: hp(15),
  },
  banner: {
    width: '100%',
    height: hp(120),
    // borderRadius: 10,
    marginBottom: hp(10),
  },
  tabRow: {marginBottom: hp(10), marginHorizontal: wp(3), right: wp(3)},
  tabContentContainer: {
    paddingHorizontal: wp(20),
    alignItems: 'center',
  },
  activeTab: {
    borderRadius: wp(25),
    marginRight: wp(15),
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
  },
  inactiveTab: {
    backgroundColor: '#f2f2f2',
    borderRadius: wp(25),
    marginRight: wp(15),
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
  },
  firstTab: {marginLeft: 0},
  lastTab: {marginRight: wp(20)},
  tabContent: {flexDirection: 'row', alignItems: 'center'},
  tabIcon: {
    width: wp(30),
    height: hp(30),
    borderRadius: wp(15),
    resizeMode: 'contain',
    right: wp(10),
  },
  activeTabText: {
    color: '#ffffff',
    fontFamily: fontFamily.poppins400,
    fontSize: fontSize(13),
    marginLeft: wp(15),
    right: wp(10),
  },
  tabText: {
    color: '#000000',
    fontFamily: fontFamily.poppins400,
    fontSize: fontSize(14),
    marginLeft: wp(8),
  },
  sectionTitle: {
    fontSize: fontSize(15),
    fontFamily: fontFamily.poppins500,
    margin: wp(18),
    color: '#000000',
    marginLeft: wp(21),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(10),
    paddingBottom: hp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '30%',
    borderRadius: wp(10),
    alignItems: 'center',
    margin: '1.5%',
    padding: wp(5),
  },
  cardImage: {
    width: wp(100),
    height: hp(100),
    marginBottom: hp(6),
    resizeMode: 'cover',
    borderRadius: wp(10),
  },
  cardText: {
    fontFamily: fontFamily.poppins400,
    fontSize: fontSize(14),
    color: '#000',
    textAlign: 'center',
  },
});
