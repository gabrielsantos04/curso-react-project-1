import './styles.css';
import { useState, useEffect, useCallback } from 'react';
import { PostCard } from '../../components/PostCard';
import { Button } from '../../components/Button';
import { InputSearch } from '../../components/InputSearch';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleChange = (event) => {
    const { value } = event.target;
    //this.setState({ searchValue: value });
    setSearchValue(value);
  };

  const loadMorePosts = () => {
    //const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    //this.setState({ posts, page: nextPage });
    setPosts(posts);
    setPage(nextPage);
  };

  const loadPost = useCallback(async (page, postsPerPage) => {
    //const { page, postsPerPage } = this.state;

    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    // this.setState({
    //   posts: postsAndPhotos.slice(page, postsPerPage),
    //   allPosts: postsAndPhotos,
    // });

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    loadPost(0, postsPerPage);
  }, [loadPost, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Buscando por: {searchValue}</h1>}

        <InputSearch searchValue={searchValue} handleChange={handleChange} />
      </div>
      <div className="posts">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {!searchValue && <Button onClick={loadMorePosts} text="Load more posts" />}
      </div>
    </section>
  );
};

// class Home2 extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   //bound function
//   //   this.handlePClick = this.handlePClick.bind(this);

//   //   this.state = {
//   //     name: "Gabriel Santos",
//   //     counter: 0,
//   //   };
//   // }

//   state = {
//     name: "Gabriel Santos",
//     counter: 0,
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: "",
//   };

//   componentDidMount() {
//     this.loadPost();
//   }

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   };

//   loadPost = async () => {
//     const { page, postsPerPage } = this.state;

//     const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
//     const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

//     const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

//     const postsJson = await posts.json();
//     const photosJson = await photos.json();

//     const postsAndPhotos = postsJson.map((post, index) => {
//       return { ...post, cover: photosJson[index].url };
//     });

//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   handlePClick = () => {
//     //const { name } = this.state;
//     //console.log(`<p> clicado - ${name}`);

//     //alterando estado
//     this.setState({ name: "Gabriel Lacerda" });
//   };

//   //arrow function n??o possui this dentro dela, com isso n??o ?? necess??rio realizar o bind da fun????o
//   handleAClick = (event) => {
//     event.preventDefault();

//     const { counter } = this.state;
//     this.setState({ counter: counter + 1 });
//   };

//   handleChange = (event) => {
//     const { value } = event.target;
//     this.setState({ searchValue: value });
//   };

//   render() {
//     const { posts, searchValue } = this.state;

//     const filteredPosts = !!searchValue
//       ? posts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && <h1>Buscando por: {searchValue}</h1>}

//           <InputSearch
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>
//         <div className="posts">
//           {filteredPosts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}

//           {!searchValue && (
//             <Button onClick={this.loadMorePosts} text="Load more posts" />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
