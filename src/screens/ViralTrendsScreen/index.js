import React from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import arrow_back from '../../assets/images/arrow_back.png';
import {useState} from 'react';
import {colors} from '../../utils/colors';
import AllScreen from '../AllScreen';
const ViralTrendsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Men', 'Women', 'Kids', 'Beauty'];

  const videos = [
    {
      id: '1',
      category: 'Men',
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      image: images.viral_trendy,
      views: '12.4K',
      likes: '4.4K',
      title: 'Men Summary Outfit',
      description: 'Men',
    },
    {
      id: '2',
      category: 'Women',
      image: images.viral_trendy,
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      views: '8.2K',
      likes: '3.1K',
      title: 'Summer Collection',
      description: 'Women',
    },
    {
      id: '3',
      category: 'Kids',
      image: images.viral_image1,
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      views: '8.2K',
      likes: '3.1K',
      title: 'Kids Collection',
      description: 'Kids',
    },
    {
      id: '4',
      category: 'Beauty',
      image: images.viral_trendy,
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      views: '12.4K',
      likes: '4.4K',
      title: '5 Summary Outfit',
      description: 'Beauty',
    },
    {
      id: '5',
      category: 'Men',
      image: images.viral_trendy,
      videoUrl:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      views: '12.4K',
      likes: '4.4K',
      title: 'Men Summary Outfit',
      description: 'Men',
    },
    {
      id: '6',
      category: 'Women',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      image: images.viral_image1,
      views: '8.2K',
      likes: '3.1K',
      title: 'Summer Collection',
      description: 'Women',
    },
    {
      id: '7',
      category: 'Kids',
      image: images.viral_image1,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      views: '12.4K',
      likes: '4.4K',
      title: 'Kids Summary Outfit',
      description: 'Kids',
    },
    {
      id: '8',
      category: 'Beauty',
      image: images.viral_image1,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      views: '8.2K',
      likes: '3.1K',
      title: 'Beauty Collection',
      description: 'Beauty',
    },
  ];

  const filteredVideos =
    activeTab === 'All'
      ? videos
      : videos.filter(item => item.category === activeTab);

  const renderTabContent = () => {
    return (
      <View style={{flex: 1}}>
        <AllScreen data={filteredVideos} />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          marginTop: hp(19),
          marginHorizontal: wp(18),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow_back}
            style={{
              width: hp(18),
              height: hp(18),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: fontSize(18),
              color: '#000',
              fontFamily: fontFamily.poppins500,
            }}>
            Viral Trends
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#F2F2F2',
          height: hp(1),
          marginTop: hp(17),
        }}
      />

      {/* Horizontal, scrollable tabs */}
      <View style={{height: hp(50), marginTop: hp(17), marginBottom: hp(21)}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}>
          {tabs.map((tab, index) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isActive ? colors.black : '#F6F6F6',
                    marginRight: index === tabs.length - 1 ? 0 : wp(15),
                  },
                ]}>
                <Text
                  style={{
                    color: isActive ? colors.white : colors.black,
                    fontFamily: fontFamily.poppins400,
                    fontSize: fontSize(12),
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Tab-specific Content */}
      <View style={{flex: 1}}>{renderTabContent()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 18,
  },
  headerTitle: {
    fontSize: fontSize(18),
    color: colors.black,
    lineHeight: hp(26),
    fontFamily: fontFamily.poppins500,
  },
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  tabsContent: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(18),
  },
  tabButton: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(20),
    borderRadius: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContent: {
    flex: 1,
  },
});
export default ViralTrendsScreen;
