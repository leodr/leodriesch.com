import type { Route } from "./+types/work.ahaus-taxi";

import { SiteFooter } from "../components/site-footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ahaus.taxi - Leo Driesch" },
    {
      name: "description",
      content:
        "Delivery platform for local restaurants with real-time tracking, interactive maps, and an operations dashboard.",
    },
  ];
}

export default function AhausTaxi() {
  return (
    <>
      <main className="container">
        <a href="/#work" className="back-link">
          &lsaquo; Work
        </a>

        <div className="project-header">
          <span className="label">Mobile App Development</span>
          <p className="caps project-title">ahaus.taxi</p>
          <p className="muted">
            A delivery platform for local restaurants during COVID-19, enabling
            businesses to offer delivery without building their own
            infrastructure. Drivers were paid individuals - think Uber for a
            small German town.
          </p>
        </div>

        <section className="project-section">
          <p className="label">Context</p>
          <p>
            During my time at Tobit.Software in 2020, I developed the
            &quot;ahaus.taxi&quot; mobile app to support restaurants and
            residents of the town of Ahaus during the COVID-19 pandemic. The
            goal was to give businesses a simple and efficient way to offer
            delivery without needing to build their own logistics.
          </p>
        </section>

        <section className="project-section">
          <p className="label">Scope</p>
          <p>
            I worked in a two-person team, handling frontend development and
            design while my colleague built the backend. A core piece was
            integrating the Google Maps API to build a full-screen interactive
            map where users and drivers could intuitively see routes, pins, and
            locations. The standout feature was real-time tracking, letting
            users follow their delivery status at any time.
          </p>
          <img
            src="/assets/projects/ahaus-taxi/wallet.png"
            alt="Customer view with real-time delivery tracking"
          />
          <p className="img-caption">Customer view with real-time delivery tracking</p>
        </section>

        <section className="project-section">
          <p className="label">Admin Dashboard</p>
          <p>
            Beyond the app itself, I developed a detailed and user-friendly
            admin dashboard. It provided key data and statistics in a clear
            format: driver counts, revenue, average delivery times, and other
            important metrics, all with graphical representations for quick
            overview.
          </p>
          <img
            src="/assets/projects/ahaus-taxi/dashboard.png"
            alt="Admin dashboard with delivery statistics"
          />
          <p className="img-caption">Admin dashboard with key delivery metrics</p>
        </section>

        <section className="project-section">
          <p className="label">User Experience</p>
          <p>
            The app prioritized intuitive usability. Drivers could quickly
            register, easily set their availability status, and accept delivery
            orders without friction. Seamless integration with navigation apps
            made completing deliveries straightforward.
          </p>
          <img
            src="/assets/projects/ahaus-taxi/mainscreen-available.png"
            alt="App homescreen showing driver availability status"
          />
          <p className="img-caption">
            Driver homescreen with availability status and ride history
          </p>
        </section>

        <section className="project-section">
          <p className="label">Impact</p>
          <p>
            The technical solution had real impact on local businesses. Donato
            Masella, owner of Schlosscaf&eacute; San Remo in Ahaus, described
            how the service helped his restaurant stay connected to customers
            and maintain at least a baseline of revenue during a time when
            in-person dining was impossible.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
