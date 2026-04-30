import Head from "next/head";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPost } from "../lib/posts-util";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>blog</title>
        <meta
          name="description"
          content="i post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPost();
  console.log(featuredPosts);
  return {
    props: { posts: featuredPosts },
  };
}

export default HomePage;
