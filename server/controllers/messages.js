import { UserModel } from "../models/User"

export const getMessages = async (req, res) => {
    const client = new MongoClient(URL)
    const { userId, correspondingUserId } = req.query

    // console.log(userId, correspondingUserId)

    try {
        await client.connect()
        const database = client.db('data')
        const messages = database.collection('messages')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }

        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } catch(err) {
        console.log(err)
    } finally {
        await client.close()
    }
}