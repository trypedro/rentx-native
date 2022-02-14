import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { format } from 'date-fns'

import { BackButton } from '../../components/BackButton'
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar'
import { Button } from '../../components/Button'

import { generateInterval } from '../../components/Calendar/generateInterval'
import { getPlatformDate } from '../../utils/getPlatformDate'

import { CarDto } from '../../dtos/CarDTO'

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer,
} from './styles'


export interface RentalPeriodI {
  start: number,
  startFormatted: string,
  end: number,
  endFormatted: string
}

interface Params {
  car: CarDto
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodI>({} as RentalPeriodI)
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as Params

  function handleBackButton() {
    navigation.goBack()
  }

  function handleConfirmPeriod() {
    navigation.navigate('SchedulingDetails', { car, dates: Object.keys(markedDates) })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      start = end
      end = start
    }

    setLastSelectDate(end)
    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]
    
    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

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
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValueContainer selected={!!rentalPeriod.startFormatted}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValueContainer  selected={!!rentalPeriod.endFormatted}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title='Confirmar' 
          onPress={handleConfirmPeriod} 
          enabled={!!rentalPeriod.endFormatted}  
        />
      </Footer>
    </Container>
  )
}
