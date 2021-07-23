import React from 'react';
import Map from '../screens/Map';
import { createStackNavigator } from '@react-navigation/stack';

const MapStack = createStackNavigator();

export const MapStackScreen = () => {
    return (
        <MapStack.Navigator>
            <MapStack.Screen 
            name="Map" 
            component={Map} 
            options={{
                title: 'Map',
                headerStyle: {
                    backgroundColor: `rgba( 19, 25, 29, .8)`,
                },
                headerTintColor: 'rgb(118, 177, 195)',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />
        </MapStack.Navigator>
    )
}