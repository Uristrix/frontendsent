import {makeAutoObservable} from "mobx"

class AppStore
{
    data = null
    load = false
    dt_box = true
    keywords_box = true
    rest_ent_box = true
    constructor() { makeAutoObservable(this) }

    setData = (data) => { this.data = data}
    updateLoad = () => { this.load = !this.load }
    updateDT = () => { this.dt_box = !this.dt_box }
    updateKeywords = () => { this.keywords_box = !this.keywords_box }
    updateEntities = () => { this.rest_ent_box = !this.rest_ent_box }
}

export default new AppStore()