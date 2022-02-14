import { RootStackParamsList } from '../../routes/stack.routes'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamsList {}
  }
}