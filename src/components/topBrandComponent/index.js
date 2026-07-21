import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {hp} from '../../utils/helpers';

const TopBrandComponent = ({products, renderProduct}) => {
  return (
    <SafeAreaView>
      {/* <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: hp(20),
        }}
        contentContainerStyle={{
          paddingBottom: hp(60),
        }}
        numColumns={2}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      /> */}
    </SafeAreaView>
  );
};

export default TopBrandComponent;
