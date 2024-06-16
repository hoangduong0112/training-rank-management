// src/routers/Stack/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityListScreen from '../../screens/activities/ActivityListScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActivityList" component={ActivityListScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
