type CacheEntry = { expires: number; value: unknown }

const memory = new Map<string, CacheEntry>()

export async function cached<T extends { ok: boolean }>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const now = Date.now()
  const hit = memory.get(key)
  if (hit && hit.expires > now) return hit.value as T
  const value = await fetcher()
  if (value.ok) memory.set(key, { expires: now + ttlSeconds * 1000, value })
  return value
}

export function _clearCache() {
  memory.clear()
}
