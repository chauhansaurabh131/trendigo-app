import React, {useRef, useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import {
  BlueInput,
  EmptyInput,
  CloseButton,
  ApplyFilterButton,
} from '../../assets';
const AllCategoriesScreen = ({onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState('Dresses');
  const categoriesSheetRef = useRef(null);
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('Dresses');
            }}>
            {selectedCategory === 'Dresses' ? <BlueInput /> : <EmptyInput />}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Dresses
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Shirts & Button Downs')}>
            {selectedCategory === 'Shirts & Button Downs' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Shirts & Button Downs
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('T-Shirts & Polos')}>
            {selectedCategory === 'T-Shirts & Polos' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              T-Shirts & Polos
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Jeans & Denims')}>
            {selectedCategory === 'Jeans & Denims' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Jeans & Denims
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Sports & Active Wear')}>
            {selectedCategory === 'Sports & Active Wear' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Sports & Active Wear
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Formal & Work Wear')}>
            {selectedCategory === 'Formal & Work Wear' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Formal & Work Wear
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Kurti & Ethnic Sets')}>
            {selectedCategory === 'Kurti & Ethnic Sets' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Kurti & Ethnic Sets
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Caps & Headwear')}>
            {selectedCategory === 'Caps & Headwear' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Caps & Headwear
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp(15),
            marginTop: hp(13),
          }}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('Bags, Totes & Wallets')}>
            {selectedCategory === 'Bags, Totes & Wallets' ? (
              <BlueInput />
            ) : (
              <EmptyInput />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: wp(13)}}>
            <Text
              style={{
                color: '#171717',
                fontFamily: fontFamily.poppins500,
                fontSize: fontSize(14),
              }}>
              Bags, Totes & Wallets
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#F5F5F5',
            height: hp(1),
            marginTop: hp(13),
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: wp(16),
        }}>
        <TouchableOpacity onPress={onClose}>
          <CloseButton />
        </TouchableOpacity>

        <TouchableOpacity>
          <ApplyFilterButton />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AllCategoriesScreen;
