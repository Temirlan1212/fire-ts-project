import React, { useEffect, useState, useRef } from "react";
// import { db } from "../fire";

import SignOut from "../SignOut";
import fire from "../../../fire";
import SendMessage from "../SendMessage";
import "./Chat.css";

import { useProducts } from "../../../contexts/ProductContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import Navbar from "../../Navbar/Navbar";
import { Button } from "@mui/material";

const Chat: React.FC<React.ReactNode> = () => {
  const { messages, getMessage } = useProducts();
  const [data, setData] = useState<any>([]);

  const [show, setShow] = useState<any>(true);
  const [chatId, setChatId] = useState();

  console.log(
    data.map((item: any) => {
      item = item.createdAt.seconds;
      // return seconds.sort((a: number, b: number) => a - b);
    })
  );
  // data.seconds.sort((a: number, b: number) => a - b);

  console.log(data);
  const auth = fire.auth();

  const {
    user: { email },
  } = useAuth();

  const firestore = fire.firestore();

  const { sendMessage } = useProducts();

  const scroll = useRef<any>();

  useEffect(() => {
    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, "messages"));

        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [sendMessage]);

  const handleDelete = async (id: any) => {
    try {
      await deleteDoc(doc(firestore, "messages", id));
      setData(data.filter((item: any) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(show);
  return (
    <div style={{ backgroundColor: "black" }}>
      <Navbar />
      <div className="chat-main-section">
        <div className="chatContainer">
          {data.map((messages: any) => (
            <>
              <div className={email === messages.email ? "one" : "two"}>
                <div
                  className={email === messages.email ? "message1" : "message2"}
                >
                  <div className="email-message">
                    <div className="chat-email">{messages.email}</div>
                    <div className="chat-text"> {messages.text}</div>

                    {email === messages.email ? (
                      <Button
                        onClick={() =>
                          setShow(
                            show[0] ? [false, messages.id] : [true, messages.id]
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

                    {email === messages.email ? (
                      show[1] === messages.id ? (
                        <>
                          <Button
                            onClick={() =>
                              setShow(
                                show[0]
                                  ? [false, messages.id]
                                  : [true, messages.id]
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
                                  onClick={() => handleDelete(messages.id)}
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
            </>
          ))}
        </div>
        <SendMessage />

        <div ref={scroll}></div>
      </div>

      {/* <div className="main-container">
        <div className="head-container">
          <h1>• Mark Zuckerberg</h1>
          <a href="#" className="btn">
            <img
              src="https://svgshare.com/i/Knn.svg"
              alt="close"
              className="delete"
            />
          </a>
        </div>

        <div className="message-container">
          <h3>
            <span className="date">Today</span>
          </h3>
          <div className="sent">
            <h5 className="hour">10:53</h5>
            <p className="sent-bubble">{messages.text}</p>
          </div>
          <div className="received">
            <h5 className="hour">10:57</h5>
            <p className="received-bubble">
              Yo! Send it to my assistant and we'll review it during the year.
            </p>
          </div>
          <div className="sent">
            <h5 className="hour">11:03</h5>
            <p className="sent-bubble">But Mark...</p>
          </div>
        </div>

        <div className="input-container">
          <input type="text" placeholder="Enter your message" />
          <a href="#" className="btn">
            Send
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Chat;
