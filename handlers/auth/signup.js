const bcrypt = require("bcrypt");
const { User } = require("./user.model");

module.exports = (app) => {
  app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(403).send("missing required fields");
    }

    const user = new User({
      fullName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const newUser = await user.save();

    res.send(newUser);
  });
};
