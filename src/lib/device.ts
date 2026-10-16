export type EffectsMode = "full" | "lite";

export interface DeviceCapabilities {
  reducedMotion: boolean;
  saveData?: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
}

export function resolveEffectsMode(
  capabilities: DeviceCapabilities,
  preference: EffectsMode | null,
): EffectsMode {
  if (capabilities.reducedMotion || capabilities.saveData) return "lite";
  if (preference) return preference;
  if (
    (capabilities.hardwareConcurrency !== undefined && capabilities.hardwareConcurrency <= 4) ||
    (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 4)
  )
    return "lite";
  return "full";
}
