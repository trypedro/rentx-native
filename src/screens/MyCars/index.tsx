import React, { useState, useEffect } from 'react'
import { StatusBar, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'

import { api } from '../../services/api'

import { CarDto } from '../../dtos/CarDTO'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'
import { Load } from '../../components/Load'

interface CarApiI {
  user_id: string
  id: string
  startDate: string
  endDate: string
  car: CarDto
}

export function MyCars() {
  const [cars, setCars] = useState<CarApiI[]>([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const theme = useTheme()

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get(`/schedules_byuser?use_id=${1}`)
        setCars(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  function handleBackButton() {
    navigation.goBack()
  }

  console.log('cars', cars)
  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <BackButton onPress={handleBackButton} color={theme.colors.shape} />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui{'\n'}
        </Title>

        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Angedamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 11 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  )
}
