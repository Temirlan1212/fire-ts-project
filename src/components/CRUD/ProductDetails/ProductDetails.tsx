import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();

  console.log(id);
  const {
    getOneProduct,
    data,
    comments,
    getComments,
    oneProduct,
    setComment,
    comment,
    sendComment,
  } = useProducts();

  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    getOneProduct(id);
  }, [id]);

  let list: any = [];
  const getCom = () => {
    oneProduct.map((elem: any) => {
      return list.push(elem.comId);
    });
  };
  getCom();

  console.log(comment);

  const getComment = (e: any) => {
    setComment(e.target.value);
  };

  return (
    <div>
      {/* <input onChange={getComment} />
      <Button onClick={() => sendComment()}>sent</Button> */}
      <div>
        {oneProduct.map((elem: any) => (
          <>
            <li>{elem.name}</li>
            <li>
              {/* {comments.map((item: any) => (
                <div>
                  {elem.comId === item.comId ? <div>{item.comments}</div> : ""}
                </div>
              ))} */}
            </li>
          </>
        ))}
      </div>
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
