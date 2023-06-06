/* eslint-disable react/no-unescaped-entities */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import backgroundImage from "../../public/table-bg.jpg";
import styles from "./menu.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bites of Bytes</title>
        <meta name="description" content="Generated by LevAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed bottom-0 left-0 right-0 top-0 bg-[#b3906d]">
        <Image
          className="pointer-events-none object-cover object-center"
          src={backgroundImage}
          alt=""
          loading="eager"
          fill
        />
      </div>
      <div className="pb-50 relative px-3 pb-40 pt-20 md:px-10">
        <div className={styles.menu_container}>
          <h1 className={styles.menu_title}>Bites of Bytes</h1>
          <p className={styles.menu_description}>
            A vibrant haven for the techno-gourmets, where the enticing fusion
            of Artificial Intelligence and your business needs is cooked to
            perfection. Our menu presents a host of delectable solutions, each
            designed to tantalize your digital taste buds while maximizing your
            efficiency, scalability, and impact. Every dish is a technologic
            marvel, masterfully crafted by our AI chefs to serve a specific
            function in your enterprise.
          </p>

          <div className={styles.menu_section}>
            <h2 className={styles.menu_subtitle}>APPETIZERS</h2>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>
                  Role-playing Chatbot
                </span>{" "}
                <span className={styles.menu_food}>
                  (Conversational Canapés)
                </span>{" "}
                A spicy medley of engaging characters, these chatbots simulate
                your chosen narratives, seasoned with your custom data for that
                extra personal touch. Ideal for training simulations or
                entertaining your clientele, these bots are the conversation
                starters that keep on giving.
              </p>
            </div>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>Customer Chatbots</span>{" "}
                <span className={styles.menu_food}>(Cordial Quiche)</span>{" "}
                Tender, flavorful chatbots designed to cater to your customer
                inquiries with robotic precision and human-like warmth. Enjoy
                uninterrupted customer service that's automated yet authentic,
                perfect for a startup looking to scale or a company aiming to
                streamline support.
              </p>
            </div>
          </div>

          <div className={styles.menu_section}>
            <h2 className={styles.menu_subtitle}>SOUPS & SALADS</h2>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>Forecasting Soup</span>{" "}
                <span className={styles.menu_food}>(AI Clam Chowder)</span> A
                creamy, dreamy blend of data that predicts future outcomes. The
                ideal comfort food for businesses looking to forecast sales,
                manage resources, or analyze market trends.
              </p>
            </div>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>
                  Algorithm Optimization
                </span>{" "}
                <span className={styles.menu_food}>(Algorithmic Arugula)</span>{" "}
                This crisp, fresh algorithmic mix is a perfect blend of machine
                learning models optimized for performance. Tossed together to
                offer you faster and more accurate results, it's a feast for
                companies looking to streamline their processes.
              </p>
            </div>
          </div>

          <div className={styles.menu_section}>
            <h2 className={styles.menu_subtitle}>MAIN COURSES</h2>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>
                  Cognitive Automation
                </span>{" "}
                <span className={styles.menu_food}>
                  (Cognitive Chicken Curry)
                </span>{" "}
                A spicy offering that combines RPA and AI to mimic and augment
                human tasks and judgment, turning mundane chores into an
                automatic process with a kick of efficiency.
              </p>
            </div>
            <div className={styles.menu_item}>
              <p>
                <span className={styles.menu_service}>
                  PDF & Image Extraction
                </span>{" "}
                <span className={styles.menu_food}>
                  (Scan-and-Serve Skewers)
                </span>{" "}
                Succulent skewers that skillfully slice, sort, and serve your
                scattered and sizable visual sources, such as images and PDFs,
                into a splendidly structured symphony of streamlined snippets.
              </p>
            </div>

            <div className={styles.menu_section}>
              <h2 className={styles.menu_subtitle}>DESSERTS</h2>
              <div className={styles.menu_item}>
                <p>
                  <span className={styles.menu_service}>Roast</span>{" "}
                  <span className={styles.menu_food}>
                    (The Saucy AI Retort)
                  </span>{" "}
                  A saucy chatbot that hurls insults at whatever topic you
                  provide. Seasoned with a dash of cheeky humor, this bot roasts
                  your given targets to a crisp.
                </p>
              </div>
              <div className={styles.menu_item}>
                <p>
                  <span className={styles.menu_service}>AI Imagery</span>{" "}
                  <span className={styles.menu_food}>(Trickster Truffles)</span>{" "}
                  A sweetly deceptive treat that uses AI image and video
                  generation as guaranteed conversation starters with your high
                  value clients. Ideal for brands looking for a fun, innovative
                  way to engage a niche audience.
                </p>
              </div>
              <div className={styles.menu_item}>
                <p>
                  <span className={styles.menu_service}>Juice my Resume</span>{" "}
                  <span className={styles.menu_food}>(Career Creampuff)</span>{" "}
                  Light and fluffy, this delectable dish will turn 'Cashier at
                  McDonalds' into 'handled direct-to-consumer financial
                  transactions for a multi-billion dollar company', adding a
                  dollop of intrigue to your career story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
