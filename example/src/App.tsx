import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Navigation colorScheme={colorScheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
