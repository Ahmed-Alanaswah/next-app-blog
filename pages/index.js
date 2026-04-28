import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "getting stated with nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "nextJs is the framework of react",
    date: "2026-02-10",
  },
];
function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}

export default HomePage;
