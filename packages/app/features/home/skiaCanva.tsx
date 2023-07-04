import { View, Text } from 'react-native'
import React from 'react'
import { Canvas, Circle, RoundedRect } from '@shopify/react-native-skia'

const SkiaCanva = () => {
  const r = 128

  return (
    <Canvas style={{ flex: 1, width: '100%', backgroundColor: '#ccc' }}>
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
  )
}

export default SkiaCanva
