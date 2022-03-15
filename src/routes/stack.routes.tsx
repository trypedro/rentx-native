import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

import { CarDto } from '../dtos/CarDTO'

export type RootStackParamsList = {
  Splash: undefined
  Home: undefined
  CarDetails: { car: CarDto }
  Scheduling: { car: CarDto }
  SchedulingDetails: { car: CarDto; dates: string[] }
  SchedulingComplete: undefined
  MyCars: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamsList>()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
      <Screen name='Splash' component={Splash} />
      <Screen
        name='Home'
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name='CarDetails' component={CarDetails} />
      <Screen name='Scheduling' component={Scheduling} />
      <Screen name='SchedulingDetails' component={SchedulingDetails} />
      <Screen name='SchedulingComplete' component={SchedulingComplete} />

      <Screen name='MyCars' component={MyCars} />
    </Navigator>
  )
}
