import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";
import Sort from "../../Sort/Sort";
import "./ProductCard.css";

const ProductCard = () => {
  const {
    data,
    FilterProducts,
    handleDelete,
    UpdateFieldsInADocument,
    sendProducts,
    fetchData,
    getOneProduct,
  } = useProducts();

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{}}>
      <Sort />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        {data.map((data: any) => (
          <>
            <div className="albums">
              <div className="album">
                <img
                  className="album__artwork"
                  // src="https://source.unsplash.com/random/304x304?v=7"
                  src={data.picture}
                />
                <div className="album__details">
                  <h2>{data.name}</h2>
                  <p className="album__desc">{data.description}</p>

                  <div className="album__details__btn-container">
                    <button onClick={() => handleDelete(data.id)}>
                      delete
                    </button>

                    <button onClick={() => navigate(`/edit/${data.id}`)}>
                      edit
                    </button>

                    <div
                      onClick={() => {
                        getOneProduct(data.id2);
                        navigate(`/list/${data.id2}`);
                      }}
                    >
                      details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
