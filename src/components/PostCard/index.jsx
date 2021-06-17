import P from 'prop-types';
import './styles.css';
export const PostCard = (props) => {
  const { post } = props;

  return (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  title: P.string,
  cover: P.string,
  body: P.string,
  id: P.number,
  post: P.any,
};
