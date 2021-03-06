import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import { useProducts } from "../../contexts/ProductContext";
import Item from "./Item2";
import "./Slider2.css";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const itemsToShow = 9;
const getMid = () => Math.ceil(itemsToShow / 2) - 1; // 0 based
function Slider2() {
  const [midItemIndex, setMidItemIndex] = useState(getMid);

  const {
    FilterPizza30sm,
    FilterPizza40sm,
    FilterColdDrinks,
    FilterBreakfast,
    fetchData,
    FilterBySalad,
  } = useProducts();

  const products = [
    {
      image:
        "data:image/jpeg;base64,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",
      name: "?????? ????????????????",
      func: fetchData,
    },
    {
      image:
        "https://mobile.mypizza.kg/jpg/?????????????? ?? ???????????????????? ????????????????????.jpg",
      name: "????????????????",
      func: FilterBreakfast,
    },
    {
      image: "https://mobile.mypizza.kg/jpg/??????????????-??????????.jpg",
      name: "?????????? 30????",
      func: FilterPizza30sm,
    },
    {
      image: "https://mobile.mypizza.kg/jpg/?????????????????? ????????.jpg",
      name: "role",
      func: FilterPizza40sm,
    },
    {
      image: "https://mobile.mypizza.kg/jpg/??????????????????.jpg",
      name: "?????????? 40????",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/???????????? ?????????????? ??????.jpg",
      name: "??????",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/???????????? ?????????????????? ????-????????????????????.jpg",
      name: "??????????????",
    },
    {
      image:
        "https://mobile.mypizza.kg/jpg/?????????? ???????????????????? ?? ?????????? ????????????.jpg",
      name: "????????????",
      func: FilterBySalad,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDyelehXACEJI5pa4516xwLWe91tYov0P8Q&usqp=CAU",
      name: "????????????????",
    },
    {
      image:
        "https://img-global.cpcdn.com/recipes/7fe43777cc6a897fcdb5c049765bdadabdf170b611b5a48d115949255879d18c/680x482cq70/pivo-v-domashnikh-usloviiakh-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%B5-%D1%84%D0%BE%D1%82%D0%BE-%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82%D0%B0.jpg",
      name: "????????",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/?????????????????? ???????????????? ??????????????.jpg",
      name: "??????????????",
      func: FilterColdDrinks,
    },
  ];

  const onChange = (_, next) => {
    const mid = getMid();
    setMidItemIndex(mid + next.index);
  };

  return (
    <div style={{ width: "1030px", margin: "0 auto", marginTop: "20px" }}>
      <Carousel
        itemsToShow={itemsToShow}
        onNextStart={onChange}
        onPrevStart={onChange}
      >
        {products.map((item) => (
          <>
            <div>
              <div
                className="Slider_Item"
                style={{
                  backgroundImage: `url("${item.image}")`,
                }}
                onClick={() => item.func()}
              ></div>
              <Item
                key={item.name}
                style={{ textAlign: "center", color: "white" }}
              >
                {" "}
                {item.name}
              </Item>
            </div>
          </>
        ))}
      </Carousel>
    </div>
  );
}
export default Slider2;
