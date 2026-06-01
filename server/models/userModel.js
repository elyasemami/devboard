// server/models/userModel.js
// RESOURCE: https://www.npmjs.com/package/bcryptjs
//
// EXPLANATION: Models
// In MVC architecture (Model-View-Controller):
//   - Model   = data and business logic
//   - View    = what the user sees (React in our case)
//   - Controller = handles requests, calls model, returns response
//
// In a real app, models talk to a database (PostgreSQL, MongoDB, etc.).
// Here we use an IN-MEMORY array to keep things simple.
// The patterns are identical — swap the array operations for DB queries later.
//
// EXPLANATION: Password Hashing
// NEVER store plain-text passwords. bcryptjs hashes them:
//   bcrypt.hash('password123', 10) → '$2a$10$...' (a 60-char hash)
//   bcrypt.compare('password123', hash) → true/false
// The "10" is the salt rounds — higher = slower but more secure.
// RESOURCE: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

const bcrypt = require('bcryptjs')

// In-memory "database" — data resets on server restart
// In production: replace with real DB (PostgreSQL + Prisma, MongoDB + Mongoose, etc.)
let users = [
  // Pre-seeded demo user so you can test login immediately
  // Password will be hashed when the server starts (see initializeUsers below)
  {
    id: '1',
    name: 'Demo User',
    email: 'test@example.com',
    password: null, // Set by initializeUsers()
    createdAt: new Date().toISOString(),
  }
]

// Hash the demo user's password on startup
// (We can't define the hash inline because bcrypt.hash is async)
async function initializeUsers() {
  // TODO: Hash the demo user's password
  // HINT: users[0].password = await bcrypt.hash('password123', 10)
  users[0].password = await bcrypt.hash('password123', 10)
}

initializeUsers()

// ── USER MODEL FUNCTIONS ──────────────────────────────────────────────────
const UserModel = {
  // Find a user by email — used during login
  findByEmail: (email) => {
    // TODO: Search the users array for a matching email
    // HINT: users.find(u => u.email === email.toLowerCase())
    // Return undefined if not found (callers check for this)
    return users.find(u => u.email === email.toLowerCase())
  },

  // Find a user by id — used when verifying JWT tokens
  findById: (id) => {
    // TODO: Search by id
    // HINT: users.find(u => u.id === id)
    return users.find(u => u.id === id)
  },

  // Create a new user during registration
  create: async ({ name, email, password }) => {
    // TODO: Implement user creation
    // Steps:
    // 1. Check if email already exists: if (UserModel.findByEmail(email)) throw new Error(...)
    // 2. Hash the password: const hashedPassword = await bcrypt.hash(password, 10)
    // 3. Create a new user object with:
    //    id: Date.now().toString()  ← simple unique id (use UUID in production)
    //    name, email: email.toLowerCase(), password: hashedPassword
    //    createdAt: new Date().toISOString()
    // 4. Push to users array
    // 5. Return the new user (WITHOUT the password field!)
    //    const { password: _, ...safeUser } = newUser  ← destructure trick to omit password
    //    return safeUser

    const exists = UserModel.findByEmail(email)
    if (exists) throw new Error('Email already registered')

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Return user without password
    const { password: _, ...safeUser } = newUser
    return safeUser
  },

  // Verify a password attempt against the stored hash
  verifyPassword: async (plainText, hash) => {
    // TODO: Use bcrypt.compare to check if plainText matches the hash
    // HINT: return bcrypt.compare(plainText, hash)
    // RESOURCE: https://www.npmjs.com/package/bcryptjs#usage---async-recommended
    return bcrypt.compare(plainText, hash)
  },
}

module.exports = UserModel
