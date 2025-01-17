import { Server } from "socket.io";
import GameRoom from "../models/gameRooms.model.js";
import GameSession from "../models/gameSession.model.js";
import { checkWinner, updatePlayerStats } from "../lib/gameUtils.js";

export const gameSocket = (server) => {

    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', async ({ roomId, userId, joinCode }) => {
            const room = await GameRoom.findById(roomId);

            if (!room) {
                socket.emit('roomNotFound', { message: 'Room not found.' });
                return;
            }
            if (room.isPrivate && room.joinCode !== joinCode) {
                socket.emit('invalidJoinCode', { message: 'Invalid join code.' });
                return;
            }

            if (!room.players.includes(userId)) {
                if (room.players.length < 2) {
                    room.players.push(userId);
                    if (room.players.length === 2) {
                        room.status = 'ongoing';
                        const gameSession = new GameSession({ roomId, currentTurn: room.players[0] });
                        await gameSession.save();
                        io.to(roomId).emit('gameStart', room);
                    }
                    await room.save();
                }
                socket.join(roomId);
            } else {
                socket.emit('playerAlreadyInRoom', { message: 'You are already in this room.' });
            }
        });

        socket.on('makeMove', async ({ roomId, userId, row, col }) => {
            const session = await GameSession.findOne({ roomId }).populate('roomId');

            // Ensure session and roomId.players are properly populated
            if (!session || !session.roomId || !session.roomId.players || String(session.currentTurn) !== userId || session.boardState[row][col] !== '') {
                return;
            }

            // Determine the symbol for the current player
            const symbol = session.roomId.players[0] === session.currentTurn ? 'X' : 'O';
            session.boardState[row][col] = symbol;

            const winner = checkWinner(session.boardState);
            if (winner) {
                session.winner = userId;
                await session.save();
                await updatePlayerStats(userId, session.roomId.players);
                io.to(roomId).emit('gameEnd', { winner: userId });
                return;
            }

            session.currentTurn = session.roomId.players.find((id) => !id.equals(userId));
            await session.save();
            io.to(roomId).emit('updateBoard', session.boardState);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};