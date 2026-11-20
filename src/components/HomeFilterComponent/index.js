import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {fontFamily, fontSize, hp, wp} from '../../utils/helpers';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../utils/colors';

import {
  AllGendersIcon,
  ApplyFilterButton,
  ArrivalsIcon,
  BlueInput,
  CloseButton,
  DefaultViw,
  DropArrow,
  EmptyInput,
  FiledCheckBox,
  FiledRound,
  FilledInput,
  FilterIcon,
  GreySort,
  HotIcon,
  images,
  KidsIcon,
  MaleIcon,
  NewGender,
  NewIcon,
  NewSort,
  PriceIcon,
  RelevenceIcon,
  RelevenceView,
  RoundView,
  Sort,
  TrendigIcon,
  TrendigView,
  WithoutFiledInput,
  WomenGender,
  WomenIcon,
} from '../../assets';
import RBSheet from 'react-native-raw-bottom-sheet';
import AllCategoryScreen from '../../screens/AllCategoryScreen';
import FilterColorComponent from '../filterColorComponent';
import AllCategoriesScreen from '../../screens/AllCategoriesScreen';
import SortComponent from '../SortComponent';
import GenderComponent from '../GenderComponent';
const HomeFilterComponent = () => {
  // const [selectedFilter, setSelectedFilter] = useState(null);
  const bottomSheetRef = useRef(null);
  const categoriesSheetRef = useRef(null);
  const genderSheetRef = useRef(null);
  const filterSheetRef = useRef(null);
  const [selectedSort, setSelectedSort] = useState('Popularity & Trending');
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Womens Ethnic', 'Western Wear', 'Accessories'];
  const [selectedCategory, setSelectedCategory] = useState('Dresses');
  const [selectedGender, setselectedGender] = useState('Women');
  const [selectedFilter, setSelectedFilter] = useState('Color');
  const [selectedColor, setSelectedColor] = useState('Maroon');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'All':
        return (
          <View style={styles.screenContent}>
            <AllCategoriesScreen
              onClose={() => categoriesSheetRef.current?.close()}
            />
          </View>
        );
      case 'Delivered':
        return (
          <View style={styles.screenContent}>
            {/* <DeliveredScreen item={item} /> */}
          </View>
        );
      case 'Returned':
        return (
          <View style={styles.screenContent}>{/* <ReturnedScreen /> */}</View>
        );
      case 'Cancelled':
        return (
          <View style={styles.screenContent}>{/* <CancelledScreen /> */}</View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp(17),
          marginBottom: hp(20),
        }}>
        {/* Sort */}
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current?.open();
            setSelectedFilter('sort');
          }}
          style={{
            width: wp(71),
            height: hp(30),
            borderWidth: 1,
            borderColor: '#CBD5E1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(12),
            flexDirection: 'row',
            marginRight: wp(12),
          }}>
          <Text
            style={{
              color: '#1E293B',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            Sort
          </Text>

          <View style={{marginLeft: wp(8)}}>
            <NewSort />
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={bottomSheetRef}
          height={562}
          closeOnDragDown={true}
          closeOnPressMask={true}>
          {/* <View style={{marginHorizontal: wp(16)}}>
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
                borderColor:
                  selectedSort === 'Relevance' ? '#5038ED' : '#E5E5E5',
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
                  selectedSort === 'Popularity & Trending'
                    ? '#5038ED'
                    : '#E5E5E5',
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
                borderWidth:
                  selectedSort === 'Price Low to High' ? hp(2) : hp(1),
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
                borderWidth:
                  selectedSort === 'Price High to Low' ? hp(2) : hp(1),
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
                {selectedSort === 'New Arrivals' ? (
                  <FiledRound />
                ) : (
                  <RoundView />
                )}
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.close();
                }}>
                <CloseButton />
              </TouchableOpacity>

              <TouchableOpacity>
                <ApplyFilterButton />
              </TouchableOpacity>
            </View>
          </View> */}

          <View>
            <SortComponent onClose={() => bottomSheetRef.current?.close()} />
          </View>
        </RBSheet>
        {/* Categories */}
        <TouchableOpacity
          onPress={() => {
            categoriesSheetRef.current?.open();
            setSelectedFilter('categories');
          }}
          style={{
            width: wp(109),
            height: hp(30),
            borderWidth: 1,
            borderColor: '#CBD5E1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(12),
            flexDirection: 'row',
            marginRight: wp(12),
          }}>
          <Text
            style={{
              color: '#1E293B',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            Categories
          </Text>

          <View style={{marginLeft: wp(8)}}>
            {/* <DropArrow /> */}
            <NewGender />
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={categoriesSheetRef}
          height={680}
          closeOnDragDown={true}
          closeOnPressMask={true}>
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
                Categories
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
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F5',
              height: hp(1),
              width: '100%',
            }}
          />

          <View
            style={{
              height: hp(50),
              marginTop: hp(10),
              marginBottom: hp(15),
              marginHorizontal: wp(16),
            }}>
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
                        backgroundColor: isActive ? '#5028FF' : '#F5F5F5',
                        marginRight: index === tabs.length - 1 ? 0 : 15,
                      },
                    ]}>
                    <Text
                      style={{
                        color: isActive ? colors.white : '#525252',
                        fontFamily: fontFamily.poppins500,
                        fontSize: fontSize(12),
                      }}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F5',
              height: hp(1),
              width: '100%',
            }}
          />

          {/* <View>
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
                {selectedCategory === 'Dresses' ? (
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
            <TouchableOpacity
              onPress={() => {
                categoriesSheetRef.current?.close();
              }}>
              <CloseButton />
            </TouchableOpacity>

            <TouchableOpacity>
              <ApplyFilterButton />
            </TouchableOpacity>
          </View> */}

          {/* Tab-specific Content */}
          <View style={{flex: 1}}>{renderTabContent()}</View>

          {/* </View> */}
        </RBSheet>

        {/* Gender */}
        <TouchableOpacity
          onPress={() => {
            setSelectedFilter('gender');
            genderSheetRef.current?.open();
          }}
          style={{
            width: wp(88),
            height: hp(30),
            borderWidth: 1,
            borderColor: '#CBD5E1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(12),
            flexDirection: 'row',
            marginRight: wp(12),
          }}>
          <Text
            style={{
              color: '#1E293B',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            Gender
          </Text>

          <View style={{marginLeft: wp(8)}}>
            <NewGender />
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={genderSheetRef}
          height={626}
          closeOnDragDown={true}
          closeOnPressMask={true}>
          <GenderComponent onClose={() => genderSheetRef.current?.close()} />
        </RBSheet>

        {/* Filter */}
        <TouchableOpacity
          onPress={() => {
            setSelectedFilter('filter');
            filterSheetRef.current?.open();
          }}
          style={{
            width: wp(76),
            height: hp(30),
            borderWidth: 1,
            borderColor: '#CBD5E1',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(12),
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#1E293B',
              fontFamily: fontFamily.poppins700,
              fontSize: fontSize(12),
            }}>
            Filter
          </Text>

          <View style={{marginLeft: wp(8)}}>
            <FilterIcon
              color={selectedFilter === 'filter' ? '#475569' : '#475569'}
            />
          </View>
        </TouchableOpacity>

        <RBSheet
          ref={filterSheetRef}
          height={617}
          closeOnDragDown={true}
          closeOnPressMask={true}>
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
                Filters
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
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F5',
              height: hp(1),
              width: '100%',
            }}
          />

          {/* Tab-specific Content */}

          {/* </View> */}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setSelectedFilter('Color')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Color' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Color' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Color' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Fabric' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Color' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Color
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Maroon
              </Text>

              <TouchableOpacity onPress={() => setSelectedColor('Maroon')}>
                {selectedColor === 'Maroon' ? <BlueInput /> : <EmptyInput />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Fabric')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Fabric' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Fabric' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Fabric' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Fabric' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Fabric' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Fabric
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Sky Blue
              </Text>

              <TouchableOpacity onPress={() => setSelectedColor('Sky Blue')}>
                {selectedColor === 'Sky Blue' ? <BlueInput /> : <EmptyInput />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Size')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Size' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Size' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Size' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Size' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Size' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Size
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Royal Violet
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedColor('Royal Violet')}>
                {selectedColor === 'Royal Violet' ? (
                  <BlueInput />
                ) : (
                  <EmptyInput />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Price')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Price' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Price' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Price' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Price' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Price' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Price
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Black
              </Text>

              <TouchableOpacity onPress={() => setSelectedColor('Black')}>
                {selectedColor === 'Black' ? <BlueInput /> : <EmptyInput />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Brands')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Brands' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Brands' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Brands' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Brands' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Brands' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Brands
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Off White
              </Text>

              <TouchableOpacity onPress={() => setSelectedColor('Off White')}>
                {selectedColor === 'Off White' ? <BlueInput /> : <EmptyInput />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Pattern')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Pattern' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Pattern' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Pattern' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Pattern' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color: selectedFilter === 'Pattern' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Pattern
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Emerald Green
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedColor('Emerald Green')}>
                {selectedColor === 'Emerald Green' ? (
                  <BlueInput />
                ) : (
                  <EmptyInput />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Customer Rating')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Customer Rating' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width:
                    selectedFilter === 'Customer Rating' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Customer Rating'
                      ? '#F3F1FF'
                      : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft:
                    selectedFilter === 'Customer Rating' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color:
                      selectedFilter === 'Customer Rating'
                        ? '#4F46E5'
                        : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Customer Rating
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Mustard
              </Text>

              <TouchableOpacity onPress={() => setSelectedColor('Mustard')}>
                {selectedColor === 'Mustard' ? <BlueInput /> : <EmptyInput />}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: wp(16),
              // alignItems: 'center',
            }}>
            {/* <View
          style={{
            width: wp(4),
            height: hp(46),
            backgroundColor: '#5A35F5',
            // marginHorizontal: wp(16),
          }}
        /> */}

            <TouchableOpacity
              onPress={() => setSelectedFilter('Occasion')}
              style={{flexDirection: 'row'}}>
              {selectedFilter === 'Occasion' && (
                <View
                  style={{
                    width: wp(4),
                    height: hp(46),
                    backgroundColor: '#5A35F5',
                    // marginHorizontal: wp(16),
                  }}
                />
              )}
              <View
                style={{
                  width: selectedFilter === 'Occasion' ? wp(129) : wp(133),
                  height: hp(46),
                  backgroundColor:
                    selectedFilter === 'Occasion' ? '#F3F1FF' : '#F8FAFC',
                  // alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: selectedFilter === 'Occasion' ? wp(14) : wp(18),
                }}>
                <Text
                  style={{
                    color:
                      selectedFilter === 'Occasion' ? '#4F46E5' : '#525252',
                    fontFamily: fontFamily.poppins700,
                    fontSize: fontSize(12),
                  }}>
                  Occasion
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: wp(1),
                backgroundColor: '#E5E5E5CC',
                height: hp(46),
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: wp(14),
                height: hp(46),
                // backgroundColor: 'pink',
              }}>
              <Text
                style={{
                  color: '#171717',
                  fontFamily: fontFamily.poppins600,
                  fontSize: fontSize(12),
                }}>
                Pastel Peach
              </Text>

              <TouchableOpacity
                onPress={() => setSelectedColor('Pastel Peach')}>
                {selectedColor === 'Pastel Peach' ? (
                  <BlueInput />
                ) : (
                  <EmptyInput />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: wp(16),
              position: 'absolute',
              bottom: hp(16),
            }}>
            <TouchableOpacity
              onPress={() => {
                filterSheetRef.current?.close();
              }}>
              <CloseButton />
            </TouchableOpacity>

            <TouchableOpacity>
              <ApplyFilterButton />
            </TouchableOpacity>
          </View>
          {/* <View>
            <FilterColorComponent />
          </View> */}
        </RBSheet>
      </ScrollView>
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

  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  tabsContent: {
    paddingVertical: hp(8),
    // paddingHorizontal: 18,
  },
  tabButton: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    borderRadius: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContent: {
    flex: 1,
  },
});
export default HomeFilterComponent;
