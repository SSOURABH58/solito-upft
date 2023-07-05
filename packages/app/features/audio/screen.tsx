import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Audio } from 'expo-av'

export default function AudioScreen() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>()

  //   const [sound, setSound] = useState();
  // add type
  // const [sound, setSound] = useState<Audio.Sound | undefined>()

  //   const [soundUri, setsoundUri] = useState()
  // add type
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
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HighQuality
      )
      await recording.startAsync()
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

    const fileName = `recording-${Date.now()}.caf`
    console.log('Recording stopped and stored at', uri)
    setsoundUri(uri)
  }

  const GetPermissions = async () => {
    try {
      console.log('Requesting permissions..')

      const AudioPerm = await Audio.requestPermissionsAsync()
      console.log('AudioPerm', AudioPerm)

      if (AudioPerm.status === 'granted') {
        console.log('Audio Permission Granted')
      } else {
        console.log('Audio Permission Denied')
      }
    } catch (err) {
      console.error('Failed to get permissions', err)
    }
  }

  async function playSound() {
    try {
      const sound = await recording?.createNewLoadedSoundAsync()
      // const { sound } = await Audio.Sound.createAsync(require(soundUri))
      console.log('Playing Sound', sound?.sound)
      sound?.sound.playAsync()
      // setSound(sound)

      // await sound.playAsync()
    } catch (err) {
      console.log('Error playing sound', err)
    }
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound')
  //         sound.unloadAsync()
  //       }
  //     : undefined
  // }, [sound])

  return (
    <View style={styles.container}>
      <Button title="Get Permissions" onPress={GetPermissions} />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {<Button title="Play Sound" onPress={playSound} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
})
