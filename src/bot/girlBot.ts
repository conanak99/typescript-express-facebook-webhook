import fs from 'fs'

import { Comment } from "../types"
import BaseBot from "./baseBot"
import { pickRandomElements, pickRandomElement } from '../helper/arrayHelper'


class TestProcessor extends BaseBot {
    private images : string[] = []
    private descriptions: string[] = []
    private names: string[] = []

    constructor() {
        super('#girl-autobot', ['girl', 'gai', 'gau'])

        this.images = this.loadDb('tumblr')
        this.descriptions = this.loadDb('girl_descriptions')
        this.names = this.loadDb('girl_names')
    }

    private loadDb<T = any>(dbName : string): Array<T> {
        const dbPath = `db/${dbName}.json`
        if (!fs.existsSync(dbPath)) return []
           return JSON.parse(fs.readFileSync(dbPath, 'utf8')) as Array<T>
    }
    
    async getReply({name}: Comment) {
        const girlDescriptions = pickRandomElements(this.descriptions, 2) 
        const girlName = pickRandomElement(this.names)
        const message = `Ahihi, bạn gái của ${name} sẽ tên ${girlName}, là một người ${girlDescriptions[0]} và ${girlDescriptions[1]}`
        const imageUrl = pickRandomElement(this.images)

        return {
            message,
            imageUrl  
        }
    }
}

export default new TestProcessor()