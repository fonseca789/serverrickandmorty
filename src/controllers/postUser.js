const { User } = require("../DB_connection");
const validate = require("./validationEmailPassword.js");

const postUser = async (req, res) => {
  const { email, password } = req.body;
  const validarEmailPassword = validate(email, password);
  if (!validarEmailPassword) {
    res.status(404).json(validarEmailPassword);
  } else {
    try {
      const [user, created] = await User.findOrCreate(
        {
          where: { 
            email: email, 
          },
          defaults: {
            password: password,
          },
        },
        
      );
      if(created) {

        res.status(201).json({ usuario: user.email, crearUserDone: true });
      }
      else {
        res.status(400).json({"usuario ya existe": user.email, crearUserDone: false})
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // res.json(validarEmailPassword);
};

module.exports = postUser;
