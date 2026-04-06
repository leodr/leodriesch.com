import type { Route } from "./+types/work.colony-detection";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bacterial Colony Detection - Leo Driesch" },
    {
      name: "description",
      content:
        "AI-powered bacterial colony segmentation and counting system with a custom annotation workflow and Faster R-CNN model.",
    },
  ];
}

export default function ColonyDetection() {
  return (
    <>
      <main className="container">
        <a href="/#work" className="back-link">
          &lsaquo; Work
        </a>

        <div className="project-header">
          <span className="label">Automation &amp; AI</span>
          <p className="caps project-title">Bacterial Colony Detection</p>
          <p className="muted">
            An AI-powered solution for precise segmentation and automated
            counting of bacterial colonies in microbiological lab analyses,
            developed in collaboration with FH M&uuml;nster.
          </p>
          <p className="muted project-link">
            <a href="/assets/thesis.pdf" target="_blank" rel="noreferrer">
              Read the thesis &rsaquo;
            </a>
          </p>
        </div>

        <section className="project-section">
          <p className="label">The Problem</p>
          <p>
            Analyzing bacterial growth on petri dishes is fundamental to
            microbiology, but manual colony counting is time-consuming and
            tedious. In collaboration with FH M&uuml;nster, I developed an
            automated solution that significantly accelerates the analysis
            process.
          </p>
        </section>

        <section className="project-section">
          <p className="label">Data Pipeline</p>
          <p>
            We built a specialized photo apparatus using a Raspberry Pi High
            Quality Camera that captures 9.24-megapixel images of petri dishes
            with bacterial cultures, providing a strong foundation for training
            machine learning models.
          </p>
          <p>
            For efficient data annotation, I developed a custom web application
            integrating the Segment Anything Model (SAM). This allowed
            researchers at FH M&uuml;nster and me to quickly and precisely
            create segmentation masks through simple click interactions,
            significantly reducing annotation effort. This produced a dataset of
            200 precisely annotated images.
          </p>
          <img
            src="/assets/projects/colony-detection/annotation.jpg"
            alt="SAM-based annotation interface showing precise instance segmentation masks"
          />
          <p className="img-caption">
            Precise instance segmentation masks created with the SAM-based
            annotation tool
          </p>
        </section>

        <section className="project-section">
          <p className="label">Model Training</p>
          <p>
            I used the Faster R-CNN architecture, known for its high accuracy in
            object detection tasks. The model was strategically pre-trained on
            the COCO dataset, then fine-tuned on the specialized AGAR dataset,
            before final training on our custom-collected data. This multi-stage
            approach significantly improved model performance, achieving high
            precision with a low error rate.
          </p>
          <img
            src="/assets/projects/colony-detection/validation-performance.png"
            alt="Validation performance improvement through strategic pre-training"
          />
          <p className="img-caption">
            Validation performance improvement through strategic pre-training
          </p>
        </section>

        <section className="project-section">
          <p className="label">Results</p>
          <div className="project-metrics">
            <div>
              <span className="metric-value">92.9%</span>
              <span className="metric-label">Precision</span>
            </div>
            <div>
              <span className="metric-value">87.3%</span>
              <span className="metric-label">Recall</span>
            </div>
            <div>
              <span className="metric-value">6.26</span>
              <span className="metric-label">Mean Abs. Error</span>
            </div>
          </div>
          <p>
            The trained model detects bacterial colonies in approximately four
            seconds on a standard computer - a process that takes several
            minutes when done manually. The mean absolute error of 6.26 colonies
            per plate (out of often hundreds) demonstrates the model&apos;s
            robustness.
          </p>
          <img
            src="/assets/projects/colony-detection/colony-recognition.jpg"
            alt="Examples of colony detection across various densities and shapes"
          />
          <p className="img-caption">
            Detection examples across various colony densities and shapes
          </p>
        </section>

        <section className="project-section">
          <p className="label">Deployment</p>
          <p>
            To ensure practical usability, I integrated the model into a
            user-friendly web application that is currently deployed at FH
            M&uuml;nster, enabling researchers to quickly automate colony
            counting. The system is designed for scalability, with ongoing
            improvements possible through additional annotated data.
          </p>
          <img
            src="/assets/projects/colony-detection/inference-app.jpg"
            alt="Web application for automated colony counting"
          />
          <p className="img-caption">
            User-friendly inference application for quick colony counting
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
