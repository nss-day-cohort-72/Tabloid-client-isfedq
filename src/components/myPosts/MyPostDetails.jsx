import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MyPostDetails() {
  const [post, setPost] = useState();

  const { id } = useParams();
  
  return (
    <>
      MY POST DETAILS
    </>
  );
}
