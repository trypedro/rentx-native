interface RentCar {
  period: string,
  price: number,
}

interface AccessoriesCar {
  type: string,
  name: string,
}

export interface CarDto {
  id: string,
  brand: string,
  name: string,
  about: string,
  rent: RentCar,
  fuel_type: string,
  thumbnail: string,
  accessories: AccessoriesCar[],
  photos: string[]
}

