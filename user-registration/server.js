const express = require("express");
const fs = require("fs");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

// client ကနေ post method နဲ့ request လုပ်လာခဲ့သည်ရှိသော်
server.post("/users", (req, res) => {
  // client ဆီက လာတဲ့ req body ထဲကနေ destructure လုပ်ပြီး name, email, password ကိုယူပါမယ်။
  const { name, email, password } = req.body;
  // အကယ်၍ name, email, password တွေ မပါရင်
  if (!name || !email || !password) {
    // 400 status code နဲ့ error message ပြမယ်
    return res.status(400).json({ error: "All fields are required to fill!" });
  }
  // အကယ်၍ client က name, email, password အားလုံးကိုရိုက်ထည့်ပြီး register လုပ်ထားပြီးပြီဆိုရင်
  fs.readFile("./users.json", "utf-8", (err, data) => {
    if (err) {
      // 500 status code နဲ့ error message ပြမယ်
      return res
        .status(500)
        .json({ error: "An error occurred, please try again." });
    }

    const usersList = JSON.parse(data);

    // userList ထဲ တူညီသော email နဲ့ user ရှိမရှိ စစ်ဆေးမယ်
    const checkUser = usersList.users.find((user) => user.email === email);
    if (checkUser) {
      return res.status(400).json({ error: "User already registered!" });
    } else {
      // တူညီသော user မရှိဘူးဆိုရင်
      usersList.users.push({ name, email, password });
      fs.writeFile("./users.json", JSON.stringify(usersList), (err) => {
        if (err) {
          // 500 status code နဲ့ error message ပြမယ်
          return res
            .status(500)
            .json({ error: "Failed to save user, Sever Error" });
        } else {
          // 201 status code နဲ့ success message ပြမယ်
          return res
            .status(201)
            .json({ message: "User created successfully!" });
        }
      });
    }
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log("Server is running at PORT: " + PORT);
});
