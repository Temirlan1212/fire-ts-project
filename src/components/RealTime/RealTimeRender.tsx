import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../Navbar/Navbar";

const RealTimeRender = (task1: any) => {
  const [data, setData] = useState<any>([]);

  const [show, setShow] = useState<any>(true);
  const [chatId, setChatId] = useState();

  const {
    user: { email },
  } = useAuth();

  const scroll = useRef<any>();

  return (
    <div>
      <div style={{ backgroundColor: "black" }}>
        <Navbar />
        <div className="chat-main-section">
          <div className="chatContainer">
            <>
              {task1?.task1?.map((data: any) => (
                <div className={email === data.task.email ? "one" : "two"}>
                  <div
                    className={
                      email === data.task.email ? "message1" : "message2"
                    }
                  >
                    <div className="email-message">
                      <div className="chat-email">{data.task.email}</div>
                      <div className="chat-text"> {data.task.task}</div>

                      {email === data.task.email ? (
                        <Button
                          onClick={() =>
                            setShow(
                              show[0]
                                ? [false, data.task.id]
                                : [true, data.task.id]
                            )
                          }
                          sx={{
                            position: "absolute",
                            top: "0",
                            right: "-10px",
                          }}
                        >
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50px",
                              backgroundColor: "black",
                            }}
                          ></div>
                        </Button>
                      ) : (
                        ""
                      )}

                      {email === data.task.email ? (
                        show[1] === data.task.id ? (
                          <>
                            <Button
                              onClick={() =>
                                setShow(
                                  show[0]
                                    ? [false, data.task.id]
                                    : [true, data.task.id]
                                )
                              }
                              sx={{
                                position: "absolute",
                                top: "0",
                                right: "-10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50px",
                                  backgroundColor: "black",
                                }}
                              ></div>
                            </Button>

                            <div>
                              {show[0] ? (
                                <>
                                  <button
                                    className="chat-btn"
                                    // onClick={() => handleDelete(messages.id)}
                                  >
                                    delete
                                  </button>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>

          <div ref={scroll}></div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeRender;
