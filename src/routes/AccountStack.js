import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import NewAccount from '../screens/NewAccount';

const AccountStacks = createStackNavigator();

export default AccountStack = (props) => {
    return (
        <AccountStacks.Navigator headerMode="none">
            <AccountStacks.Screen name="LogIn" component={Login} />
            <AccountStacks.Screen name="NewAccount" component={NewAccount} />
        </AccountStacks.Navigator>
    )
}