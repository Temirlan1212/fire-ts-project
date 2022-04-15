import { Button } from "@mui/material";
import React from "react";
import fire from "../../fire";

const SignOut = () => {
  const auth = fire.auth();
  console.log(auth);

  return (
    <div>
      <Button onClick={() => auth.signOut}>SignOut</Button>
    </div>
  );
};

export default SignOut;
