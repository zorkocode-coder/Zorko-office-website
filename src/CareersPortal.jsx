import React, { useState, useRef } from "react";
import { asset, departmentNames, contact } from "./data.js";
import { benefits, careerFaq } from "./careers-data.js";
import sitePhotos from "./site-photos.json";
import {teamAliases} from './people-data.js';
import "./careers.css";

const Arrow = () => <span aria-hidden="true">↗</span>;
const Label = ({ children }) => (
  <p className="label">
    <span />
    {children}
  </p>
);
const Button = ({ href, children, light = false }) => (
  <a href={href} className={`button ${light ? "light" : ""}`}>
    {children}
    <Arrow />
  </a>
);
function Heading({ label, children }) {
  return (
    <div className="career-heading" data-reveal>
      <Label>{label}</Label>
      <h2>{children}</h2>
    </div>
  );
}

export default function CareersPortal() {
  const [benefitTab, setBenefitTab] = useState(0),
    [teamFilter, setTeamFilter] = useState("All teams"),
    [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Open to opportunities"),
    [draft, setDraft] = useState(null),
    [copyStatus, setCopyStatus] = useState("");
  const formRef = useRef(null),
    draftRef = useRef(null);
  const activeBenefits = benefits[benefitTab];
  const teams = departmentNames.filter(
    ([name, group]) =>
      (teamFilter === "All teams" || group === teamFilter) &&
      `${name} ${group} ${teamAliases[name] || ''}`.toLowerCase().includes(search.toLowerCase()),
  );
  function applyTo(name) {
    setDepartment(name);
    setDraft(null);
    document.getElementById("career-application")?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setTimeout(
      () =>
        document
          .getElementById("candidate-name")
          ?.focus({ preventScroll: true }),
      350,
    );
  }
  function prepareApplication(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hello ZORKO team,\n\nPlease direct this career enquiry to the HR team. I would like to enquire about current opportunities in ${department}.\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nCurrent city: ${data.get("city")}\nArea of interest: ${department}\nExperience: ${data.get("experience")}\nResume / portfolio link: ${data.get("portfolio") || "CV to be attached to this email"}\n\nAbout me:\n${data.get("note")}\n\nThank you.`;
    setDraft({
      body,
      url: `mailto:${contact.email}?subject=${encodeURIComponent(`Career application enquiry — ${department} — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`,
    });
    setCopyStatus("");
    setTimeout(() => draftRef.current?.focus(), 0);
  }
  async function copyApplication() {
    try {
      await navigator.clipboard.writeText(draft.body);
      setCopyStatus("Application text copied.");
    } catch {
      setCopyStatus("Select and copy the application text below.");
    }
  }
  return (
    <>
      <section className="career-hero">
        <div className="career-hero-photo">
          <img
            src={`/media/${sitePhotos["Upcoming outlets support"]}`}
            alt="ZORKO’s upcoming-outlet support team at the Surat headquarters"
            fetchPriority="high"
            data-parallax
          />
        </div>
        <div className="wrap career-hero-content">
          <Label>BUILD YOUR CAREER AT ZORKO</Label>
          <h1>
            Good work.
            <br />
            Great people.
            <br />
            <em>Your next chapter.</em>
          </h1>
          <p>
            Bring your skills. Find your people.
            <br />
            Build something that reaches beyond your desk.
          </p>
          <div className="career-hero-actions">
            <Button href="#career-teams" light>
              Find your team
            </Button>
            <a href="#career-benefits" className="career-hero-secondary">
              Discover the benefits <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className="career-location">
            OUR CORPORATE HOME · SURAT, GUJARAT
          </span>
        </div>
      </section>
      <nav className="career-subnav" aria-label="Careers sections">
        <div className="wrap">
          {[
            ["Why ZORKO", "#career-why"],
            ["Our culture", "#career-culture"],
            ["Perks & benefits", "#career-benefits"],
            ["Explore teams", "#career-teams"],
            ["Apply", "#career-application"],
          ].map(([n, h]) => (
            <a key={h} href={h}>
              {n}
            </a>
          ))}
        </div>
      </nav>
      <section className="section wrap career-why" id="career-why">
        <Label>MORE THAN A JOB TITLE</Label>
        <div>
          <h2 data-reveal>
            A place to contribute.
            <br />
            <em>People to grow with.</em>
          </h2>
          <p>
            ZORKO brings creative thinkers, operational minds and people-focused
            teams together in Surat. The work connects a national food network.
            The workplace is built through everyday conversations, shared
            learning and the people around you.
          </p>
          <div className="career-principles">
            <article>
              <span>01</span>
              <h3>Do work that connects.</h3>
              <p>
                See how your discipline fits into the bigger picture, from
                brands and content to outlet support.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Learn alongside others.</h3>
              <p>
                Work with different teams, share practical knowledge and build
                your own perspective.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Be part of the everyday.</h3>
              <p>
                Celebrations, recognition and shared experiences give the
                working week its human side.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="career-team-photo-section wrap">
        <figure className="career-team-preview" data-reveal>
          <img
            src={`/media/${sitePhotos.Sales}`}
            alt="The ZORKO sales team together at the Surat corporate headquarters"
            loading="lazy"
          />
          <figcaption>
            <span>THE SALES TEAM · SURAT HEADQUARTERS</span>
            <strong>
              Individual strengths.
              <br />
              <em>Collective ambition.</em>
            </strong>
            <a href="/people/" className="text-link">
              Meet the teams <Arrow />
            </a>
          </figcaption>
        </figure>
      </section>
      <section className="career-culture section" id="career-culture">
        <div className="wrap">
          <div className="section-title">
            <Heading label="LIFE BEYOND THE DESK">
              The work matters.
              <br />
              <em>So do the moments between.</em>
            </Heading>
            <a href="/culture/" className="text-link">
              Life at ZORKO <Arrow />
            </a>
          </div>
          <div className="career-culture-grid">
            <figure className="career-culture-main" data-reveal>
              <img
                src={asset(40, 0)}
                alt="The ZORKO team celebrating together"
                loading="lazy"
              />
              <figcaption>
                <small>CELEBRATING TOGETHER</small>
                <strong>
                  People first.
                  <br />
                  <em>Always.</em>
                </strong>
              </figcaption>
            </figure>
            <figure data-reveal>
              <img
                src="/media/mag-40-04.webp"
                alt="ZORKO colleagues together on a trekking trip"
                loading="lazy"
              />
              <figcaption>
                <small>OUTSIDE THE OFFICE</small>
                <strong>A different kind of team day.</strong>
              </figcaption>
            </figure>
            <figure data-reveal>
              <img
                src={`/media/${sitePhotos.Marketing}`}
                alt="The ZORKO marketing team at the Surat headquarters"
                loading="lazy"
              />
              <figcaption>
                <small>THE MARKETING TEAM</small>
                <strong>Meet the marketers.</strong>
              </figcaption>
            </figure>
          </div>
          <div className="career-culture-notes">
            <span>Team celebrations</span>
            <span>Trips & shared experiences</span>
            <span>Learning together</span>
            <span>Employee recognition</span>
          </div>
        </div>
      </section>
      <section className="section career-benefits" id="career-benefits">
        <div className="wrap">
          <Heading label="THE BENEFITS OF BELONGING">
            A little more support.
            <br />
            <em>A lot more to look forward to.</em>
          </Heading>
          <p className="career-benefits-intro">
            From everyday refreshments to family experiences and tenure
            milestones. Explore the employee benefits featured in the November
            2026 ZORKO Spotlight.
          </p>
          <div
            className="benefit-tabs"
            role="tablist"
            aria-label="Benefits by tenure"
          >
            {benefits.map((b, i) => (
              <button
                key={b.id}
                id={`benefit-tab-${b.id}`}
                aria-controls="benefit-panel"
                aria-selected={i === benefitTab}
                role="tab"
                tabIndex={i === benefitTab ? 0 : -1}
                onClick={() => setBenefitTab(i)}
                onKeyDown={(e) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : (benefitTab +
                              (e.key === "ArrowRight" ? 1 : -1) +
                              3) %
                            3;
                    setBenefitTab(next);
                    document
                      .getElementById(`benefit-tab-${benefits[next].id}`)
                      ?.focus();
                  }
                }}
              >
                <small>0{i + 1}</small>
                {b.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div
            className="benefit-panel"
            id="benefit-panel"
            role="tabpanel"
            aria-labelledby={`benefit-tab-${activeBenefits.id}`}
          >
            <div className="benefit-panel-intro">
              <Label>{activeBenefits.label}</Label>
              <p>{activeBenefits.intro}</p>
            </div>
            <div className="benefit-cards" key={activeBenefits.id}>
              {activeBenefits.items.map(([title, text, photo, alt], i) => (
                <article key={title}>
                  <div>
                    <img src={photo} alt={alt} loading="lazy" />
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {title.includes("EOM") && (
                    <small className="benefit-condition">
                      EMPLOYEE RECOGNITION REWARD
                    </small>
                  )}
                </article>
              ))}
            </div>
          </div>
          <p className="benefit-policy-note">
            <span aria-hidden="true">↳</span> Benefits are drawn from magazine
            pages 36–37. Tenure, eligibility, performance conditions and current
            policy are confirmed by HR during recruitment.
          </p>
        </div>
      </section>
      <section className="career-recognition">
        <div className="wrap">
          <div>
            <Label>GOOD WORK DESERVES A MOMENT</Label>
            <h2>
              Seen.
              <br />
              Appreciated.
              <br />
              <em>Celebrated.</em>
            </h2>
            <p>
              The magazine features Employee of the Month and Employee of the
              Year recognition, alongside celebrations of individual and team
              performance. Its recognition pages also show scooters and iPhones
              gifted to top performers.
            </p>
            <a href="/culture/" className="text-link">
              Meet the culture <Arrow />
            </a>
          </div>
          <div className="career-recognition-photo">
            <img
              src="/media/life-38-0.webp"
              alt="ZORKO colleagues celebrating employee performance recognition"
              loading="lazy"
            />
            <span>THE PEOPLE BEHIND THE PROGRESS</span>
          </div>
        </div>
      </section>
      <section className="section wrap career-teams" id="career-teams">
        <Heading label="FIND YOUR PEOPLE">
          Different strengths.
          <br />
          <em>A shared direction.</em>
        </Heading>
        <p className="career-teams-intro">
          Explore the teams that make ZORKO work. These are our departments; the
          company confirms current vacancies and role requirements directly.
        </p>
        <div className="career-team-toolbar">
          <div className="career-search">
            <label htmlFor="career-team-search">Search teams</label>
            <input
              type="search"
              id="career-team-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try marketing, technology, HR…"
            />
          </div>
          <div className="filter-row" aria-label="Filter career teams">
            {[
              "All teams",
              "Leadership",
              "Growth",
              "Operations",
              "People",
              "Creative",
            ].map((x) => (
              <button
                key={x}
                aria-pressed={teamFilter === x}
                onClick={() => setTeamFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <p className="career-team-count" role="status">
          {teams.length} {teams.length === 1 ? "team" : "teams"} to explore
        </p>
        <div className="career-team-list">
          {teams.map(([name, group, text], i) => (
            <article key={name}>
              <span className="career-team-number">
                {String(
                  departmentNames.findIndex((x) => x[0] === name) + 1,
                ).padStart(2, "0")}
              </span>
              <div>
                <small>{group} · SURAT</small>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
              <button onClick={() => applyTo(name)}>
                Register interest <Arrow />
              </button>
            </article>
          ))}
        </div>
        {!teams.length && (
          <div className="career-empty">
            <h3>A different way to find your fit.</h3>
            <p>
              Try another search or clear the filters to explore every team.
            </p>
            <button
              className="text-link"
              onClick={() => {
                setSearch("");
                setTeamFilter("All teams");
              }}
            >
              Show all teams <Arrow />
            </button>
          </div>
        )}
      </section>
      <section className="career-workplace">
        <img
          src={asset(50, 0)}
          alt="The connected workspaces at ZORKO’s Surat headquarters"
          loading="lazy"
          data-parallax
        />
        <div className="wrap">
          <Label>YOUR EVERYDAY SETTING</Label>
          <h2>
            A real workplace.
            <br />
            <em>Room to make your mark.</em>
          </h2>
          <Button href="/office/" light>
            Step inside the office
          </Button>
        </div>
      </section>
      <section
        className="section wrap career-apply-section"
        id="career-application"
      >
        <div className="career-apply-intro">
          <Label>LET’S START WITH A HELLO</Label>
          <h2>
            Your story.
            <br />
            <em>Our next conversation.</em>
          </h2>
          <p>
            Tell us a little about yourself and the team you’re interested in.
            Prepare an application email to the company, then attach your CV and
            send it from your own email app.
          </p>
          <ol className="career-apply-steps">
            <li>
              <span>01</span>Choose your team.
            </li>
            <li>
              <span>02</span>Tell us about your background.
            </li>
            <li>
              <span>03</span>Prepare your email and attach your CV.
            </li>
          </ol>
          <a href="/contact/" className="text-link">
            Have a question? Talk to us <Arrow />
          </a>
        </div>
        <form
          ref={formRef}
          className="career-application-form"
          onSubmit={prepareApplication}
          onChange={() => {
            if (draft) setDraft(null);
          }}
        >
          <div className="career-form-topline">
            <span>APPLICATION ENQUIRY</span>
            <small>* REQUIRED FIELDS</small>
          </div>
          <div className="career-form-fields">
            <label htmlFor="candidate-name">
              Full name *
              <input
                id="candidate-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label htmlFor="candidate-email">
              Email address *
              <input
                id="candidate-email"
                name="email"
                autoComplete="email"
                type="email"
                required
                maxLength={150}
              />
            </label>
            <label htmlFor="candidate-phone">
              Phone number *
              <input
                id="candidate-phone"
                name="phone"
                autoComplete="tel"
                type="tel"
                required
                pattern={"[+0-9 \\(\\)\\-]{7,20}"}
                title="Enter a phone number with 7 to 20 characters."
                maxLength={20}
              />
            </label>
            <label htmlFor="candidate-city">
              Current city *
              <input
                id="candidate-city"
                name="city"
                autoComplete="address-level2"
                required
                maxLength={100}
              />
            </label>
            <label htmlFor="department-interest">
              Your area of interest *
              <select
                id="department-interest"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDraft(null);
                }}
              >
                {[
                  "Open to opportunities",
                  ...departmentNames.map((x) => x[0]),
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label htmlFor="candidate-experience">
              Experience *
              <select
                id="candidate-experience"
                name="experience"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select your experience
                </option>
                {[
                  "Student / fresher",
                  "Less than 1 year",
                  "1–3 years",
                  "3–5 years",
                  "5+ years",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label htmlFor="candidate-portfolio" className="career-field-wide">
              Resume or portfolio link <span>(optional)</span>
              <input
                id="candidate-portfolio"
                name="portfolio"
                type="url"
                placeholder="https://"
                maxLength={500}
              />
            </label>
            <label htmlFor="candidate-note" className="career-field-wide">
              A little about you *
              <textarea
                id="candidate-note"
                name="note"
                rows={4}
                maxLength={1800}
                required
                placeholder="Your background, what you enjoy doing, and why this team interests you."
              />
            </label>
          </div>
          <button type="submit" className="button">
            Prepare application email <Arrow />
          </button>
          <p className="career-form-disclosure">
            Your details stay in this page until you choose to open or copy the
            email. Nothing is submitted to a recruitment system.
          </p>
          {draft && (
            <div
              className="career-application-draft"
              ref={draftRef}
              tabIndex={-1}
              role="region"
              aria-label="Your prepared application"
            >
              <h3>Your application email is ready.</h3>
              <p>
                Add your CV in your email app before sending. The company can
                then advise on current opportunities.
              </p>
              <a className="button" href={draft.url}>
                Open application in email <Arrow />
              </a>
              <button
                type="button"
                onClick={copyApplication}
                className="text-link"
              >
                Copy application text <span aria-hidden="true">⧉</span>
              </button>
              <p role="status">{copyStatus}</p>
              <details>
                <summary>Review application text</summary>
                <pre>{draft.body}</pre>
              </details>
            </div>
          )}
        </form>
      </section>
      <section className="career-faq section">
        <div className="wrap">
          <Heading label="A FEW THINGS YOU MIGHT WONDER">
            Before your
            <br />
            <em>next chapter.</em>
          </Heading>
          <div>
            {careerFaq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
