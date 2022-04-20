import React from "react";
import fire from "../../../fire";

const Set = () => {
  const firestore = fire.firestore();

  const SetProduct = async () => {
    // const data = {
    //   stringExample: "Hello, World!",
    // };
    // await firestore.collection("data").doc("one").set(data);

    const newCityRef = firestore.collection("set").doc("two");

    const res = await newCityRef.set({
      name: "siwje",
    });
  };

  return (
    <div>
      <button onClick={() => SetProduct()}>add</button>
    </div>
  );
};

export default Set;
