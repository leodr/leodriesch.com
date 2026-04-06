import type { Route } from "./+types/writing.taste-over-skill";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Taste over Skill - Leo Driesch" },
    {
      name: "description",
      content:
        "Thoughts on how better creative tools shift the advantage from execution toward taste and judgment.",
    },
  ];
}

export default function TasteOverSkill() {
  return (
    <>
      <main className="container">
        <a href="/#writing" className="back-link">
          &lsaquo; Writing
        </a>

        <div className="article-header">
          <p className="caps">Taste over Skill</p>
          <p className="dim">March 14, 2023</p>
        </div>

        <div className="article-content">
          <p>
            As tools aiding the creative process become better, the advantage
            one human has in crafting a specific output diminishes. While today,
            one designer might have an advantage over another by being better at
            turning an idea into reality, that advantage will get smaller and
            smaller as better tools are developed and more people get access to
            it.
          </p>
          <p>
            So while this edge gets smaller and smaller, the differentiating
            factor becomes having better ideas. Idea finding may also be aided
            by technology down the road, so what&apos;s left is differentiating
            an idea worth pursuing from one that&apos;s not.
          </p>
          <p>
            So in the future, one person will probably produce better artwork,
            text or iconography, solely by having better taste than another.
          </p>
          <p>
            What better taste then means is another question. Maybe having a
            better feel for what current trends are. Maybe having a taste
            that&apos;s more aligned with what everybody else likes. Or maybe
            just having a taste that comes into fashion out of luck.
          </p>
          <p>
            But currently I&apos;m sceptical of learning the craft of creating
            digital output. Learning to illustrate, learning to design
            iconography or learning to build 3D worlds might not be technical
            skills worth pursuing.
          </p>
          <p>
            What&apos;s left to pursue then is the skill of learning to
            brainstorm new ideas and getting deep into a topic, so you can start
            developing what&apos;s called a taste.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
