import type { RawShip, RawNation, RawVehicleType } from '../types/shipTypes';

const BASE_URL = '/api-wows/api/encyclopedia/en';

interface ApiBaseResponse {
  status: string;
  data: {
    nations?: Record<string, any>;
    vehicle_types_common?: Record<string, any>;
    language_list?: string[];
  };
}

interface VehiclesResponse {
  status: string;
  data: Record<string, any>;
}

interface MediaPathResponse {
  status: string;
  data: string;
}

let mediaPathCache: string | null = null;
let languagesCache: string[] = [];

function withMediaPath(icons: Record<string, any> | undefined, mediaPath: string): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(icons || {}).forEach(([key, path]) => {
    if (typeof path === 'string' && path) {
      result[key] = `${mediaPath}${path}`;
    }
  });
  return result;
}

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
  return 'https://wows-gloss-icons.wgcdn.co/icons/';
}

export async function fetchShipsData() {
  const [baseRes, vehiclesRes] = await Promise.all([
    fetch(`${BASE_URL}/`),
    fetch(`${BASE_URL}/vehicles/`)
  ]);

  if (!baseRes.ok || !vehiclesRes.ok) {
    throw new Error('Failed to fetch encyclopedia data');
  }

  const baseData: ApiBaseResponse = await baseRes.json();
  const vehiclesData: VehiclesResponse = await vehiclesRes.json();

  if (baseData.data.language_list) {
    languagesCache = baseData.data.language_list;
  }

  const mediaPath = await getMediaPath();

  const nationsRecord: Record<string, RawNation> = {};
  if (baseData.data.nations) {
    Object.entries(baseData.data.nations).forEach(([key, nation]: [string, any]) => {
      nationsRecord[key] = {
        name: nation.name || key,
        color: nation.color || 0,
        localization: nation.localization,
        icons: withMediaPath(nation.icons, mediaPath)
      };
    });
  }

  const typesRecord: Record<string, RawVehicleType> = {};
  if (baseData.data.vehicle_types_common) {
    Object.entries(baseData.data.vehicle_types_common).forEach(([key, type]: [string, any]) => {
      typesRecord[key] = {
        name: key,
        localization: type.localization,
        icons: withMediaPath(type.icons, mediaPath)
      };
    });
  }

  const ships: RawShip[] = [];
  Object.entries(vehiclesData.data).forEach(([id, vehicle]: [string, any]) => {
    const tags = vehicle.tags || [];
    const shipType = tags.find((tag: string) => Object.keys(typesRecord).includes(tag)) || 'Unknown';

    const fullIcons = withMediaPath(vehicle.icons, mediaPath);

    ships.push({
      id: parseInt(id) || id,
      name: vehicle.name || '',
      level: vehicle.level || 0,
      nation: extractNationFromName(vehicle.name, Object.keys(nationsRecord)),
      type: shipType,
      is_premium: tags.includes('uiPremium') || false,
      is_special: tags.includes('special') || tags.includes('uiSpecial') || false,
      tags,
      icons: fullIcons,
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

export function getAvailableLanguages(): string[] {
  return languagesCache;
}

function extractNationFromName(shipName: string, nations: string[]): string {
  for (const nation of nations) {
    if (shipName.toLowerCase().includes(nation.toLowerCase())) {
      return nation;
    }
  }
  return nations[0] || 'ussr';
}