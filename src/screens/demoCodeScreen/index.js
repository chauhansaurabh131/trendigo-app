import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DemoCodeScreen = () => {
  const scrollRef = useRef(null);
  const targetYRef = useRef(0); // store Y position of item 13
  const [ready, setReady] = useState(false); // optional: track layout ready

  const handleNavigate = () => {
    // Scroll to the stored Y position
    scrollRef.current?.scrollTo({y: targetYRef.current, animated: true});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={handleNavigate} style={{padding: 12}}>
        <Text style={{color: 'black'}}>Navigate</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => setReady(true)} // optional
      >
        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>1</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>2</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>3</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>4</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>5</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>6</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>7</Text>
        </View>
        <View style={{height: 180, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>8</Text>
        </View>
        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>9</Text>
        </View>
        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>10</Text>
        </View>
        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>11</Text>
        </View>
        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>12</Text>
        </View>

        {/* Target item 13: capture its layout Y */}
        <View
          style={{height: 80, backgroundColor: 'orange'}}
          onLayout={e => {
            // e.nativeEvent.layout.y is the position relative to the ScrollView content
            targetYRef.current = e.nativeEvent.layout.y;
          }}>
          <Text style={{color: 'black'}}>13</Text>
        </View>

        <View style={{height: 80, backgroundColor: 'orange'}}>
          <Text style={{color: 'black'}}>14</Text>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>15</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>16</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>17</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>18</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>19</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>20</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>21</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>22</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>23</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>24</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>25</Text>
          </View>
          <View style={{height: 80, backgroundColor: 'orange'}}>
            <Text style={{color: 'black'}}>1</Text>
          </View>
        </View>

        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DemoCodeScreen;
