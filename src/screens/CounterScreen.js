import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease, increaseByAmount } from "../redux/counterSlice";

export default function CounterScreen() {
  const dispatch = useDispatch();

  // Read data from store
  const count = useSelector(state => state.counter.count);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 30 }}>Count: {count}</Text>

      <Button title="Increase" onPress={() => dispatch(increase())} />

      <Button title="Decrease" onPress={() => dispatch(decrease())} />

      <Button
        title="Increase by 5"
        onPress={() => dispatch(increaseByAmount(5))}
      />
    </View>
  );
}
