import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function MyPostsList() {
  const [posts, setPosts] = useState([]);

//   const getUserProfiles = () => {
//     getProfiles().then(setUserProfiles);
//   };
//   useEffect(() => {
//     getUserProfiles();
//   }, []);
  return (
    <>
    MY POSTS
    </>
    // <>
    //   <p>User Profile List</p>
    //   {userprofiles.map((p) => (
    //     <p key={p.id}>
    //       {p.firstName} {p.lastName} {p.userName}{" "}
    //       <Link to={`/userprofiles/${p.id}`}>Details</Link>
    //     </p>
    //   ))}
    // </>
  );
}
