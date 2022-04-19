import { Button, Input } from "@mui/material";
import React, { useContext, useState } from "react";
import fire from "../../fire";
import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductContext";

const SendMessage: React.FC<React.ReactNode> = () => {
  const auth = fire.auth();
  const { setMsg, msg, sendMessage } = useProducts();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          sx={{
            maxWidth: "800px",
            width: "100%",
            marginTop: "10px",
            backgroundColor: "white",
            height: "70px",
          }}
          value={msg}
          placeholder="Message..."
          onChange={(e) => setMsg(e.target.value)}
        />

        <Button
          onClick={sendMessage}
          style={{
            backgroundColor: "black",
            color: "white",
            height: "70px",
            marginBottom: "-10px",
          }}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default SendMessage;
