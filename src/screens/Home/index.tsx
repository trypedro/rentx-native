import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import { api } from '../../services/api'
import { CarDto } from '../../dtos/CarDTO'

import Logo from '../../assets/logo.svg'

import { Load } from '../../components/Load'
import { Car } from '../../components/Car'
import { Container, Header, HeaderContent, TotalCars, CarList, MyCarsButton } from './styles'


export function Home() {
  const [cars, setCars] = useState<CarDto[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const theme = useTheme()

  function handleCarDetails(car: CarDto) {
    navigation.navigate('CarDetails', { car });
  }

  function handleMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
        
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } 

    fetchCars()
  }, [])

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


      { loading ? <Load /> : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
      ) }


      <MyCarsButton onPress={handleMyCars}>
        <Ionicons name='ios-car-sport' size={32} color={theme.colors.background_primary} />
      </MyCarsButton>
    </Container>
  )
}
