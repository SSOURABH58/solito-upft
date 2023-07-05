import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import call from 'react-native-phone-call'
import { MotiLink } from 'solito/moti'
import { Button } from 'react-native'

export function HomeScreen() {
  const args = {
    number: '9093900003', // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  }
  //call function
  const callNumber = () => {
    call(args).catch(console.error)
  }
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to C.R.M.</H1>
      <Button title="Call" onPress={callNumber} />
    </View>
  )
}
