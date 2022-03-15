import React from 'react'
import LottieView from 'lottie-react-native'

import { Container } from './styles'

import loadingCar from '../../assets/load_car.json'

export function LoadAnimation() {
  return(
    <Container>
      <LottieView 
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode='contain'
        autoPlay
        loop
      />
    </Container>
  )
}