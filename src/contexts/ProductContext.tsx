import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACTIONS, JSON_API_PRODUCTS } from "../helpers/consts";
import firebase from "firebase/compat/app";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import fire from "../fire";
import { useAuth } from "./AuthContext";

export const productContext = createContext<any>(null);

export const useProducts = () => {
  return useContext(productContext);
};

const firestore = fire.firestore();

interface MessageState {
  data: any[];
  messages: any[];
  comments: any[];
  oneProduct: any[];
}
const INIT_STATE: MessageState = {
  data: [],
  messages: [],
  comments: [],
  oneProduct: [],
};

const reducer = (state: any = INIT_STATE, action: any) => {
  switch (action.type) {
    case ACTIONS.GET_DATA:
      return { ...state, data: action.payload };
    case ACTIONS.GET_MESSAGE:
      return { ...state, messages: action.payload };
    case ACTIONS.GET_ONE_PRODUCT:
      return { ...state, oneProduct: action.payload };
    case ACTIONS.GET_COMMENTS:
      return { ...state, comments: action.payload };
  }
};

const ProductContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const firestore = fire.firestore();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [msg, setMsg] = useState("");
  const [comment, setComment] = useState<any>();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
    type: "",
    id2: Date.now(),
    comments: "",
  });

  const {
    user: { email },
  } = useAuth();

  //!CHAT START
  async function sendMessage() {
    try {
      await addDoc(collection(firestore, "messages"), {
        email: email,
        text: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setMsg("");
  }
  //!CHAT ENDS

  //! CRUD starts

  async function sendProducts() {
    try {
      await addDoc(collection(firestore, "products"), {
        id2: Date.now(),
        name: product.name,
        description: product.description,
        picture: product.picture,
        type: product.type,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // comId: product.id2,
        comments: [],
      });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   await addDoc(collection(firestore, "comments"), {
    //     comId: product.id2,
    //     comments: comment,
    //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  //? get start

  const fetchData = async () => {
    let list: any = [];
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: list,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    let list: any = [];

    try {
      const querySnapshot = await getDocs(collection(firestore, "comments"));

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch({
        type: ACTIONS.GET_COMMENTS,
        payload: list,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //? get ends

  const handleDelete = async (id: any) => {
    try {
      await deleteDoc(doc(firestore, "products", id));
      dispatch({
        type: ACTIONS.GET_DATA,
        payload: state.data.filter((item: any) => item.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  };

  async function UpdateFieldsInADocument(id: any, updates: any) {
    await firestore.collection("products").doc(id).update(updates);

    const doc = await firestore.collection("products").doc(id).get();

    const product = {
      id: doc.id,
      ...doc.data(),
    };
    console.log(product);
  }

  async function UpdateComment(id: any, updates: any) {
    await firestore.collection("products").doc(id).update(updates);

    const doc = await firestore.collection("products").doc(id).get();

    const product = {
      id: doc.id,
      ...doc.data(),
    };
    console.log(product);
  }

  const getOneProduct = async (id: any) => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("id2", "==", id).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list: any = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      list.push(doc.data());
    });
    dispatch({
      type: ACTIONS.GET_ONE_PRODUCT,
      payload: list,
    });
  };

  //! CRUD ends

  //! filter start

  const FilterProducts2 = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "role").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list: any = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      list.push(doc.data());
    });
    dispatch({
      type: ACTIONS.GET_DATA,
      payload: list,
    });
  };
  //! filter ends

  console.log(state.comments);

  const values = {
    getOneProduct,
    FilterProducts2,
    sendProducts,
    product,
    setProduct,
    handleDelete,
    fetchData,
    getComments,

    sendMessage,
    setMsg,

    comment,
    setComment,

    data: state.data,
    comments: state.comments,
    oneProduct: state.oneProduct,
    msg,

    UpdateFieldsInADocument,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
