import React from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car'
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles'


export function Home() {
  const navigation = useNavigation()

  const carData = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    thumbnail:
      'https://e7.pngegg.com/pngimages/357/741/png-clipart-audi-audi.png',
    rent: { period: 'Ao dia', price: 120 },
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6 ,7]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <Car data={carData} onPress={handleCarDetails}/>}
      />

    </Container>
  )
}
