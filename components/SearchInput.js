import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function SearchInput({ placeholder, onLocationSubmit }) {
  const [location, setLocation] = useState('')

  const handleSubmit = () => {
    onLocationSubmit(location);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={location}
        onChangeText={setLocation}
        autoCorrect={false} 
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent" 
        style={styles.textInput} 
        clearButtonMode='always'
        onSubmitEditing={handleSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
    }
})