import GameRoom from "../models/gameRooms.model.js";

export const createGameRoom = async (req, res) => {
    try {
        const { roomName, isPrivate } = req.body;
        if (!roomName) {
            return res.status(400).json({ success: false, message: "game Room name is required." })
        }
        const createdBy = req.user._id
        let joinCode = null
        if (isPrivate) {
            joinCode = Math.random().toString(36).slice(2, 8)
        }

        const gameRoom = await GameRoom.findOne({ roomName })

        if (gameRoom) {
            return res.status(400).json({ success: false, message: "Game room already exists.", gameRoom })
        }

        const newGameRoom = new GameRoom({ roomName, createdBy, isPrivate, joinCode });

        if (newGameRoom) {
            await newGameRoom.save();
            return res.status(200).json({ message: true, message: "Game room created successfully.", gameRoom: newGameRoom });
        } else {
            return res.status(400).json({ success: false, message: "Invalid game room data." })
        }
    } catch (error) {
        console.log("Error in createGameRoom controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getActiveGameRooms = async (req, res) => {
    try {
        const rooms = await GameRoom.find({ status: 'waiting', isPrivate: false });
        if (rooms.length < 0) {
            return res.status(400).json({ success: false, message: "No Public rooms that are active right now." })
        }
        return res.status(200).json({ success: true, message: "Active Public rooms found successfully.", gameRooms: rooms });
    } catch (error) {
        console.log("Error in getActiveGameRooms controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getLeaderBoard = async (req, res) => {
    try {
        const topPlayers = await User.find().sort({ wins: -1 }).limit(10);
        res.status(200).json({ success: true, topPlayers });
    } catch (error) {
        console.log("Error in getLeaderBoard controller", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}