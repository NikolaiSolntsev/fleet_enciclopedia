export interface Nation {
  name: string;
  title: string;
  color: number;
  icons: {
    small: string;
    large: string;
    default: string;
    tiny?: string;
    local_small?: string;
    local_large?: string;
    local_tiny?: string;
  };
}

export interface VehicleType {
  name: string;
  title: string;
  icons?: Record<string, string>;
}

export interface Ship {
  id: number | string;
  name: string;
  title: string;
  description: string;
  level: number;
  nation: string;
  type: string;
  is_premium: boolean;
  is_special: boolean;
  icons: {
    small?: string;
    medium?: string;
    large?: string;
    contour?: string;
    default?: string;
    [key: string]: string | undefined;
  };
}

export interface ApiResponse<T> {
  status: string;
  data: Record<string, T>;
}