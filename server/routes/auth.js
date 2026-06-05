// server/routes/auth.js
// RESOURCE: https://expressjs.com/en/guide/routing.html#express-router
//
// EXPLANATION: Mounted at '/api/auth' in index.js, so:
//   router.post('/login')    → POST /api/auth/login
//   router.post('/register') → POST /api/auth/register
//   router.get('/me')        → GET  /api/auth/me

const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

const getRegisterValidation = (fieldsToSkip = []) => {
  const allValidations = [
    {
      name: "userEmail",
      check: body("email").notEmpty().withMessage("Name is Reuired!"),
    },
    {
      name: "userpassWord",
      check: body("password")
        .isLength({ min: 8 })
        .notEmpty()
        .withMessage("Password is Required and Min 8 Chars"),
    },
    {
      name: "userName",
      check: body("name").notEmpty().withMessage("Name is Required!"),
    },
  ];

  return allValidations
    .filter((item) => !fieldsToSkip.includes(item.name))
    .map((item) => item.check);

  const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error(errors.array()[0].msg);
      err.statusCode = 400;
      return next(err);
    }

    next();
  };
};

// Public — no token required
router.post("/register", getRegisterValidation(), register);
router.post("/login", getRegisterValidation("name"), login);

// TODO: Add the GET /me route — protected, requires authenticate middleware

router.get("/me", authenticate, getMe);

module.exports = router;
