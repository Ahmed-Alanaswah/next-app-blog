import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="an  image showing max"
          width={300}
          height={300}
        />
      </div>

      <h1>Hi , I am Ahmad</h1>
      <p>
        I blog about web development specially frontend frameworks like angular
        and react
      </p>
    </section>
  );
}

export default Hero;
