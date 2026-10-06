import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {fontFamily, fontSize} from '../../utils/helpers';
import {hp, wp} from '../../utils/helpers';
import {BlueInput, EmptyInput} from '../../assets';
const FilterColorComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState('Color');
  const [selectedColor, setSelectedColor] = useState('Maroon');
  return (
    <SafeAreaView>
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

          <TouchableOpacity onPress={() => setSelectedColor('Royal Violet')}>
            {selectedColor === 'Royal Violet' ? <BlueInput /> : <EmptyInput />}
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
            Emerald Green
          </Text>

          <TouchableOpacity onPress={() => setSelectedColor('Emerald Green')}>
            {selectedColor === 'Emerald Green' ? <BlueInput /> : <EmptyInput />}
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
                selectedFilter === 'Occasion' ? '#F3F1FF' : '#F8FAFC',
              // alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: selectedFilter === 'Occasion' ? wp(14) : wp(18),
            }}>
            <Text
              style={{
                color: selectedFilter === 'Occasion' ? '#4F46E5' : '#525252',
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

          <TouchableOpacity onPress={() => setSelectedColor('Pastel Peach')}>
            {selectedColor === 'Pastel Peach' ? <BlueInput /> : <EmptyInput />}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FilterColorComponent;
