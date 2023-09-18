import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfileService {
    async getProfileById(profileId) {
        AppState.profile = null
        const res = await api.get(`api/profiles/${profileId}`)
        AppState.profile = new Profile(res.data)
        logger.log(res.data)
    }
}

export const profileService = new ProfileService()