import React, { useState, useEffect, navigationRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useDispatch, Provider } from 'react-redux';
import { actions, store } from '../store';
import AppStack from '../routes/app';

const App = (props) => {

  let AppWrapped = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const dispatch = useDispatch()
    // Handle user state changes
    async function onAuthStateChanged(user) {
      if (user) {
        setUser(user)
      } else {
        dispatch(actions.user.setUser(null))
      }
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) { return null; }

    return (
      <NavigationContainer ref={navigationRef}>
        <AppStack />
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  )
}

export default App;