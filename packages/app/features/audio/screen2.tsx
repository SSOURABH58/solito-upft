// create a screen that has a button to call at 888-555-5555 and record the call and play it back ones it ends
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Audio } from 'expo-av'

export default function AudioScreen2() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>()
  const [soundUri, setsoundUri] = useState<string | null>(null)

  useEffect(() => {
    // log the recording object sound frequency
    console.log('recording', recording?._onRecordingStatusUpdate?.toString())

    return () => {
      if (recording) {
        stopRecording()
      }
    }
  }, [])

  async function startRecording() {
    try {
      console.log('Requesting permissions..')
      await Audio.requestPermissionsAsync()
        .then((e) => {
          console.log('Permission granted!', e)
        })
        .catch((error) => {
          console.log(error)
        })
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      console.log('Starting recording..')
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HighQuality
      )
      //   prepareToRecordAsync
      //   const recording = new Audio.Recording()
      //   await recording.prepareToRecordAsync(
      //     Audio.RecordingOptionsPresets.HighQuality
      //   )
      //   await recording.startAsync()
      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    // setRecording(undefined)
    await recording?.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const uri = recording!.getURI()
    console.log('Recording stopped and stored at', uri)
    setsoundUri(uri)
  }

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync({ uri: soundUri! })
    console.log('Playing Sound')
    await sound.playAsync()
    //add end playing
    await sound.setOnPlaybackStatusUpdate((status) => {
      console.log('status', status)
      if (status.isLoaded && status.isPlaying && status.durationMillis) {
        if (status.positionMillis === status.durationMillis) {
          console.log('end playing')
          sound.unloadAsync()
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Audio Screen 2</Text>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Play Sound" onPress={playSound} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
