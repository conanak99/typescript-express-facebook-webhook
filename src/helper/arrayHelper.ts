export function pickRandomElement<T = any>(input: Array<T>) {
   const randomIndex = Math.floor(Math.random() * input.length)
   return input[randomIndex]
}

export function pickRandomElements<T = any>(input: Array<T>, count: number) {
    if (count > input.length) throw new Error('Count should be less than input length')

    const result: Array<T> = []
    const pickedIndexes : Set<number> = new Set()

    for (let index = 0; index < count; index++) {
        let randomIndex = 0
        do {
            randomIndex = Math.floor(Math.random() * input.length)
        } while (pickedIndexes.has(randomIndex))
        
        result.push(input[randomIndex])
        pickedIndexes.add(randomIndex)
    }
    
    return result
 }