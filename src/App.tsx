import React, { useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import AppNavigator from './Navigation';

const App = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <AppNavigator />
    </SafeAreaView>
  );
};

const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      position: 'relative',
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
    },
  }), [])
}

export default App;
