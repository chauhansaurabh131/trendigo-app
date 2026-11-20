import React, {useRef} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import {
  ApplyFilterButton,
  CloseButton,
  FiledRound,
  PriceIcon,
  RelevenceIcon,
  RoundView,
  TrendigIcon,
  DefaultViw,
  images,
  ArrivalsIcon,
  NewIcon,
} from '../../assets';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {useState} from 'react';
const SortComponent = ({onClose}) => {
  const [selectedSort, setSelectedSort] = useState('Popularity & Trending');
  const bottomSheetRef = useRef(null);
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: wp(16)}}>
        <View
          style={{
            width: '100%',
            height: hp(55),
            backgroundColor: '#FFF',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: '#171717',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(18),
            }}>
            Sort By
          </Text>

          <Text
            style={{
              color: '#431EE4',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            CLEAR ALL
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
          }}
        />
        <TouchableOpacity
          onPress={() => setSelectedSort('Relevance')}
          style={{
            borderWidth: selectedSort === 'Relevance' ? 2 : 1,
            borderColor: selectedSort === 'Relevance' ? '#5038ED' : '#E5E5E5',
            height: hp(64),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RelevenceIcon />

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(12),
                marginLeft: wp(12),
              }}>
              Relevance
            </Text>
            <View style={{marginLeft: wp(6)}}>
              <DefaultViw />
            </View>
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedSort === 'Relevance' ? <FiledRound /> : <RoundView />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedSort('Popularity & Trending')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderWidth: selectedSort === 'Popularity & Trending' ? 2 : 1,
            borderColor:
              selectedSort === 'Popularity & Trending' ? '#5038ED' : '#E5E5E5',
            height: hp(64),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TrendigIcon />

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(12),
                marginLeft: wp(12),
              }}>
              Popularity & Trending
            </Text>
            <View style={{marginLeft: wp(6)}}>
              <Image
                source={images.hot_image}
                style={{width: wp(42), height: hp(19)}}
              />
            </View>
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedSort === 'Popularity & Trending' ? (
              <FiledRound />
            ) : (
              <RoundView />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedSort('Price Low to High')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderWidth: selectedSort === 'Price Low to High' ? hp(2) : hp(1),
            borderColor:
              selectedSort === 'Price Low to High' ? '#5038ED' : '#E5E5E5',
            height: hp(64),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PriceIcon />

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(12),
                marginLeft: wp(12),
              }}>
              Price: Low to High
            </Text>
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedSort === 'Price Low to High' ? (
              <FiledRound />
            ) : (
              <RoundView />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedSort('Price High to Low')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderWidth: selectedSort === 'Price High to Low' ? hp(2) : hp(1),
            borderColor:
              selectedSort === 'Price High to Low' ? '#5038ED' : '#E5E5E5',
            height: hp(64),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PriceIcon />

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(12),
                marginLeft: wp(12),
              }}>
              Price: High to Low
            </Text>
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedSort === 'Price High to Low' ? (
              <FiledRound />
            ) : (
              <RoundView />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedSort('New Arrivals')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderWidth: selectedSort === 'New Arrivals' ? hp(2) : hp(1),
            borderColor:
              selectedSort === 'New Arrivals' ? '#5038ED' : '#E5E5E5',
            height: hp(64),
            borderRadius: wp(14),
            paddingHorizontal: wp(12),
            marginTop: hp(15),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ArrivalsIcon />

            <Text
              style={{
                color: '#262626',
                fontFamily: fontFamily.poppins700,
                fontSize: fontSize(12),
                marginLeft: wp(12),
              }}>
              New Arrivals
            </Text>

            <View style={{marginLeft: wp(6)}}>
              <NewIcon />
            </View>
          </View>

          <View style={{marginLeft: wp(0)}}>
            {selectedSort === 'New Arrivals' ? <FiledRound /> : <RoundView />}
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onClose}>
            <CloseButton />
          </TouchableOpacity>

          <TouchableOpacity>
            <ApplyFilterButton />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SortComponent;
