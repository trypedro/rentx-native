import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withTiming,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'

import LogoSvg from '../../assets/logo.svg'
import BrandSvg from '../../assets/brand.svg'

import { Container } from './styles'

export function Splash() {
  const splashAnimation = useSharedValue(0) // 0 -> 50
  const navigation = useNavigation()

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP, 
          ),
        },
      ],
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        splashAnimation.value,
        [0, 25, 50], // As etapas da animação
        [0, 0.3, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    }
  })

  function startApp() {
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 5000 }, () => {
      'worklet'
      runOnJS(startApp)()
    })
  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute'}]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  )
}
