
export type LocalizationMap = Record<string, Record<string, string> | undefined> | undefined;

const FALLBACK_LANG = 'en';

//  field — имя блока переводов: mark , shortmark и description
 
export function pickLocalized(
  localization: LocalizationMap,
  field: string,
  lang: string,
  fallback = ''
): string {
  const values = localization?.[field];
  return values?.[lang] || values?.[FALLBACK_LANG] || fallback;
}
