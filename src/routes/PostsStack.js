import React from 'react';
import Posts from '../screens/Posts';
import PostDetail from '../screens/PostDetail';
import PostEdit from '../screens/PostEdit';
import PostCreate from '../screens/PostCreate';
import { createStackNavigator } from '@react-navigation/stack';

const PostsStack = createStackNavigator();

export const PostsStackScreen = () => {
    return (
        <PostsStack.Navigator>
            <PostsStack.Screen 
            name="Posts"
            component={Posts} 
            options={{
                title: 'Post',
                headerStyle: {
                    backgroundColor: `rgba( 19, 25, 29, .8)`,
                },
                headerTintColor: 'rgb(118, 177, 195)',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
            />
            <PostsStack.Screen name="PostDetail" component={PostDetail} />
            <PostsStack.Screen name="PostEdit" component={PostEdit} />
            <PostsStack.Screen name="PostCreate" component={PostCreate} />
        </PostsStack.Navigator>
    )
}