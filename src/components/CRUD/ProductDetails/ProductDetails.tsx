import { Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
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
  } = useProducts();

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

  const getComment = (e: any) => {
    setProduct(e.target.value);
  };

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

  async function UpdateLikes(id: any, updates: any) {
    await firestore.collection("likes").doc(id).update(updates);

    const doc = await firestore.collection("likes").doc(id).get();

    const product = {
      id: doc.id,
      ...doc.data(),
    };
    console.log(product);
  }

  return (
    <div>
      <input name="comments" onChange={getComment} value={product} />

      <Button onClick={() => sendComments()}>push</Button>

      {comments.map((com: any) => {
        return id === com.id ? <li>{com.comments}</li> : "";
      })}

      <button
        onClick={async () => {
          setCount(count + 1);
          await UpdateLikes(id, {
            likes: count,
          });
        }}
      >
        increment
      </button>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>decrement </button>
    </div>
  );
};

export default ProductDetails;
