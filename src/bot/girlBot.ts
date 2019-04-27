import fs from 'fs'

import { Comment } from "../types";
import BaseBot from "./baseBot";
import { pickRandomElements, pickRandomElement } from '../helper/arrayHelper';


class TestProcessor extends BaseBot {
    private images : string[] = []
    private descriptions: string[] = []

    constructor() {
        super('#girl-autobot', ['girl', 'gai', 'gau'])

        const dbPath = 'db' 
        const imageDbPath = `${dbPath}/tumblr.json`
        if (fs.existsSync(imageDbPath)) {
            this.images = JSON.parse(fs.readFileSync(imageDbPath, 'utf8')) as string[]
        }

        const descrptionDbPath = `${dbPath}/girls_descriptions.json`
        if (fs.existsSync(descrptionDbPath)) {
            this.descriptions = JSON.parse(fs.readFileSync(descrptionDbPath, 'utf8')) as string[]
        }
    }
    
    async getReply({name}: Comment) {
        const girlDescriptions = pickRandomElements(this.descriptions, 2) 
        const message = `Ahihi, bạn gái của ${name} sẽ là một người ${girlDescriptions[0]} và ${girlDescriptions[1]}`
        const imageUrl = pickRandomElement(this.images)

        return {
            message,
            imageUrl  
        }
    }
}

export default new TestProcessor()