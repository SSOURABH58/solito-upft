import { TextLink } from 'solito/link'
import { Text } from 'app/design/typography'
import { View } from 'app/design/view'

const MoreScreen = () => {
  return (
    <View>
      <Text>More</Text>
      <TextLink href={'/home'}>Home</TextLink>
    </View>
  )
}

export default MoreScreen
