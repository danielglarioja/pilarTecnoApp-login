import React from 'react';
import Home from '../screens/Home';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
            name="Home" 
            component={Home} 
            options={{
                title: 'Home',
                headerStyle: {
                    backgroundColor: `rgba( 19, 25, 29, .8)`,
                },
                headerTintColor: 'rgb(118, 177, 195)',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />
        </HomeStack.Navigator>
    )
}