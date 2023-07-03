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

const CanvasS = styled(Canvas)

export function HomeScreen() {
  const r = 128
  return (
    <View className="flex-1 items-center justify-center p-3">
      <H1>Welcome to C.R.M.</H1>
      <Canvas style={{ flex: 1, backgroundColor: '#ccc' }}>
        <RoundedRect
          x={10}
          y={10}
          width={100}
          height={100}
          r={10}
          color={'#7149C6'}
        />
        <Circle cx={r} cy={r} r={r} color="lightblue" />
      </Canvas>
    </View>
  )
}
