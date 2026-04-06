import type { Route } from "./+types/writing.why-pause";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Why Pause - Leo Driesch" },
    {
      name: "description",
      content:
        "A short note on rest, distance, and appreciating completed work after stepping away from it.",
    },
  ];
}

export default function WhyPause() {
  return (
    <>
      <main className="container">
        <a href="/#writing" className="back-link">
          &lsaquo; Writing
        </a>

        <div className="article-header">
          <p className="caps">Why Pause</p>
          <p className="dim">May 12, 2023</p>
        </div>

        <div className="article-content">
          <p>
            After finishing or achieving something great, one may be tempted to
            stay in the flow and start with the next thing. However I think
            taking a break is important.
          </p>
          <p>
            You appreciate your achievements more if you take the time off. When
            just finished, you still have the work view of your result. You
            notice little things that could have been better. You may even be
            self-conscious about it.
          </p>
          <p>
            Only after taking some time off you see the project as a whole and
            are able to fully appreciate the work, even if not perfect. When
            you start to focus on the next thing immediately, you will always
            have the finished project in mind as &quot;could have been
            better&quot;.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
