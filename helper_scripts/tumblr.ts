import fs from 'fs'
import axios from 'axios'
import delay from 'delay'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.TUMBLR_API_KEY
const page = 'vingirls.tumblr.com'

const startOffset = 250 
const total = 769

let all : string[] = []

const getImages = async (offset: number) : Promise<string[]> => {
    const url = `https://api.tumblr.com/v2/blog/${page}/posts/photo?api_key=${apiKey}&offset=${offset}`
    const response = await axios(url)
    const posts = response.data.response.posts

    const images = posts.map((post: any) => post.photos[0].original_size.url)
    return images
}

async function getAndStoreAllImages() {
    let begin = startOffset

    while (begin < total) {
        console.log('Begin get data at offset ' + begin)
        const images = await getImages(begin)
        console.log('Finish get data at offset ' + begin)
        await delay(1 * 1000)
        all = all.concat(images)
        begin += 20
    }

    const dbFolderPath = `${__dirname}/../db` 
    if (!fs.existsSync(dbFolderPath)) {
        fs.mkdirSync(dbFolderPath)
    }
    fs.writeFileSync(`${dbFolderPath}/tumblr.json`, JSON.stringify(all, null, 2))
}

getAndStoreAllImages()