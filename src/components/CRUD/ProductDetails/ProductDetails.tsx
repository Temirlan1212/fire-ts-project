import { Button } from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import fire from "../../../fire";
import firebase from "firebase/compat/app";
import { useAuth } from "../../../contexts/AuthContext";

const ProductDetails = () => {
  const {
    data,
    setComment,
    comment,
    sendComment,
    fetchData,
    getOneProduct,
    comments,
    getComments,
    oneProduct,
    UpdateComment,
    getLikes,
    UpdateFieldsInADocument,
    likes,
  } = useProducts();

  const [countOfLikes, setCountOfLikes] = useState<any>([]);

  const {
    user: { email },
  } = useAuth();

  const [product, setProduct] = useState<any>();
  const [count, setCount] = useState<number>(0);
  const firestore = fire.firestore();
  const { id } = useParams();

  useEffect(() => {
    getComments();
  }, []);
  const runCallback = (cb: any) => {
    return cb();
  };
  useEffect(() => {
    fetchData();
    setCount(
      runCallback(() => {
        for (let i = 0; i < data.length; i++) {
          return data[i].id === id
            ? data[i].likes
            : console.log("ids doesnt match");
        }
      })
    );
  }, []);

  function getComment(e: any) {
    setProduct(e.target.value);
  }

  async function sendComments() {
    try {
      await addDoc(collection(firestore, "comments"), {
        email: email,
        id: id,
        comments: product,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        date: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
    setProduct("");
    getComments();
  }

  // async function UpdateLikes(id: any, updates: any) {
  //   await firestore.collection("likes").doc(id).update(updates);

  //   const doc = await firestore.collection("likes").doc(id).get();

  //   const product = {
  //     id: doc.id,
  //     ...doc.data(),
  //   };
  // }
  //   console.log(product);

  //   // let likes = firestore.collection("likes").doc(id);

  //   // likes.update({
  //   //   likes: firebase.firestore.FieldValue.increment(8),
  //   // });

  //   getLikes();
  // }

  useEffect(() => {
    try {
      addDoc(collection(firestore, "countOflikes"), {
        _id: id,
        email: email,
        count: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function sendProducts() {
    try {
      await addDoc(collection(firestore, "countOflikes"), {
        _id: id,
        email: email,
        count: 0,
      });
    } catch (error) {
      console.log(error);
    }

    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "countOflikes")
        );

        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
      } catch (err) {
        console.log(err);
      }
      setCountOfLikes(list);
    };
    fetchData();

    async function UpdateLikes(id: any, updates: any) {
      console.log(id, updates);
      await firestore.collection("countOflikes").doc(id).update(updates);

      const doc = await firestore.collection("count").doc(id).get();

      const product = {
        id: doc.id,
        ...doc.data(),
      };
    }
    countOfLikes?.map((elem: any) => {
      UpdateLikes(elem.id, {
        count: 1,
      });
    });
  }

  return (
    <div>
      <input name="comments" onChange={getComment} value={product} />

      <Button onClick={() => sendComments()}>push</Button>

      {comments.map((com: any) => {
        return id === com.id ? <li>{com.comments}</li> : "";
      })}

      {data.map((data: any) => {
        return data.id === id ? (
          <button
            onClick={async () => {
              setCount(
                data.email === email && data.likes === 0
                  ? data.likes + 1
                  : data.likes - 1
              );
              await UpdateFieldsInADocument(id, {
                likes: count,
              });
              await sendProducts();
            }}
          >
            increment
          </button>
        ) : (
          ""
        );
      })}

      {/* <button
        onClick={async () => {
          setCount(
            runCallback(() => {
              for (var i = 0; i < data.length; i++) {
                return data[i].likes;
              }
            }) - 1
          );
          await UpdateFieldsInADocument(data[0].id, {
            likes: count,
          });
        }}
      >
        decrement{" "}
      </button> */}

      {data?.map((data: any) => {
        return data.id === id ? <div>{data.likes}</div> : "";
      })}
    </div>
  );
};

export default ProductDetails;
