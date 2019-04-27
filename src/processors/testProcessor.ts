import { Comment, Reply } from "../types";
import BaseProcessor from "./baseProcessor";

class TestProcessor extends BaseProcessor {
    constructor() {
        super('#girl-autobot')
    }  
    
    getReply({name, message}: Comment): Reply {
        return {
            message: `Hello ${name} From Code Bot. Your message is ${message}`,
            imageUrl: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg'   
        }
    }
}

export default new TestProcessor()