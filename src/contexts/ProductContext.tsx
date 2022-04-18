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
  orderBy,
  query,
} from "firebase/firestore";
import fire from "../fire";
import { useAuth } from "./AuthContext";
import {
  calcSubPrice,
  calcTotalPrice,
  getCountProductsInCart,
} from "../helpers/functions";

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
  oneComment: any[];
  cart: any;
  cartLength: any;
}
const INIT_STATE: MessageState = {
  data: [],
  messages: [],
  comments: [],
  oneProduct: [],
  oneComment: [],

  cart: JSON.parse(localStorage.getItem("cart") || ""),
  cartLength: getCountProductsInCart,
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
    case ACTIONS.GET_ONE_COMMENT:
      return { ...state, comments: action.payload };
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
  }
};

const ProductContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const firestore = fire.firestore();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [msg, setMsg] = useState("");

  const [product, setProduct] = useState({
    name: "",
    description: "",
    picture: "",
    type: "",
    price: 0,
    comments: "",
    commnetsId: "",
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
        name: product.name,
        description: product.description,
        picture: product.picture,
        type: product.type,
        price: product.price,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        comId: product.commnetsId,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await addDoc(collection(firestore, "comments"), {
        comId: product.commnetsId,
        comments: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
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
    await firestore.collection("comments").doc(id).update(updates);

    const doc = await firestore.collection("comments").doc(id).get();

    const product = {
      id: doc.id,
      ...doc.data(),
    };
    console.log(product);
  }

  const getOneProduct = async (id: any) => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("comId", "==", id).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list: any = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      list.push(doc.data());
    });

    const citiesRef2 = firestore.collection("comments");
    const snapshot2 = await citiesRef2.where("comId", "==", id).get();

    if (snapshot2.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot2.forEach((doc) => {
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

  const FilterPizza30sm = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "pizza30").get();

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

  const FilterPizza40sm = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "pizza40").get();

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

  const FilterColdDrinks = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "cold-drinks").get();

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

  const FilterBreakfast = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "breakfast").get();

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

  const FilterBySalad = async () => {
    const citiesRef = firestore.collection("products");
    const snapshot = await citiesRef.where("type", "==", "salad").get();

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

  const FilterByTimestamp = async () => {
    const citiesRef = firestore.collection("products");
    // const snapshot = await citiesRef.where("type", "==", "pizza40").get();

    const snapshot = await citiesRef.orderBy("createdAt").get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list: any = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      list.unshift(doc.data());
    });
    dispatch({
      type: ACTIONS.GET_DATA,
      payload: list,
    });
  };

  const filterCheapPizza = async () => {
    const citiesRef = firestore.collection("products");
    // const snapshot = await citiesRef.where("type", "==", "role").get();
    const snapshot = await citiesRef.where("price", "<", 1000).get();

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

  const filterExpensivePizza = async () => {
    const citiesRef = firestore.collection("products");
    // const snapshot = await citiesRef.where("type", "==", "role").get();
    const snapshot = await citiesRef.where("price", ">", 1000).get();

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

  // ////////////////////////////////////! cart start

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "");

    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: [],
          totalPrice: 0,
        })
      );
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  const addProductToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "");

    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }

    let newProduct = {
      item: product,
      count: 1,
      subPrice: +product.price,
    };

    let productToFind = cart.products.filter(
      (item: any) => item.item.id === product.id
    );

    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.filter((item: any) => item.ite.id !== product.id);
    }

    cart.totalPrice = calcTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  const changeProductCount = (count: any, id: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "");

    cart.products = cart.products.map((product: any) => {
      if (product.item.id === id) {
        product.count = count;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart,
    });
  };

  function deleteCartProducts(id: any) {
    let cart = JSON.parse(localStorage.getItem("cart") || "");
    cart.products = cart.products.filter((elem: any) => elem.item.id !== id);

    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));

    getCart();

    dispatch({
      type: ACTIONS.CHANGE_CART_LENGTH,
      payload: cart.products.length,
    });
  }

  function checkProductInCart(id: any) {
    let cart = JSON.parse(localStorage.getItem("cart") || "");

    if (cart) {
      let newCart = cart.products.filter((elem: any) => elem.item.id == id);

      return newCart.length > 0 ? true : false;
    } else {
      cart = {
        product: [],
        totalPrice: 0,
      };
    }
  }
  console.log(state.productDetails);

  ////////////////////////////////////! cart end

  console.log(state.comments);

  const values = {
    getOneProduct,
    sendProducts,
    product,
    setProduct,
    handleDelete,
    fetchData,
    getComments,

    sendMessage,
    setMsg,

    oneComment: state.oneComment,
    UpdateComment,

    data: state.data,
    comments: state.comments,
    oneProduct: state.oneProduct,
    msg,

    UpdateFieldsInADocument,

    FilterByTimestamp,
    filterCheapPizza,
    filterExpensivePizza,
    FilterPizza40sm,
    FilterPizza30sm,
    FilterColdDrinks,
    FilterBreakfast,
    FilterBySalad,

    getCart,
    addProductToCart,
    changeProductCount,
    deleteCartProducts,
    checkProductInCart,
    cart: state.cart,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
