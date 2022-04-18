import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";

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

  const { id, comId } = useParams();

  let pattern = /([A-Z a-z])\w+/g;
  let res: null | any = comId?.match(pattern);

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    getOneProduct(id);
  }, [id]);

  const [product, setProduct] = useState("");

  const getComment = (e: any) => {
    setProduct(e.target.value);
  };

  const comPush = async () => {
    let list2 = [...oneProduct[1].comments, product];

    await UpdateComment(res[0], {
      comments: list2,
    });

    setProduct("");
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <input name="comments" onChange={getComment} value={product} />

      <Button onClick={() => comPush()}>push</Button>

      {comments.map((elem: any) => (
        <ul>
          {elem.id === res[0] ? (
            <li>
              {elem.comments.map((item: any) => (
                <li>{item}</li>
              ))}
            </li>
          ) : (
            ""
          )}
        </ul>
      ))}
    </div>
  );
};

export default ProductDetails;

// comments.map((elem2: any) => (
//     elem.comId == elem2.comId ? <li>sdfjsd</li> : "";
//  ))

{
  /* <div>
{oneProduct.map((elem: any) => (
  <>
    <li>{elem.name}</li>
    <div>
      {list[0] === elem.comId ? (
        comments.map((item: any) => <div>{item.comId}</div>)
      ) : (
        <div>comments id didn"t the same</div>
      )}
    </div>
  </>
))}
</div> */
}
