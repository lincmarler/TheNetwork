import { AppState } from "../AppState"
import { Add } from "../models/Add"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AddsService {
    async getAdds() {
        AppState.adds = []
        const res = await api.get('api/ads')
        logger.log('got adds', res.data)
        AppState.adds = res.data.map(add => new Add(add))
        logger.log(AppState.adds, 'got em')
    }
}

export const addsService = new AddsService()