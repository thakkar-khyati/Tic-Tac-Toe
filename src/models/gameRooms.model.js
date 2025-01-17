import mongoose from "mongoose";

const gameRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    joinCode: {
        type: String,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        enum: ['waiting', 'ongoing', 'finished'],
        default: "waiting"
    }
}, { timestamps: true })

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

export default GameRoom