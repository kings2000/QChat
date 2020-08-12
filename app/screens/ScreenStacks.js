import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageViewerScreen from './ImageViewerScreen';
import { ChatScreen } from './ChatScreen';

const Stack = createStackNavigator();

const ScreenStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ChatScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="ImageView" component={ImageViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};