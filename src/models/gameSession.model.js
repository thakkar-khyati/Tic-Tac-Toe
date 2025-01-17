import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameRoom"
    },
    boardState: {
        type: [[String]],
        default: [['', '', ''], ['', '', ''], ['', '', '']]
    },
    currentTurn: {
        type: mongoose.Schema.ObjectId
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
})

const GameSession = mongoose.model('GameSession', gameSessionSchema)

export default GameSession