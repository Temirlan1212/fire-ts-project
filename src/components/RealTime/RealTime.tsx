import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import fire from "../../fire";
import RealTimeRender from "./RealTimeRender";

const RealTime = () => {
  const database = fire.database();
  const [task, setTask] = useState<any>();
  const [taskData, setTaskData] = useState<any>();

  const {
    user: { email },
  } = useAuth();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (task === "") {
      alert("please enter task");
    } else {
      database
        .ref("data")
        .child("tasks")
        .push({ task: task, email: email })
        .then(() => {
          //   alert("data inserted successfully");
          setTask("");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    database
      .ref("data")
      .child("tasks")
      .on("value", (snapshot) => {
        let newData: any = [];
        snapshot.forEach((data) => {
          newData.push({
            id: data.key,
            task: data.val(),
          });
        });
        setTaskData(newData);
      });
  };

  useEffect(() => {
    if (taskData !== "") {
      database
        .ref("data")
        .child("tasks")
        .on("value", (snapshot) => {
          let newData: any = [];
          snapshot.forEach((data) => {
            newData.push({
              id: data.key,
              task: data.val(),
            });
          });
          setTaskData(newData);
        });
    } else {
      console.log("undefined");
    }
  }, []);

  return (
    <div>
      <RealTimeRender task1={taskData} />

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
            value={task}
            placeholder="Message..."
            onChange={(e) => setTask(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
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
    </div>
  );
};

export default RealTime;
