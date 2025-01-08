import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";

export default function MyPostDetails() {
  const [post, setPost] = useState();

  const { id } = useParams();

  useEffect(() => {
    getProfile(id).then(setPost);
  }, [id]);

  if (!post) {
    return null;
  }
  return (
    <>MY POST DETAILS</>
    // <>
    //   <img src={userProfile.imageLocation} alt={userProfile.firstName} />
    //   <h3>{userProfile.fullName}</h3>
    //   <p>Username: {userProfile.userName}</p>
    // </>
  );
}
