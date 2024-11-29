import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 201 Created – အများအားဖြင့် POST သို့မဟုတ် PUT Method နဲ့လာတဲ့ Request တွေကို တုံ့ပြန်ဖို့ပါ။
  const [serverMsg, setServerMsg] = useState("");

  // register button ကို နှိပ်ပြီးနောက် server ကို user တစ်ယောက်ချင်းစီတိုင်း၏ informaiton ကို POST method နဲ့ ပေးပို့မယ်။
  const handleSubmit = async (e) => {
    e.preventDefault();
    // user ထည့်လိုက်တဲ့ အချက်အလက်တွေကို object တစ်ခုထဲ တစ်စုတည်းသတ်မှတ်လိုက်မယ်။
    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    const options = {
      method: "POST", // ပို့မယ့် method အမျိုးအစား
      headers: {
        "Content-Type": "application/json", // headers အမျိုးအစား
      },
      body: JSON.stringify(newUser), // body မှာ အပေါ်က newUser ရဲ့ data တွေကိုပေးပို့ပါမယ်။
    };

    // fetch ကို အသုံးပြီး ပေးပို့ပါမယ်။ *************
    try {
      const postUserData = await fetch("http://localhost:5000/users", options);

      const data = await postUserData.json();

      if (!postUserData.ok) {
        if (postUserData.status === 400) {
          setServerMsg(data.error);
          setTimeout(() => {
            setServerMsg("");
          }, 3000);
        }

        if (postUserData.status === 500) {
          setServerMsg(data.error);
          setTimeout(() => {
            setServerMsg("");
          }, 3000);
        }
      }

      if (postUserData.status === 201) {
        setServerMsg(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setServerMsg("");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button type="submit">Register</button>
        {serverMsg && <p>{serverMsg}</p>}
      </form>
    </div>
  );
}

export default App;
