import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() == "dark";
  const styles = useStyles();
  const [loader, setLoader] = useState<boolean>(false);

  return (
  <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle={!isDarkMode ? "dark-content" : 'light-content'} />
      {loader ? (
        <View style={styles.screen}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      {/* AppNavigator */}
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
