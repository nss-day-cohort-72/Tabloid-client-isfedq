import { Card, Container } from "reactstrap"

export const PostCard = ({ post }) => {
    const truncateText = (text) => {
        if (!text) {
            return '';
        }
        const words = text.split(' ');
        if (words.length > 10) {
            return text.slice(0, 10) + '...';
        }
        return text;
    }
    return (
        <Card className="shadow-sm mb-3" >
            <Container className="d-flex ps-0">
                <img src={post.headerImageUrl} alt="/public/emptyAvatar.png" className="img-fluid" />
                <div className="pt-2 p-1">
                    <h4>{post.title}</h4>
                    <p>{truncateText(post.content)}</p>
                </div>
                <div className="d-flex flex-column justify-content-center p-2 small-font">
                    <p>{`category: ${post.category?.name}`}</p>
                    <p>{`author: ${post.userProfile?.fullName}`}</p>
                    <p>{`duration: ${post.readTime} sec`}</p>
                </div>
            </Container>
        </Card>
    )
}