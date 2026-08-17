export interface RawNation {
  name: string;
  color: number;
  localization?: Record<string, any>;
  icons: Record<string, string>;
}

export interface Nation extends RawNation {
  title: string;
}

export interface RawVehicleType {
  name: string;
  localization?: Record<string, any>;
  icons?: Record<string, string>;
}

export interface VehicleType extends RawVehicleType {
  title: string;
}

export interface RawShip {
  id: number | string;
  name: string;
  level: number;
  nation: string;
  type: string;
  is_premium: boolean;
  is_special: boolean;
  tags: string[];
  icons: Record<string, string>;
  localization?: {
    shortmark?: Record<string, string>;
    description?: Record<string, string>;
  };
}

export interface Ship extends RawShip {
  title: string;
  description: string;
}

export interface ApiResponse<T> {
  status: string;
  data: Record<string, T>;
}