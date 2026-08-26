import { robloxCurriculum } from './robloxCurriculum'
import { enrichRobloxModules } from './robloxModuleMeta'

/** US product defaults to English lesson metadata. */
export function getRobloxCurriculum(locale = 'en') {
  const loc = locale === 'uk' ? 'uk' : 'en'
  return {
    ...robloxCurriculum,
    modules: enrichRobloxModules(robloxCurriculum.modules, loc),
  }
}
