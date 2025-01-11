import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ApplicationViews";
import { PostCard } from "../PostCard";
import { Container } from "reactstrap";
import { getSubscriptions } from "../../managers/subscriptionManager";

export const SubscribedPosts = () => {
  const { loggedInUser } = useContext(UserContext);
  const [subbedPosts, setSubbedPosts] = useState();

  useEffect(() => {
    getSubscriptions(loggedInUser.id).then((postsArray) => {
        console.log(postsArray)
        const subbedPostsList = []
        postsArray.forEach(item => {
            item.author.posts.forEach(post => {
                console.log(post)
                subbedPostsList.push(post)
            })
        })
        console.log(subbedPostsList)
        setSubbedPosts(subbedPostsList)
    })
  }, [loggedInUser]);

  return (
    <Container className="mt-5">
      <h2 className="text-center m-3 mb-5">Subscribed Posts</h2>
      {subbedPosts?.map(post => {
        return (
          <PostCard key={post.id} post={post} loggedInUser={loggedInUser} />
        );
      })}
    </Container>
  );
}
