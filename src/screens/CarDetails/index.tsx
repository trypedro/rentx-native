import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

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
  CarImages,
  Content,
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
  const { car } = route.params as Params

  function handleBackButton() {
    navigation.goBack()
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackButton} />
      </Header>

      <CarImages>
        <ImagesSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
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
          {car.accessories.map(accessory => (
            <Accessory 
              key={accessory.type} 
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
      </Footer>
    </Container>
  )
}
