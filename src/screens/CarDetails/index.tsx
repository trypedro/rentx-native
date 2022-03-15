import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import {useTheme} from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import { BackButton } from '../../components/BackButton'
import { ImagesSlider } from '../../components/ImagesSlider'
import { Accessory } from '../../components/Accessory/intex'
import { Button } from '../../components/Button'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import { CarDto } from '../../dtos/CarDTO'

// style
import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
  Footer,
} from './styles'

interface Params {
  car: CarDto
}

export function CarDetails() {
  const navigation = useNavigation()
  const route = useRoute()
  const theme = useTheme()
  const { car } = route.params as Params

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
    }
  })

  function handleBackButton() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />

      <Animated.View style={[headerStyleAnimation, styles.header, 
      {backgroundColor: theme.colors.background_primary}]}>
        <Header>
          <BackButton onPress={handleBackButton} />
        </Header>

        <Animated.View
          style={[
            sliderCarStyleAnimation,
            { marginTop: getStatusBarHeight() + 32 },
          ]}
        >
          <ImagesSlider imagesUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title='Escolher período do aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
  back: {
    marginTop: 24,
  }
})