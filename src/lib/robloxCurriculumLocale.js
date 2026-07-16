import { robloxCurriculum } from './robloxCurriculum'
import { enrichRobloxModules } from './robloxModuleMeta'

/** Сайт лише українською. */
export function getRobloxCurriculum() {
  return {
    ...robloxCurriculum,
    modules: enrichRobloxModules(robloxCurriculum.modules),
  }
}
