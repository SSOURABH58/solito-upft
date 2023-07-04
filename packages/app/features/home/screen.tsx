import { A, H1, P, Text, TextLink } from 'app/design/typography'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'

import { MotiLink } from 'solito/moti'
import {
  Canvas,
  RoundedRect,
  useCanvasRef,
  Circle,
} from '@shopify/react-native-skia'
import { styled } from 'nativewind'
import { useEffect } from 'react'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { Button } from 'react-native'
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web'
import SkiaCanva from './skiaCanva'
import Breathe from './Breathe'

const CanvasS = styled(Canvas)

export function HomeScreen() {
  const r = 128
  const randomWidth = useSharedValue(10)

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  }

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    }
  })
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to C.R.M.</H1>
      <Animated.View
        style={[
          { width: 100, height: 80, backgroundColor: 'black', margin: 30 },
          style,
        ]}
      />
      <WithSkiaWeb
        // @ts-ignore
        getComponent={() => import('./Breathe')}
        fallback={<Text>Loading Skia...</Text>}
      />
      {/* <Breathe /> */}

      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350
        }}
      />
    </View>
  )
}
