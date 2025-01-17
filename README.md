Practical Test: Turn-Based Tic-Tac-Toe Game Backend
Objective: Develop a backend system for a turn-based multiplayer Tic-Tac-Toe game.
Requirements:
1. User Authentication
● Create an API for user registration and login.
○ Use JWT for user authentication and session management.
2. Game Room Management
● Create APIs to:
○ Create Game Room:
■ Fields: roomName, createdBy (player ID), and isPrivate
(boolean).
■ If the room is private, generate a unique join code.
○ Join Game Room:
■ Public: Players can join by room ID.
■ Private: Players can join using the join code.
○ List Active Rooms:
■ Retrieve all public rooms with available spots.
3. Game Logic
● Players take turns to make moves.
● Validate moves:
○ Ensure moves are within bounds and follow turn order.
○ Detect when a player wins or if it’s a draw.
● Use WebSockets for real-time updates:
○ Start Game: Notify players when the game starts.
○ Player Move: Broadcast the player’s move to the opponent.
○ Game End: Notify both players of the game result (win/loss/draw).
4. Game State Management
● Use a 3x3 matrix to represent the board (boardState field).
● Update the board state after each move and switch the turn.
5. APIs for Leaderboard
● Track wins, losses, and draws for each player in the users collection.
● Create an API to fetch the top 10 players based on their win count.
Bonus Features
1. Spectator Mode:
○ Allow additional players to join as spectators in a game room.
○ Broadcast moves to all spectators.
2. Rematch Functionality:
○ Allow players to request a rematch after the game ends.
Assessment Criteria
1. Code Structure:
○ Clean, modular, and follows best practices (e.g., middleware for
authentication).
2. Game Logic:
○ Correct implementation of turn-based gameplay.
○ Proper handling of game results (win/loss/draw).
3. Real-time Communication:
○ Effective WebSocket usage for real-time updates.
4. Database Usage:
○ Efficient schema design and queries for gameRooms, gameSessions, and
users.
Deliverables
● A GitHub repository with the project code.
● Postman collection or Swagger documentation for APIs.