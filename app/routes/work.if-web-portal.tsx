import type { Route } from "./+types/work.if-web-portal";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "iF Design Award Web Portal - Leo Driesch" },
    {
      name: "description",
      content:
        "Full-stack award submission platform with complex validation, jury tools, and QA coverage across a large product surface.",
    },
  ];
}

export default function IfWebPortal() {
  return (
    <>
      <main className="container">
        <a href="/#work" className="back-link">
          &lsaquo; Work
        </a>

        <div className="project-header">
          <span className="label">Web Development</span>
          <p className="caps project-title">iF Design Award Web Portal</p>
          <p className="muted">
            A modern web portal for the globally renowned iF Design Award,
            enabling companies and designers worldwide to submit and manage
            their projects, with a dedicated interface for jury review.
          </p>
        </div>

        <section className="project-section">
          <p className="label">Context</p>
          <p>
            During my time at FLAVIA IT in early 2023, I had the opportunity to
            work on a complex web project for the renowned iF Design Award. The
            goal was to build a modern portal where companies and designers
            could submit projects globally, and where the award jury could
            browse and manage all submissions.
          </p>
        </section>

        <section className="project-section">
          <p className="label">Architecture</p>
          <p>
            The frontend was built with Angular, always tracking the latest
            version of the framework. We used RxJS for reactive programming and
            Angular Material as our UI foundation, though we extensively
            customized it to create a distinct design system aligned with the iF
            Design Award&apos;s brand identity.
          </p>
          <p>
            The backend ran on Java Spring Boot with a PostgreSQL database. The
            entire development process was organized using Scrum via Azure
            DevOps, maintaining transparency and efficiency across a team of
            about eight.
          </p>
          <img
            src="/assets/projects/if-web-portal/entry-list-screenshot.png"
            alt="Overview of submitted projects in the web portal"
          />
          <p className="img-caption">Entry list showing submitted design projects</p>
        </section>

        <section className="project-section">
          <p className="label">My Contributions</p>
          <p>
            I developed complex full-stack features, including extensive forms
            with detailed validation logic and the &quot;Mastering Dashboard&quot;
            - a tool for the jury to efficiently verify all submissions for
            completeness and data accuracy. The dashboard featured complex table
            structures with multiple layers, numerous filter options, and
            extensive interactivity.
          </p>
          <img
            src="/assets/projects/if-web-portal/complex-form-screenshot.png"
            alt="Complex submission form with validation"
          />
          <p className="img-caption">
            Complex submission form with multi-level validation
          </p>
          <p>
            Another key component was building user-friendly submission forms
            with comprehensive validations for delivery and submission options.
          </p>
        </section>

        <section className="project-section">
          <p className="label">Quality Assurance</p>
          <p>
            QA was a core part of our workflow. On the frontend, we implemented
            comprehensive end-to-end tests with Cypress, continuously maintained
            with every change to reliably cover the application&apos;s core
            functionality. On the backend, extensive unit tests ensured
            stability and long-term reliability.
          </p>
          <img
            src="/assets/projects/if-web-portal/mastering-dashboard-thumbnail.jpg"
            alt="Mastering dashboard for jury review"
          />
          <p className="img-caption">
            Mastering dashboard for jury review of submissions
          </p>
        </section>

        <section className="project-section">
          <p className="label">What I Learned</p>
          <p>
            This project gave me valuable experience developing features across
            an entire application stack. Working with a large codebase,
            debugging existing code efficiently, and collaborating closely in an
            agile team significantly expanded my technical capabilities -
            particularly in Angular development.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
