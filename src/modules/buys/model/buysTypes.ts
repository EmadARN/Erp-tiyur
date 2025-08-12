export interface ProductType {
    id: number | string;
    name: string;
}

export interface OwnerType {
    id: number | string;
    contact: {
        name: string;
    };
}

export interface CarType {
    id: number | string;
    car_number: string;
}

export interface DriverType {
    id: number | string;
    contact: {
        name: string;
    };
}

export interface AgricultureType {
    id: number | string;
    name: string;
}
export interface Option {
  label: string;
  value: string;
}
export interface KernelData {
  cars: Option[];
  agriculture: Option[];
  drivers: Option[];
  owners: Option[];
  products: Option[];
}