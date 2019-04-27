import { Comment, Reply } from "../types";
import BaseBot from "./baseBot";

class TestProcessor extends BaseBot {
    constructor() {
        super('#girl-autobot')
    }  
    
    async getReply({name, message}: Comment) {
        return {
            message: `Hello ${name} From Code Bot. Your message is ${message}`,
            imageUrl: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg'   
        }
    }
}

export default new TestProcessor()