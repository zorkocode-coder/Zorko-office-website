import React, { useEffect, useRef, useState } from "react";
import {
  asset,
  nav,
  timeline,
  departmentNames,
  brands,
  stories,
  contact,
} from "./data.js";
import imageManifest from "./images.json";
import PeoplePortal from "./PeoplePortal.jsx";
import CareersPortal from "./CareersPortal.jsx";

const pageImages = (page) => imageManifest.filter((x) => x.page === page);
const Arrow = () => <span aria-hidden="true">↗</span>;
function Link({ to, children, className = "", ...props }) {
  return (
    <a href={to} className={className} {...props}>
      {children}
    </a>
  );
}
function Button({ to, children, light = false }) {
  return (
    <Link to={to} className={`button ${light ? "light" : ""}`}>
      {children}
      <Arrow />
    </Link>
  );
}
function Picture({ src, alt = "", className = "", eager = false, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
function Label({ children }) {
  return (
    <p className="label">
      <span />
      {children}
    </p>
  );
}
function SectionTitle({ label, title, link, to }) {
  return (
    <div className="section-title" data-reveal>
      <div>
        <Label>{label}</Label>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link to={to} className="text-link">
          {link}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
function useMotion(route) {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((e) => observer.observe(e));
    const additions = new MutationObserver(() =>
      document
        .querySelectorAll("[data-reveal]:not(.in-view)")
        .forEach((el) => observer.observe(el)),
    );
    const main = document.querySelector("main");
    if (main) additions.observe(main, { childList: true, subtree: true });
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      document.documentElement.style.setProperty(
        "--page-progress",
        `${(y / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100}%`,
      );
      if (!reduced) {
        document.querySelectorAll("[data-parallax]").forEach((el) => {
          const r = el.parentElement.getBoundingClientRect();
          if (r.bottom > 0 && r.top < innerHeight)
            el.style.transform = `translate3d(0,${Math.max(-70, Math.min(70, (innerHeight / 2 - r.top - r.height / 2) * 0.11))}px,0) scale(1.1)`;
        });
        const stage = document.querySelector(".office-scroll");
        if (stage) {
          const r = stage.getBoundingClientRect();
          const p = Math.max(
            0,
            Math.min(1, -r.top / (stage.offsetHeight - innerHeight)),
          );
          stage.style.setProperty("--tour-progress", p);
          stage.style.setProperty("--tour-shift", `${-p * 66.666}%`);
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      observer.disconnect();
      additions.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [route]);
}
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const panel = useRef(null),
    toggle = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [route]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("nav a")?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const els = [
          toggle.current,
          ...panel.current.querySelectorAll("a,button"),
        ];
        const first = els[0],
          last = els.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <header className={`header ${open ? "menu-active" : ""}`}>
        <Link to="/" className="wordmark" aria-label="ZORKO Limited home">
          <img
            src="/media/zorko-original-logo.webp"
            alt="ZORKO — Brand of Food Lovers"
            width="593"
            height="226"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {[
            ["The company", "/about/"],
            ["Our office", "/office/"],
            ["Our people", "/people/"],
            ["Our brands", "/brands/"],
            ["Journal", "/journal/"],
          ].map(([n, p]) => (
            <Link
              key={p}
              to={p}
              className={p === "/journal/" ? "journal-nav" : undefined}
              aria-current={route === p ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/careers/" className="careers-link">
            Build with us <Arrow />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="full-menu"
            onClick={() => setOpen((x) => !x)}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <i />
            <i />
          </button>
        </div>
      </header>
      {open && (
        <div
          ref={panel}
          className="full-menu"
          id="full-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onClick={(e) => {
            if (e.target.closest("a")) setOpen(false);
          }}
        >
          <div className="menu-intro">
            <Label>EXPLORE ZORKO</Label>
            <p>
              One vision.
              <br />
              <em>Many possibilities.</em>
            </p>
            <Link to="https://zorko.in/" target="_blank" rel="noreferrer">
              Food & franchise website <Arrow />
            </Link>
          </div>
          <nav>
            {[["Home", "/"], ...nav].map(([name, path], i) => (
              <Link
                to={path}
                key={path}
                aria-current={route === path ? "page" : undefined}
              >
                <small>{String(i + 1).padStart(2, "0")}</small>
                {name}
                <Arrow />
              </Link>
            ))}
          </nav>
          <span className="menu-location">SURAT, GUJARAT · INDIA</span>
        </div>
      )}
    </>
  );
}
function Mosaic() {
  const photos = imageManifest.filter((x) => x.page >= 52).slice(0, 96);
  return (
    <div className="network-mosaic" data-reveal>
      <svg
        viewBox="0 0 1440 400"
        role="img"
        aria-label="ZORKO wordmark filled with photographs of real outlets"
      >
        <defs>
          <clipPath id="wordmark-clip">
            <text
              x="720"
              y="330"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontWeight="900"
              fontSize="390"
              letterSpacing="-25"
            >
              ZORKO
            </text>
          </clipPath>
        </defs>
        <g clipPath="url(#wordmark-clip)">
          {photos.map((p, i) => (
            <image
              key={p.file}
              href={`/media/${p.file}`}
              x={(i % 16) * 90}
              y={Math.floor(i / 16) * 70}
              width="91"
              height="71"
              preserveAspectRatio="xMidYMid slice"
              style={{
                "--scatter-x": `${((i % 16) - 7.5) * 20}px`,
                "--scatter-y": `${(Math.floor(i / 16) - 2.5) * 40}px`,
                "--tile-delay": `${(i % 12) * 22}ms`,
              }}
            />
          ))}
        </g>
      </svg>
      <span>HUNDREDS OF INDIVIDUAL STORIES. ONE SHARED NAME.</span>
    </div>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-intro">
        <Label>THE ZORKO NETWORK</Label>
        <h2>
          Built on ambition.
          <br />
          <em>Powered by people.</em>
        </h2>
        <Button to="/careers/" light>
          Be part of what’s next
        </Button>
      </div>
      <Mosaic />
      <div className="wrap footer-grid">
        <div>
          <Link to="/" className="wordmark" aria-label="ZORKO corporate home">
            <img
              src="/media/zorko-original-logo.webp"
              alt="ZORKO — Brand of Food Lovers"
              width="593"
              height="226"
            />
          </Link>
          <p>
            From Surat.
            <br />
            With a nationwide vision.
          </p>
        </div>
        <nav aria-label="Company footer links">
          {nav.slice(0, 5).map(([n, p]) => (
            <Link key={p} to={p}>
              {n}
            </Link>
          ))}
        </nav>
        <nav aria-label="More footer links">
          {nav.slice(5).map(([n, p]) => (
            <Link key={p} to={p}>
              {n}
            </Link>
          ))}
        </nav>
        <div>
          <p className="label">FIND US IN SURAT</p>
          <p>{contact.address}</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href="https://zorko.in/" target="_blank" rel="noreferrer">
            Food & franchise website <Arrow />
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} ZORKO Limited</span>
        <span>CORPORATE EDITION · SURAT, INDIA</span>
        <Link to="/privacy/">Privacy & information</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-image">
          <Picture
            src={asset(49, 1)}
            alt="The ZORKO Limited reception at the Surat corporate headquarters"
            eager
            data-parallax
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>WELCOME TO ZORKO LIMITED</span>
          <span>
            OUR CORPORATE HOME <i>SURAT, INDIA</i>
          </span>
        </div>
        <div className="hero-heading">
          <h1>
            <span>One vision.</span>
            <span>
              Endless <em>possibilities.</em>
            </span>
          </h1>
          <div className="hero-bottom">
            <p>
              The people, places and purpose
              <br />
              behind a growing Indian food company.
            </p>
            <Link to="/about/" className="round-link">
              <span>
                Discover
                <br />
                our world
              </span>
              <Arrow />
            </Link>
            <a href="#introduction" className="scroll-link">
              SCROLL TO EXPLORE <span>↓</span>
            </a>
          </div>
        </div>
        <span className="hero-corner">01 / THE PLACE IT ALL CONNECTS</span>
      </section>
      <section className="intro wrap section" id="introduction">
        <div>
          <Label>THIS IS ZORKO</Label>
          <span className="section-index">01 — THE BIGGER PICTURE</span>
        </div>
        <div>
          <h2 data-reveal>
            More than a network.
            <br />A company of <em>possibilities.</em>
          </h2>
          <div className="intro-bottom">
            <p>
              From our home in Surat, we bring together the people, ideas and
              everyday work behind a nationwide food network. One shared
              ambition. Thousands of individual moments.
            </p>
            <Link className="text-link" to="/about/">
              Get to know us <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <section
        className="numbers wrap"
        aria-label="Network figures from the November 2026 Spotlight magazine"
      >
        {[
          ["550+", "Outlets"],
          ["275+", "Cities"],
          ["25+", "States"],
        ].map(([n, l]) => (
          <div key={l} data-reveal>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
        <p>
          Across India.
          <br />
          Connected by one vision.
          <small>AS REPORTED IN SPOTLIGHT · NOV 2026</small>
        </p>
      </section>
      <section className="office-preview section">
        <div className="wrap">
          <SectionTitle
            label="OUR CORPORATE HOME"
            title={
              <>
                Where ambition
                <br />
                <em>comes to work.</em>
              </>
            }
            link="Step inside"
            to="/office/"
          />
        </div>
        <Link to="/office/" className="office-window">
          <Picture
            src={asset(50, 0)}
            alt="Glass-partitioned workspaces and meeting cabins inside the ZORKO office"
            data-parallax
          />
          <span className="office-window-label">
            SURAT HEADQUARTERS{" "}
            <span>
              Explore the space <Arrow />
            </span>
          </span>
        </Link>
        <div className="wrap image-caption">
          <span>OPEN DOORS. SHARED IDEAS.</span>
          <p>A workplace built around the people moving us forward.</p>
        </div>
      </section>
      <section className="founder-preview section wrap" id="leadership">
        <SectionTitle
          label="TWO FOUNDERS. ONE SHARED BELIEF."
          title={
            <>
              Big journeys begin
              <br />
              <em>with a bold idea.</em>
            </>
          }
          link="Meet our founders"
          to="/founders/"
        />
        <Founders compact />
      </section>
      <section className="culture-preview">
        <Picture
          src="/media/mag-34-04.webp"
          alt="ZORKO colleagues celebrating together"
          data-parallax
        />
        <div className="culture-overlay" />
        <div className="wrap">
          <Label>LIFE AT ZORKO</Label>
          <h2>
            People first.
            <br />
            <em>Possibilities follow.</em>
          </h2>
          <Button to="/culture/" light>
            Life beyond the desk
          </Button>
        </div>
      </section>
      <section className="section wrap">
        <SectionTitle
          label="THE HOUSE OF ZORKO"
          title={
            <>
              Different expressions.
              <br />
              <em>A shared entrepreneurial spirit.</em>
            </>
          }
          link="Explore our brands"
          to="/brands/"
        />
        <div className="brand-index">
          {brands.map((b, i) => (
            <Link to="/brands/" key={b.name} data-reveal>
              <span>0{i + 1}</span>
              <h3>{b.name}</h3>
              <span>{b.kind}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="section home-journal">
        <div className="wrap">
          <SectionTitle
            label="THE WORKPLACE JOURNAL"
            title={
              <>
                The stories
                <br />
                <em>behind the progress.</em>
              </>
            }
            link="View the journal"
            to="/journal/"
          />
          <StoryCards
            entries={stories.filter((s) =>
              [
                "inside-our-headquarters",
                "workplace-values",
                "supporting-the-outlet-network",
              ].includes(s.id),
            )}
          />
        </div>
      </section>
    </>
  );
}
function PageHero({ eyebrow, title, text, image, alt }) {
  return (
    <section className={`page-hero ${image ? "with-image" : ""}`}>
      <div className="wrap page-hero-copy">
        <Label>{eyebrow}</Label>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {image && (
        <div className="page-hero-photo">
          <Picture src={image} alt={alt} eager data-parallax />
        </div>
      )}
    </section>
  );
}
function Founders({ compact = false }) {
  return (
    <div className={`founder-grid ${compact ? "compact" : ""}`}>
      {[
        {
          name: "Anand Nahar",
          role: "Chairman & Managing Director",
          page: 2,
          text: "An engineer and entrepreneur whose founding ambition brings together affordable vegetarian food and accessible entrepreneurship. Anand’s profile in the magazine traces ZORKO’s beginnings from a single outlet to a wider franchise network.",
        },
        {
          name: "Amrit Nahar",
          role: "Whole-Time & Executive Director",
          page: 3,
          text: "Amrit’s leadership profile focuses on structured growth, operational consistency and people. His work connects the company’s larger vision with the systems and teams supporting its outlet network.",
        },
      ].map((f, i) => (
        <article className="founder" key={f.name} data-reveal>
          <div className="founder-portrait">
            <Picture
              src={asset(f.page, 0)}
              alt={`${f.name}, ZORKO co-founder`}
            />
            <span>CO-FOUNDER / 0{i + 1}</span>
          </div>
          <div className="founder-info">
            <div>
              <h3>{f.name}</h3>
              <p>{f.role}</p>
            </div>
            {compact ? (
              <Link to="/founders/" aria-label={`Read about ${f.name}`}>
                <Arrow />
              </Link>
            ) : null}
          </div>
          {!compact && <p className="founder-bio">{f.text}</p>}
        </article>
      ))}
    </div>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="THE COMPANY"
        title={
          <>
            From a bold idea.
            <br />
            <em>To a shared ambition.</em>
          </>
        }
        text="Founded in Surat in 2020. Built around vegetarian food, entrepreneurship and the people who bring both to life."
        image={asset(50, 2)}
        alt="ZORKO colleagues at their workstations"
      />
      <section className="section wrap statement-grid">
        <Label>OUR REASON TO BUILD</Label>
        <div>
          <h2 data-reveal>
            Make quality food
            <br />
            <em>more accessible.</em>
          </h2>
          <p>
            ZORKO’s founding mission is to make quality vegetarian food
            affordable for every Indian. Behind that mission is a practical
            belief: a recognisable brand, consistent systems and people working
            together can help a good idea travel further.
          </p>
          <p>
            Our corporate headquarters brings that work together. From creative
            teams to outlet support, every department contributes to the
            company’s next chapter.
          </p>
        </div>
      </section>
      <section className="values section">
        <div className="wrap">
          <SectionTitle
            label="WHAT GUIDES US"
            title={
              <>
                A clear philosophy.
                <br />
                <em>In everyday practice.</em>
              </>
            }
          />
          <div className="values-grid">
            {[
              ["01", "Accessibility", "Food that welcomes more people."],
              [
                "02",
                "Vegetarian by choice",
                "A food identity rooted in vegetarian offerings.",
              ],
              [
                "03",
                "Consistency",
                "Shared standards behind a familiar experience.",
              ],
              [
                "04",
                "Partnership",
                "A network supported by people and practical systems.",
              ],
            ].map(([n, t, d]) => (
              <article key={n} data-reveal>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Timeline />
    </>
  );
}
function Timeline() {
  const [selected, setSelected] = useState(6);
  return (
    <section className="timeline section wrap">
      <SectionTitle
        label="OUR JOURNEY · 2020—2026"
        title={
          <>
            Small beginnings.
            <br />
            <em>Endless milestones.</em>
          </>
        }
      />
      <div
        className="timeline-years"
        role="tablist"
        aria-label="Company timeline"
      >
        {timeline.map((m, i) => (
          <button
            key={m.year}
            role="tab"
            aria-selected={selected === i}
            aria-controls="milestone-panel"
            id={`year-${m.year}`}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 6
                      : (selected + (e.key === "ArrowRight" ? 1 : -1) + 7) % 7;
                setSelected(next);
                document.getElementById(`year-${timeline[next].year}`)?.focus();
              }
            }}
            tabIndex={selected === i ? 0 : -1}
          >
            {m.year}
          </button>
        ))}
      </div>
      <article
        className="timeline-panel"
        id="milestone-panel"
        role="tabpanel"
        aria-labelledby={`year-${timeline[selected].year}`}
      >
        <span key={selected} className="timeline-number">
          {timeline[selected].year}
        </span>
        <div key={`copy-${selected}`}>
          <h3>{timeline[selected].label}</h3>
          <p>{timeline[selected].text}</p>
          <small>FROM THE ZORKO SPOTLIGHT MAGAZINE · NOVEMBER 2026</small>
        </div>
      </article>
    </section>
  );
}
function FoundersPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR FOUNDERS"
        title={
          <>
            Two perspectives.
            <br />
            <em>One direction.</em>
          </>
        }
        text="Meet the brothers behind ZORKO. A shared entrepreneurial ambition, brought to life through different strengths."
      />
      <section className="wrap section founders-full">
        <Founders />
      </section>
      <section className="founder-principle wrap section">
        <Label>THE FOUNDING IDEA</Label>
        <h2 data-reveal>
          Good food should be accessible.
          <br />
          <em>So should the opportunity to build.</em>
        </h2>
        <p>
          The principle behind ZORKO’s journey from Surat to a nationwide
          network.
        </p>
        <Button to="/about/">Explore the company story</Button>
      </section>
      <Timeline />
    </>
  );
}
const officeRooms = [
  {
    name: "Reception",
    src: asset(49, 1),
    text: "The first hello. A green reception desk, living details and the company’s name at the heart of the space.",
  },
  {
    name: "Connected workspaces",
    src: asset(50, 0),
    text: "Glass-partitioned cabins and shared working areas bring individual focus and everyday collaboration together.",
  },
  {
    name: "The working day",
    src: asset(50, 2),
    text: "A view into the daily work of the headquarters: teams, conversations and the ideas moving the company forward.",
  },
];
function OfficeTour() {
  return (
    <section
      className="office-scroll"
      aria-label="A visual journey through the Surat office"
    >
      <div className="office-sticky">
        <div className="tour-heading">
          <span>SURAT HEADQUARTERS</span>
          <span>SCROLL TO WALK THROUGH ↓</span>
        </div>
        <div className="office-track">
          {officeRooms.map((r, i) => (
            <article key={r.name}>
              <Picture src={r.src} alt={r.name + " at ZORKO Limited"} />
              <div className="tour-caption">
                <span>0{i + 1} / 03</span>
                <h2>{r.name}</h2>
                <p>{r.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="tour-progress">
          <i />
        </div>
      </div>
    </section>
  );
}
function Gallery({ images, label = "View photo" }) {
  const [active, setActive] = useState(-1);
  const returnRef = useRef(null),
    dialog = useRef(null);
  useEffect(() => {
    if (active < 0) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const handler = (e) => {
      if (e.key === "Escape") setActive(-1);
      if (e.key === "ArrowRight") setActive((x) => (x + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((x) => (x - 1 + images.length) % images.length);
      if (e.key === "Tab") {
        const els = dialog.current.querySelectorAll("button");
        if (
          e.shiftKey &&
          [els[0], dialog.current].includes(document.activeElement)
        ) {
          e.preventDefault();
          els[els.length - 1].focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === els[els.length - 1]
        ) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", handler);
      returnRef.current?.focus();
    };
  }, [active, images.length]);
  return (
    <>
      <div className="photo-gallery">
        {images.map((im, i) => (
          <button
            key={im.src}
            onClick={(e) => {
              returnRef.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`${label}: ${im.alt}`}
            data-reveal
          >
            <Picture src={im.src} alt={im.alt} />
            <span>
              <small>{im.caption || String(i + 1).padStart(2, "0")}</small>
              <Arrow />
            </span>
          </button>
        ))}
      </div>
      {active >= 0 && (
        <div
          ref={dialog}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt}
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(-1);
          }}
        >
          <button className="lightbox-close" onClick={() => setActive(-1)}>
            Close ×
          </button>
          <img src={images[active].src} alt={images[active].alt} />
          <div className="lightbox-bottom">
            <button
              aria-label="Previous photo"
              onClick={() =>
                setActive((x) => (x - 1 + images.length) % images.length)
              }
            >
              ←
            </button>
            <p>
              {images[active].alt}
              <small>
                {active + 1} / {images.length}
              </small>
            </p>
            <button
              aria-label="Next photo"
              onClick={() => setActive((x) => (x + 1) % images.length)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
function Office() {
  return (
    <>
      <PageHero
        eyebrow="OUR CORPORATE OFFICE"
        title={
          <>
            The place behind
            <br />
            <em>the possibilities.</em>
          </>
        }
        text="Step inside our Surat headquarters. The people, shared spaces and everyday work that connect the ZORKO network."
      />
      <OfficeTour />
      <section className="wrap section">
        <SectionTitle
          label="A CLOSER LOOK"
          title={
            <>
              Spaces for focus.
              <br />
              <em>Room for connection.</em>
            </>
          }
        />
        <Gallery
          images={pageImages(51)
            .slice(0, 16)
            .map((im, i) => ({
              src: `/media/${im.file}`,
              alt: `ZORKO corporate office interior ${i + 1}`,
              caption: "SURAT HEADQUARTERS",
            }))}
        />
      </section>
      <section className="visit-section wrap section">
        <div>
          <Label>COME SAY HELLO</Label>
          <h2>
            Find us
            <br />
            <em>in Surat.</em>
          </h2>
        </div>
        <div>
          <p>{contact.address}</p>
          <p>Visits by prior arrangement.</p>
          <Button to="/contact/">Plan your visit</Button>
        </div>
      </section>
      <WorkplaceJournal />
    </>
  );
}
function People() {
  return <PeoplePortal />;
}
function Culture() {
  const cultureImages = [
    ...pageImages(34),
    ...pageImages(35),
    ...pageImages(40),
    ...pageImages(41),
  ]
    .filter((x) => x.width > x.height * 1.1 && x.file !== "mag-34-05.webp")
    .slice(0, 14);
  return (
    <>
      <PageHero
        eyebrow="LIFE AT ZORKO"
        title={
          <>
            Beyond the work.
            <br />
            <em>Between the milestones.</em>
          </>
        }
        text="The celebrations, shared experiences and everyday relationships that give our workplace its character."
        image="/media/mag-34-05.webp"
        alt="ZORKO team celebration"
      />
      <section className="section wrap statement-grid">
        <Label>PEOPLE BEHIND THE PLATE</Label>
        <div>
          <h2>
            We work together.
            <br />
            <em>We grow together.</em>
          </h2>
          <p>
            A company is also the moments between meetings: learning together,
            recognising a colleague’s contribution and making time to celebrate.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <Gallery
          images={cultureImages.map((im, i) => ({
            src: `/media/${im.file}`,
            alt: `Team life and celebrations at ZORKO, photograph ${i + 1}`,
            caption: "LIFE AT ZORKO",
          }))}
        />
      </section>
      <section className="values section">
        <div className="wrap">
          <SectionTitle
            label="THE EMPLOYEE EXPERIENCE"
            title={
              <>
                A workplace is more
                <br />
                <em>than a place to work.</em>
              </>
            }
          />
          <div className="values-grid">
            {[
              [
                "01",
                "Learning together",
                "Training and shared knowledge across teams.",
              ],
              [
                "02",
                "Making memories",
                "Team celebrations, outings and shared occasions.",
              ],
              [
                "03",
                "Recognising effort",
                "Employee recognition and performance celebrations.",
              ],
              [
                "04",
                "Everyday support",
                "Workplace amenities and employee benefits described in the company magazine.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <p className="small-note">
            Specific benefits and eligibility are confirmed by the HR team
            during recruitment.
          </p>
          <div style={{ marginTop: 30 }}>
            <Button to="/careers/#career-benefits">
              Explore employee perks & benefits
            </Button>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <SectionTitle
          label="RECOGNISING OUR PEOPLE"
          title={
            <>
              Good work
              <br />
              <em>deserves a moment.</em>
            </>
          }
        />
        <Gallery
          images={[...pageImages(38), ...pageImages(39)]
            .slice(0, 8)
            .map((im, i) => ({
              src: `/media/${im.file}`,
              alt: `ZORKO employee recognition occasion ${i + 1}`,
              caption: "PERFORMANCE & RECOGNITION",
            }))}
        />
      </section>
      <WorkplaceJournal culture />
    </>
  );
}
function Brands() {
  const [selected, setSelected] = useState(0),
    b = brands[selected];
  return (
    <>
      <PageHero
        eyebrow="THE HOUSE OF ZORKO"
        title={
          <>
            Many expressions.
            <br />
            <em>One entrepreneurial spirit.</em>
          </>
        }
        text="Food brands and business ideas developed with a shared appetite for possibility."
      />
      <section className="brand-explorer wrap section">
        <div
          className="brand-tabs"
          role="tablist"
          aria-label="Explore group brands"
        >
          {brands.map((x, i) => (
            <button
              key={x.name}
              role="tab"
              aria-selected={i === selected}
              id={`brand-${i}`}
              aria-controls="brand-panel"
              tabIndex={selected === i ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(
                    e.key,
                  )
                ) {
                  e.preventDefault();
                  const next =
                    (selected +
                      (["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : -1) +
                      brands.length) %
                    brands.length;
                  setSelected(next);
                  document.getElementById(`brand-${next}`)?.focus();
                }
              }}
            >
              <span>0{i + 1}</span>
              {x.name}
              <Arrow />
            </button>
          ))}
        </div>
        <article
          id="brand-panel"
          role="tabpanel"
          aria-labelledby={`brand-${selected}`}
          className="brand-panel"
        >
          <Picture
            key={b.name}
            src={b.image}
            alt={`${b.name} brand and outlet imagery from the ZORKO magazine`}
          />
          <div>
            <Label>{b.kind}</Label>
            <h2>{b.tag}</h2>
            <p>{b.text}</p>
            {b.url ? (
              <a
                className="text-link"
                href={b.url}
                target="_blank"
                rel="noreferrer"
              >
                Visit the brand website <Arrow />
              </a>
            ) : (
              <Link to="/contact/" className="text-link">
                Talk to the company <Arrow />
              </Link>
            )}
          </div>
        </article>
      </section>
      <section className="wrap section statement-grid">
        <Label>FROM IDEAS TO IDENTITIES</Label>
        <div>
          <h2>
            A broader world
            <br />
            <em>of food business.</em>
          </h2>
          <p>
            The magazine also introduces Chaat Ka Baap and a wider collection of
            concepts developed through ZORKO’s consultancy work. For current
            brand information and enquiries, connect with the corporate team.
          </p>
          <Button to="/contact/">Start a conversation</Button>
        </div>
      </section>
    </>
  );
}
function Recognition() {
  const items = [...pageImages(15), ...pageImages(20), ...pageImages(21)]
    .filter((x) => x.width > 200)
    .slice(0, 18);
  return (
    <>
      <PageHero
        eyebrow="ACHIEVEMENTS & MEDIA"
        title={
          <>
            Moments that matter.
            <br />
            <em>A story that travels.</em>
          </>
        }
        text="National television, public recognition and company milestones, documented in ZORKO’s Spotlight magazine."
      />
      <section className="wrap section recognition-lead">
        <div>
          <Picture
            src={asset(14, 0)}
            alt="ZORKO founders at Shark Tank India"
          />
          <span>SHARK TANK INDIA · SEASON 3</span>
        </div>
        <article>
          <Label>A NATIONAL STAGE</Label>
          <h2>
            A Surat story.
            <br />
            <em>A wider audience.</em>
          </h2>
          <p>
            The founders brought ZORKO’s story of vegetarian food and
            entrepreneurship to Shark Tank India Season 3.
          </p>
          <Link className="text-link" to="/journal/a-national-stage/">
            Read the story <Arrow />
          </Link>
        </article>
      </section>
      <section className="section press-band">
        <div className="wrap">
          <Label>FEATURED IN THE MAGAZINE’S MEDIA COVERAGE</Label>
          <div>
            <span>Forbes</span>
            <span>Shark Tank India</span>
            <span>TEDx</span>
            <span>Josh Talks</span>
            <span>The Economic Times</span>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <SectionTitle
          label="RECOGNITION & IMPORTANT OCCASIONS"
          title={
            <>
              A growing collection
              <br />
              <em>of meaningful moments.</em>
            </>
          }
        />
        <Gallery
          images={items.map((im, i) => ({
            src: `/media/${im.file}`,
            alt: `Company recognition photograph ${i + 1} from ZORKO Spotlight`,
            caption: "RECOGNITION & MILESTONES",
          }))}
        />
      </section>
      <section className="wrap section partnership">
        <Label>NEW CONNECTIONS</Label>
        <h2>
          Building the
          <br />
          <em>next chapter.</em>
        </h2>
        <p>
          The November 2026 magazine reports agreements with Hindustan Petroleum
          and IndianOil concerning outlet opportunities at fuel pump premises.
          For current partnership details, contact the corporate team.
        </p>
        <div className="partnership-images">
          {[6, 7].map((n) => (
            <Picture
              key={n}
              src={asset(n, 0)}
              alt={`${n === 6 ? "Hindustan Petroleum" : "IndianOil"} partnership occasion pictured in ZORKO Spotlight`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
function StoryCards({ entries }) {
  return (
    <div className="story-cards">
      {entries.map((s) => (
        <Link
          to={`/journal/${s.id}/`}
          className="story-card"
          key={s.id}
          data-reveal
        >
          <div>
            <Picture src={s.image} alt={s.title} />
            <span className="story-arrow">
              <Arrow />
            </span>
          </div>
          <small>
            {s.category} <span>{s.kicker || "SPOTLIGHT / NOVEMBER 2026"}</span>
          </small>
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
        </Link>
      ))}
    </div>
  );
}
function WorkplaceJournal({ culture = false }) {
  return (
    <section className="section workplace-journal">
      <div className="wrap">
        <SectionTitle
          label="READ MORE ABOUT LIFE HERE"
          title={
            <>
              Inside the office.
              <br />
              <em>Behind the everyday.</em>
            </>
          }
          link="Explore journal & blogs"
          to="/journal/"
        />
        <StoryCards
          entries={stories.filter((s) =>
            (culture
              ? [
                  "life-beyond-the-desk",
                  "workplace-values",
                  "supporting-the-outlet-network",
                ]
              : [
                  "inside-our-headquarters",
                  "workplace-values",
                  "supporting-the-outlet-network",
                ]
            ).includes(s.id),
          )}
        />
      </div>
    </section>
  );
}
function Journal({ slug }) {
  const [filter, setFilter] = useState("All stories");
  const [search, setSearch] = useState("");
  const s = stories.find((x) => x.id === slug);
  const matching = stories.filter(
    (story) =>
      (filter === "All stories" || story.category === filter) &&
      `${story.title} ${story.summary} ${story.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const featured = stories.find(
    (story) => story.id === "inside-our-headquarters",
  );
  const showFeatured = filter === "All stories" && !search.trim();
  if (slug && !s) return <NotFound />;
  if (s)
    return (
      <>
        <PageHero
          eyebrow={`${s.category} · ${s.kicker || "SPOTLIGHT / NOVEMBER 2026"}`}
          title={s.title}
          text={s.summary}
          image={s.articleImage || s.image}
          alt={s.title}
        />
        <article className="article-body wrap section">
          <Link to="/journal/" className="text-link">
            ← All stories
          </Link>
          <div className="article-meta">
            <span>{s.category}</span>
            <span>
              {Math.max(
                1,
                Math.ceil(
                  [s.body, ...(s.sections || []).map((section) => section.text)]
                    .join(" ")
                    .split(/\s+/).length / 180,
                ),
              )}{" "}
              MIN READ
            </span>
            <span>{s.kicker || "ZORKO SPOTLIGHT"}</span>
          </div>
          <p className="article-lead">{s.body}</p>
          {s.sections?.length > 0 && (
            <>
              <nav className="article-contents" aria-label="In this story">
                <span>IN THIS STORY</span>
                {s.sections.map((section, i) => (
                  <a key={section.title} href={`#article-section-${i}`}>
                    {section.title} <span aria-hidden="true">↓</span>
                  </a>
                ))}
              </nav>
              {s.sections.map((section, i) => (
                <section
                  className="article-section"
                  id={`article-section-${i}`}
                  key={section.title}
                >
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </section>
              ))}
            </>
          )}
          <div className="article-source">
            {s.source ? (
              <>
                <span>FROM THE OFFICIAL ZORKO WEBSITE</span>
                <p>Editorial adaptation for this corporate journal.</p>
                <a href={s.source.url} target="_blank" rel="noreferrer">
                  Read the source: {s.source.label} <Arrow />
                </a>
              </>
            ) : (
              <>
                <span>FROM ZORKO SPOTLIGHT</span>
                <p>
                  Based on the company’s November 2026 magazine, with original
                  office and team photography.
                </p>
              </>
            )}
          </div>
          <Button
            to={
              s.related ||
              (s.category === "Workplace"
                ? "/office/"
                : s.category === "People"
                  ? "/people/"
                  : s.category === "Culture"
                    ? "/culture/"
                    : s.category === "Company"
                      ? "/about/"
                      : "/recognition/")
            }
          >
            {s.relatedLabel || "Explore more"}
          </Button>
        </article>
        <section className="wrap section journal-related">
          <SectionTitle
            label="KEEP EXPLORING"
            title={
              <>
                More from
                <br />
                <em>inside ZORKO.</em>
              </>
            }
            link="All journal stories"
            to="/journal/"
          />
          <StoryCards
            entries={stories
              .filter((story) => story.id !== s.id)
              .sort(
                (a, b) =>
                  Number(b.category === s.category) -
                  Number(a.category === s.category),
              )
              .slice(0, 3)}
          />
        </section>
      </>
    );
  return (
    <>
      <PageHero
        eyebrow="JOURNAL & BLOGS"
        title={
          <>
            Inside the company.
            <br />
            <em>Beyond the headlines.</em>
          </>
        }
        text="Office life, company culture and the people behind the brand. Stories drawn from ZORKO’s official website and Spotlight magazine."
      />
      <section className="wrap section journal-index" id="journal-stories">
        {showFeatured && (
          <Link
            to={`/journal/${featured.id}/`}
            className="journal-feature"
            data-reveal
          >
            <Picture
              src={featured.image}
              alt="Inside the ZORKO Surat corporate office"
            />
            <div>
              <Label>START WITH THE WORKPLACE</Label>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
              <span className="text-link">
                Step inside the story <Arrow />
              </span>
            </div>
          </Link>
        )}
        <div className="journal-search">
          <label htmlFor="journal-search">Find a story</label>
          <input
            type="search"
            id="journal-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search office, culture, teams…"
          />
        </div>
        <div className="filter-row" aria-label="Filter stories">
          {[
            "All stories",
            "Workplace",
            "Culture",
            "People",
            "Company",
            "Recognition",
          ].map((x) => (
            <button
              key={x}
              aria-pressed={filter === x}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
        <p className="journal-results" role="status">
          {matching.length} {matching.length === 1 ? "story" : "stories"} to
          explore
        </p>
        <StoryCards
          entries={matching.filter(
            (story) => !showFeatured || story.id !== featured.id,
          )}
        />
        {!matching.length && (
          <div className="journal-empty">
            <h2>Try another story.</h2>
            <p>Search a different word or explore all categories.</p>
            <button
              className="text-link"
              onClick={() => {
                setSearch("");
                setFilter("All stories");
              }}
            >
              Show all stories <Arrow />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
function Careers() {
  return <CareersPortal />;
}
function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT ZORKO LIMITED"
        title={
          <>
            Good conversations.
            <br />
            <em>New possibilities.</em>
          </>
        }
        text="Corporate enquiries, careers or a visit to the headquarters. Start with a hello."
      />
      <section className="section wrap contact-grid">
        <div className="contact-address">
          <Label>SURAT HEADQUARTERS</Label>
          <h2>
            Our home.
            <br />
            <em>Your starting point.</em>
          </h2>
          <address>{contact.address}</address>
          <a href={`mailto:${contact.email}`} className="contact-email">
            {contact.email}
            <Arrow />
          </a>
          <a href="tel:+919909900139">{contact.phone}</a>
          <p>Visits by prior arrangement.</p>
          <a
            className="text-link"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ZORKO Limited Exult Shoppers Vesu Surat")}`}
            target="_blank"
            rel="noreferrer"
          >
            Open directions <Arrow />
          </a>
        </div>
        <Picture
          src="/media/office-detail-3.webp"
          alt="A different view inside the ZORKO Surat office"
        />
      </section>
      <section className="wrap contact-options">
        <Link to="/careers/">
          <small>CAREER ENQUIRIES</small>
          <h3>Join the team.</h3>
          <Arrow />
        </Link>
        <a href="https://zorko.in/" target="_blank" rel="noreferrer">
          <small>FOOD & FRANCHISE ENQUIRIES</small>
          <h3>Explore the food brand.</h3>
          <Arrow />
        </a>
        <a href={`mailto:${contact.email}?subject=Corporate%20enquiry`}>
          <small>EVERYTHING ELSE</small>
          <h3>Talk to the company.</h3>
          <Arrow />
        </a>
      </section>
    </>
  );
}
function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="SITE INFORMATION"
        title={
          <>
            Privacy.
            <br />
            <em>Clear and simple.</em>
          </>
        }
      />
      <section className="wrap section article-body">
        <h2>Your information</h2>
        <p>
          This corporate preview has no account registration, analytics,
          advertising cookies or application database. Selecting a career
          enquiry opens a draft in your own email application; this site does
          not submit or store it.
        </p>
        <h2>External websites</h2>
        <p>
          Links to brand websites, email applications and map services open
          services with their own privacy practices. Information you send by
          email is handled by the receiving company.
        </p>
        <h2>Content and enquiries</h2>
        <p>
          Company imagery and editorial information are drawn from the supplied
          ZORKO Spotlight November 2026 magazine. Network figures and employment
          information should be confirmed with the company for current
          decisions.
        </p>
        <a href={`mailto:${contact.email}`}>Contact {contact.email}</a>
      </section>
    </>
  );
}
function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="PAGE NOT FOUND"
        title={
          <>
            A different turn.
            <br />
            <em>Back to our world.</em>
          </>
        }
      />
      <div className="wrap section">
        <Button to="/">Return home</Button>
      </div>
    </>
  );
}
const titles = {
  "/": "ZORKO Limited — Built on ambition. Powered by people.",
  "/about/": "The Company",
  "/founders/": "Our Founders",
  "/office/": "Our Corporate Office",
  "/people/": "Our People",
  "/culture/": "Life at ZORKO",
  "/brands/": "Our Brands",
  "/recognition/": "Achievements & Media",
  "/journal/": "The Journal",
  "/careers/": "Careers",
  "/contact/": "Contact",
  "/privacy/": "Privacy & Information",
};
export default function App({ initialRoute }) {
  const [route, setRoute] = useState(
    initialRoute ||
      (location.pathname.endsWith("/")
        ? location.pathname
        : location.pathname + "/"),
  );
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    if (
      route === "/" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      setIntro(true);
  }, []);
  useMotion(route);
  useEffect(() => {
    if (!intro) return;
    const timer = setTimeout(() => setIntro(false), 1350);
    return () => clearTimeout(timer);
  }, [intro]);
  useEffect(() => {
    const onPop = () => {
      setRoute(location.pathname);
      window.scrollTo(0, 0);
    };
    const onClick = (e) => {
      const a = e.target.closest("a");
      if (
        !a ||
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0 ||
        a.target === "_blank" ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, location.href);
      if (
        url.origin !== location.origin ||
        (url.protocol !== "http:" && url.protocol !== "https:")
      )
        return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      history.pushState({}, "", url.pathname + url.search + url.hash);
      setRoute(url.pathname.endsWith("/") ? url.pathname : url.pathname + "/");
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        if (url.hash)
          document
            .getElementById(decodeURIComponent(url.hash.slice(1)))
            ?.scrollIntoView();
        else document.querySelector("main")?.focus({ preventScroll: true });
      }, 40);
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);
  useEffect(() => {
    document.title =
      (titles[route] ||
        (route.startsWith("/journal/")
          ? stories.find((s) => route.includes(s.id))?.title
          : "Page not found")) + (route === "/" ? "" : " — ZORKO Limited");
  }, [route]);
  let content;
  switch (route) {
    case "/":
      content = <Home />;
      break;
    case "/about/":
      content = <About />;
      break;
    case "/founders/":
      content = <FoundersPage />;
      break;
    case "/office/":
      content = <Office />;
      break;
    case "/people/":
      content = <People />;
      break;
    case "/culture/":
      content = <Culture />;
      break;
    case "/brands/":
      content = <Brands />;
      break;
    case "/recognition/":
      content = <Recognition />;
      break;
    case "/journal/":
      content = <Journal />;
      break;
    case "/careers/":
      content = <Careers />;
      break;
    case "/contact/":
      content = <Contact />;
      break;
    case "/privacy/":
      content = <Privacy />;
      break;
    default:
      content = route.startsWith("/journal/") ? (
        <Journal slug={route.split("/")[2]} />
      ) : (
        <NotFound />
      );
  }
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div id="top" />
      <Header route={route} />
      <main key={route} id="main-content" tabIndex={-1}>
        {content}
      </main>
      <Footer />
      {intro && (
        <div className="brand-intro" aria-hidden="true">
          <img
            src="/media/zorko-original-logo.webp"
            alt=""
            width="593"
            height="226"
          />
          <small>ONE VISION. ENDLESS POSSIBILITIES.</small>
        </div>
      )}
    </>
  );
}
