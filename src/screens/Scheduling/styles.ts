import styled, { css } from 'styled-components/native'
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'

import { RFValue } from 'react-native-responsive-fontsize'

interface DateValueContainerProps {
  selected: boolean
}

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(34)}px;

  margin-top: 25px;
`
export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`

export const DateInfo = styled.View`
  width: 30%;
`

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`

export const DateValueContainer = styled.View<DateValueContainerProps>`  
  ${({ selected, theme }) => !selected && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.text};
    padding-bottom: 5px;
  `}
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})`

`

export const Footer = styled.View`
    /* Em cima, dos lados, e embaixo */
    padding: 24px 24px ${getBottomSpace() + 24}px;
`