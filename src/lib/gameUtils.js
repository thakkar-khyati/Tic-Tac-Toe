import User from "../models/user.model.js";

export const updatePlayerStats = async (winnerId, players) => {
    if (winnerId) {
        await User.findByIdAndUpdate(winnerId, { $inc: { wins: 1 } });
        const loserId = players.find((id) => !id.equals(winnerId));
        if (loserId) await User.findByIdAndUpdate(loserId, { $inc: { losses: 1 } });
    } else {
        await User.updateMany({ _id: { $in: players } }, { $inc: { draws: 1 } });
    }
};


export const checkWinner = (board) => {
    const lines = [
        [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            return board[a[0]][a[1]];
        }
    }
    return null;
};
