import type { Route } from "./+types/about";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Leo Driesch" },
    {
      name: "description",
      content:
        "Background, motivation, and the path from childhood HTML experiments to machine learning and product work.",
    },
  ];
}

export default function About() {
  return (
    <>
      <main className="container">
        <a href="/" className="back-link">
          &lsaquo; Home
        </a>

        <div className="article-header">
          <p className="caps">About</p>
        </div>

        <div className="about-content">
          <p>
            My mother is a self-taught developer. Her background is in
            landscape architecture, but she learned programming in the early
            2000s from books and made it her career. I borrowed her copy of a
            book on HTML and that&apos;s what started everything. I taught
            myself to build toy websites that nobody but my parents would ever
            see, and worked my way through books on Java and Android
            development.
          </p>
          <p>
            When I was in 11th grade, I coded an app that showed the
            substitution schedule for my school and the cafeteria&apos;s weekly
            menu. I showed it to my teacher, the school adopted it, and they
            gave me about 100 Euros for it. That was the moment I got hooked -
            the first time I had built something other people found useful and
            actually paid me for.
          </p>
          <p>
            After school, I started a dual study program, where I combined an
            apprenticeship as an IT specialist with university coursework. I
            finished the apprenticeship and transferred to the University of
            M&uuml;nster to get my Bachelor&apos;s degree in Computer Science.
            The hands-on experience from the apprenticeship was a huge advantage
            in courses. I found that my understanding of code helped me grasp
            topics like linear algebra on a fundamental level and develop a
            deep intuition for them. Forming connections between maths and
            programming is what made me fall in love with computer science.
          </p>
          <p>
            For my Bachelor&apos;s thesis, I worked with FH M&uuml;nster on
            automating bacterial colony segmentation using deep learning. I
            built the full pipeline: a custom annotation tool using the Segment
            Anything Model, a Faster R-CNN detection system trained with a
            strategic multi-stage approach, and a web application for
            researchers to use in the lab. The model achieved 92.9% precision
            and processes a full petri dish image in about four seconds.
          </p>
          <p>
            Now I&apos;m pursuing a Master&apos;s at TUM, focusing on machine
            learning and data analysis. I work as a web developer at Rohde
            &amp; Schwarz alongside my studies, building Angular applications
            in distributed systems. I also run Step Two Labs, through which I
            take on freelance projects.
          </p>
          <p>
            A lot of people study computer science because it pays well. I got
            into it because I love it, and I want to work on things that change
            the world. I&apos;m still looking for the right group of people who
            think the same way - people who push each other to do their best
            work.
          </p>
          <p>
            Outside of code, I&apos;m into design, sewing, and jogging. I care
            about how things look and feel, not just how they work. I think
            that sensibility makes me a better developer.
          </p>
        </div>
      </main>

      <SiteFooter showSignature />
    </>
  );
}
