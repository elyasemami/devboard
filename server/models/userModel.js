// server/models/userModel.js
// RESOURCE: https://www.npmjs.com/package/bcryptjs
// RESOURCE: https://auth0.com/blog/hashing-in-action-understanding-bcrypt
//
// EXPLANATION: Models define the data structure and database operations.
// Here we use an in-memory array instead of a real database.
// The patterns are identical — swap array operations for DB queries later.
//
// NEVER store plain-text passwords.
// bcrypt.hash('password123', 10) → '$2a$10$...' (a 60-char one-way hash)
// bcrypt.compare('password123', hash) → true/false

const bcrypt = require('bcryptjs')

let users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'test@example.com',
    password: null, // set by initializeUsers() below
    createdAt: new Date().toISOString(),
  }
]

async function initializeUsers() {
  users[0].password = await bcrypt.hash('password123', 10)
}
initializeUsers()

const UserModel = {
  findByEmail: (email) => {
    // TODO: Return the user whose email matches
    // HINT: users.find(u => u.email === email.toLowerCase())
  },

  findById: (id) => {
    // TODO: Return the user whose id matches
    // HINT: users.find(u => u.id === id)
  },

  create: async ({ name, email, password }) => {
    // TODO: Step 1 — Check if email already taken
    // HINT: if (UserModel.findByEmail(email)) throw new Error('Email already registered')

    // TODO: Step 2 — Hash the password
    // HINT: const hashedPassword = await bcrypt.hash(password, 10)

    // TODO: Step 3 — Build and push the new user object
    // HINT: { id: Date.now().toString(), name, email: email.toLowerCase(), password: hashedPassword, createdAt: new Date().toISOString() }

    // TODO: Step 4 — Return the user WITHOUT the password field
    // HINT: const { password: _, ...safeUser } = newUser
    //        return safeUser
  },

  verifyPassword: async (plainText, hash) => {
    // TODO: Compare the plain text password to the stored hash
    // HINT: return bcrypt.compare(plainText, hash)
  },
}

module.exports = UserModel
