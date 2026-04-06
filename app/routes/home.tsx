import { lazy, Suspense } from "react";

import type { Route } from "./+types/home";

import { SiteFooter } from "../components/site-footer";

const CoinPortrait = lazy(() => import("../components/coin-portrait"));

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leo Driesch" },
    {
      name: "description",
      content:
        "Software developer based in Munich, working between software, design, and AI.",
    },
  ];
}

export default function Home() {
  return (
    <div style={{ overflow: "hidden" }}>
      <main className="container">
        <div className="hero">
          <div className="hero-text">
            <p className="label">Leo Driesch</p>
            <p className="hero-title">
              Somewhere between engineering and alchemy
            </p>
            <p className="muted">
              Software developer based in Munich. I started coding as a kid from
              my mother&apos;s HTML book, built my first paid app in high
              school, and never stopped. Currently pursuing a Master&apos;s in
              Computer Science at TUM, focusing on machine learning. By day I
              write Angular at Rohde &amp; Schwarz, by night I explore
              what&apos;s possible with AI.
            </p>
            <p>
              <a href="/about">Read my story &rsaquo;</a>
            </p>
          </div>

          <Suspense fallback={<PortraitFallback />}>
            <CoinPortrait />
          </Suspense>
        </div>

        <section>
          <p className="label">Experience</p>
          <br />
          <div className="timeline">
            <div className="timeline-item">
              <span className="bold">Rohde &amp; Schwarz</span>
              <span className="muted">
                Angular development in distributed systems
              </span>
              <span className="dim">Dec 2025 - now · Web Developer</span>
            </div>
            <div className="timeline-item">
              <span className="bold">FLAVIA IT-Management</span>
              <span className="muted">
                Full-stack development with Java Spring, Angular, and Postgres
              </span>
              <span className="dim">Nov 2023 - May 2024 · Working Student</span>
            </div>
            <div className="timeline-item">
              <span className="bold">Tobit Laboratories</span>
              <span className="muted">
                Web development with React; iOS development with UIKit and Swift
              </span>
              <span className="dim">Aug 2019 - Aug 2021 · Dual Student</span>
            </div>
          </div>
        </section>

        <section>
          <p className="label">Education</p>
          <br />
          <div className="timeline">
            <div className="timeline-item">
              <span className="bold">Technical University of Munich</span>
              <span className="muted">
                M.Sc. Computer Science - Machine Learning &amp; Computer Vision
              </span>
              <span className="dim">Oct 2025 - now</span>
            </div>
            <div className="timeline-item">
              <span className="bold">University of M&uuml;nster</span>
              <span className="muted">B.Sc. Computer Science</span>
              <span className="muted">
                <a href="/assets/thesis.pdf" target="_blank" rel="noreferrer">
                  Thesis: Automating Bacterial Colony Segmentation with Deep
                  Learning
                </a>
              </span>
              <span className="dim">Oct 2021 - Aug 2024</span>
            </div>
            <div className="timeline-item">
              <span className="bold">
                Westphalian University of Applied Sciences
              </span>
              <span className="muted">
                Dual B.Sc. Computer Science - Software Systems
              </span>
              <span className="dim">Sep 2019 - Aug 2021</span>
            </div>
            <div className="timeline-item">
              <span className="bold">IHK Nord Westfalen</span>
              <span className="muted">
                Apprenticeship: IT Specialist for Application Development
              </span>
              <span className="dim">Aug 2019 - Jul 2021</span>
            </div>
          </div>
        </section>

        <section id="work">
          <p className="label">Work</p>
          <br />
          <div className="project-grid">
            <a href="/work/colony-detection" className="project-card">
              <span className="label">Automation &amp; AI</span>
              <span className="bold">Bacterial Colony Detection</span>
              <span className="muted">
                AI-powered solution for automated bacterial colony counting
                using Faster R-CNN, developed in collaboration with FH
                M&uuml;nster. 92.9% precision, 4-second inference time.
              </span>
            </a>
            <a href="/work/ahaus-taxi" className="project-card">
              <span className="label">Mobile App Development</span>
              <span className="bold">ahaus.taxi</span>
              <span className="muted">
                Delivery platform for local restaurants during COVID-19,
                featuring real-time tracking, interactive maps, and an admin
                dashboard.
              </span>
            </a>
            <a href="/work/if-web-portal" className="project-card">
              <span className="label">Web Development</span>
              <span className="bold">iF Design Award Web Portal</span>
              <span className="muted">
                Modern web portal for global design award submissions and jury
                management, built in an agile team of eight.
              </span>
            </a>
          </div>
        </section>

        <section id="writing">
          <p className="label">Writing</p>
          <br />
          <ul className="post-list">
            <li className="post-item">
              <a href="/writing/why-pause">
                <span className="bold">Why Pause</span>
                <span className="dim">May 12, 2023</span>
                <span className="muted">
                  On taking a break after finishing something great, and why you
                  appreciate your work more when you step away from it.
                </span>
              </a>
            </li>
            <li className="post-item">
              <a href="/writing/taste-over-skill">
                <span className="bold">Taste over Skill</span>
                <span className="dim">March 14, 2023</span>
                <span className="muted">
                  As creative tools get better, technical skill matters less.
                  What remains is taste - the ability to know a good idea when
                  you see one.
                </span>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <SiteFooter showSignature />
    </div>
  );
}

function PortraitFallback() {
  return (
    <div className="hero-portrait">
      {/* <img src="/assets/portrait-cut.png" alt="Leo Driesch" /> */}
    </div>
  );
}
