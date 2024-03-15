import { StatusBar } from 'expo-status-bar';
import { 
  ImageBackground,
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import { fetchWeather } from './utils/api'

import SearchInput from './components/SearchInput'
import { useState } from 'react';

export default function App() {
  const [state, setState] = useState({
    loading: false,
    error: false,
    location: '',
    temperature: '',
    weather: '',
  })

  const handleLocationChange = async (newLocation) => {
    setState({ loading: true });

    if (!newLocation) return;

    try {
      const [condition, temperature] = await fetchWeather(newLocation);

      setState({
        location: newLocation,
        temperature,
        weather: condition,
        loading: false,
      })

    } catch (e) {
      setState({ loading: false, error: true })
      console.log(e)
    }
}

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ImageBackground 
        source={getImageForWeather(state.weather)} 
        style={styles.imageContainer} 
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={state.loading} color="white" size="large" />

          {!state.loading && (
            <View>
              {state.error && (
                <Text style={[styles.largeText, styles.textStyles]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
            </View>
          )}

          {state && (
            <View>              
              <Text style={[styles.largeText, styles.textStyles]}>{state.location}</Text>
              <Text style={[styles.smallText, styles.textStyles]}>{state.weather}</Text>
              <Text style={[styles.largeText, styles.textStyles]}>{`${state.temperature}°`}</Text>
            </View>
          )}

          <SearchInput placeholder="Search any city" onLocationSubmit={handleLocationChange} />

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  textStyles: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  }
});
