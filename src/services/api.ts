import type { RawShip, RawNation, RawVehicleType } from '../types/shipTypes';
import { withMediaPath, FALLBACK_MEDIA_PATH } from '@/utils/icons';

const API_BASE = import.meta.env.VITE_API_BASE || '/api-wows';
const BASE_URL = `${API_BASE}/api/encyclopedia/en`;

interface RawNationResponse {
  name?: string;
  color?: number;
  localization?: Record<string, Record<string, string>>;
  icons?: Record<string, unknown>;
}

interface RawVehicleTypeResponse {
  localization?: Record<string, Record<string, string>>;
  icons?: Record<string, unknown>;
}

interface RawVehicleResponse {
  name?: string;
  level?: number;
  nation?: string;
  tags?: string[];
  icons?: Record<string, unknown>;
  localization?: {
    shortmark?: Record<string, string>;
    description?: Record<string, string>;
  };
}

interface ApiBaseResponse {
  status: string;
  data: {
    nations?: RawNationResponse[];
    vehicle_types_common?: Record<string, RawVehicleTypeResponse>;
    language_list?: string[];
  };
}

interface VehiclesResponse {
  status: string;
  data: Record<string, RawVehicleResponse>;
}

interface MediaPathResponse {
  status: string;
  data: string;
}

let mediaPathCache: string | null = null;
let languagesCache: string[] = [];

async function getMediaPath(): Promise<string> {
  if (mediaPathCache) return mediaPathCache;
  try {
    const res = await fetch(`${BASE_URL}/media_path/`);
    if (res.ok) {
      const data: MediaPathResponse = await res.json();
      mediaPathCache = data.data;
      return data.data;
    }
  } catch {
    console.warn('Failed to fetch media_path, using default');
  }
  return FALLBACK_MEDIA_PATH;
}

export async function fetchShipsData() {

  const [baseRes, vehiclesRes, mediaPath] = await Promise.all([
    fetch(`${BASE_URL}/`),
    fetch(`${BASE_URL}/vehicles/`),
    getMediaPath()
  ]);

  if (!baseRes.ok || !vehiclesRes.ok) {
    throw new Error('Failed to fetch encyclopedia data');
  }

  const baseData: ApiBaseResponse = await baseRes.json();
  const vehiclesData: VehiclesResponse = await vehiclesRes.json();

  if (baseData.data.language_list) {
    languagesCache = baseData.data.language_list;
  }

  const nationsRecord: Record<string, RawNation> = {};
  (baseData.data.nations || []).forEach((nation, index) => {
    const key = nation.name || String(index);
    nationsRecord[key] = {
      name: key,
      color: nation.color || 0,
      localization: nation.localization,
      icons: withMediaPath(nation.icons, mediaPath)
    };
  });

  const typesRecord: Record<string, RawVehicleType> = {};
  Object.entries(baseData.data.vehicle_types_common || {}).forEach(([key, type]) => {
    typesRecord[key] = {
      name: key,
      localization: type.localization,
      icons: withMediaPath(type.icons, mediaPath)
    };
  });

  const knownTypes = new Set(Object.keys(typesRecord));

  const ships: RawShip[] = [];
  Object.entries(vehiclesData.data).forEach(([id, vehicle]) => {
    const tags = vehicle.tags || [];

    ships.push({
      id: parseInt(id) || id,
      name: vehicle.name || '',
      level: vehicle.level || 0,
      nation: vehicle.nation || 'unknown',
      type: tags.find(tag => knownTypes.has(tag)) || 'Unknown',
      is_premium: tags.includes('uiPremium'),
      is_special: tags.includes('special') || tags.includes('uiSpecial'),
      tags,
      icons: withMediaPath(vehicle.icons, mediaPath),
      localization: {
        shortmark: vehicle.localization?.shortmark || {},
        description: vehicle.localization?.description || {}
      }
    });
  });

  return {
    ships,
    nations: nationsRecord,
    types: typesRecord,
    languages: languagesCache
  };
}
