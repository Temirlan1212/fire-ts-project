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

  const { FilterProducts, FilterProducts2 } = useProducts();

  const products = [
    {
      image: "https://mobile.mypizza.kg/jpg/Райские-грезы.jpg",
      name: "пицца 30см",
      func: FilterProducts,
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
      func: FilterProducts2,
    },
    {
      image: "https://mobile.mypizza.kg/jpg/охотничья.jpg",
      name: "Пицца 40см",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Острый морской суп.jpg",
      name: "суп",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Гарнир Картофель по-деревенски.jpg",
      name: "гарниры",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
    },
    {
      image: "https://mobile.mypizza.kg/jpg/Категории Ролы.jpg",
      name: "role",
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
