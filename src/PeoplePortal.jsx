import React, { useState } from "react";
import { departmentNames } from "./data.js";
import { management, leadershipTeams, teamFocus, teamAliases } from "./people-data.js";
import sitePhotos from "./site-photos.json";
import "./people.css";

const Arrow = () => <span aria-hidden="true">↗</span>;
const Label = ({ children }) => (
  <p className="label">
    <span />
    {children}
  </p>
);
export default function PeoplePortal() {
  const [filter, setFilter] = useState("All teams"),
    [search, setSearch] = useState("");
  const teams = departmentNames
    .filter(([, group]) => group !== "Leadership")
    .map(([name, group, text]) => ({
      name,
      group,
      text,
      photo:
        sitePhotos[name] || (name === "Warehouse" ? "team-47-4.webp" : null),
    }));
  const visible = teams.filter(
    (t) =>
      (filter === "All teams" || t.group === filter) &&
      `${t.name} ${t.group} ${teamAliases[t.name] || ''}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <>
      <section className="people-hero wrap">
        <div>
          <Label>THE PEOPLE BEHIND ZORKO</Label>
          <h1>
            Different strengths.
            <br />
            <em>One company.</em>
          </h1>
          <p>
            Meet our management, leadership groups and the departments that
            bring the company’s work together.
          </p>
        </div>
        <nav aria-label="People page sections">
          <span>EXPLORE OUR PEOPLE</span>
          {[
            ["01", "Management", "#management"],
            ["02", "KMP Heads", "#kmp-heads"],
            ["03", "SMP Heads", "#smp-heads"],
            ["04", "Departments", "#departments"],
          ].map(([n, name, href]) => (
            <a key={href} href={href}>
              <small>{n}</small>
              {name}
              <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
      </section>
      <section className="section wrap people-management" id="management">
        <div className="section-title" data-reveal>
          <div>
            <Label>LEADERSHIP</Label>
            <h2>
              Meet the
              <br />
              <em>management.</em>
            </h2>
          </div>
          <p>
            The individuals listed on ZORKO’s
            <br />
            official team page.
          </p>
        </div>
        <div className="management-grid">
          {management.map((leader, i) => (
            <article key={leader.name} data-reveal>
              <div className="management-portrait">
                <img
                  src={`/media/${leader.photo}`}
                  alt={`${leader.name}, ${leader.role}`}
                  width="756"
                  height="1008"
                  loading="lazy"
                  data-team-photo
                />
                <span>0{i + 1}</span>
              </div>
              <h3>{leader.name}</h3>
              <p>{leader.role}</p>
            </article>
          ))}
        </div>
        <a href="/founders/" className="text-link management-founder-link">
          Read about the founders <Arrow />
        </a>
      </section>
      <section className="people-leadership-groups">
        <div className="wrap">
          {leadershipTeams.map((team, i) => (
            <article
              key={team.id}
              id={team.id}
              className={`leadership-team leadership-team-${i}`}
            >
              <div className="leadership-team-photo" data-reveal>
                <img
                  src={`/media/${team.photo}`}
                  alt={`${team.title} at the ZORKO Surat headquarters`}
                  width="1000"
                  height="750"
                  loading="lazy"
                  data-team-photo
                />
              </div>
              <div className="leadership-team-copy" data-reveal>
                <Label>{team.label}</Label>
                <h2>{team.title}</h2>
                <p>{team.text}</p>
                <div className="team-focus">
                  {team.focus.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <a href="#departments" className="text-link">
                  Explore the departments <span aria-hidden="true">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section wrap people-directory" id="departments">
        <div className="section-title" data-reveal>
          <div>
            <Label>MEET THE DEPARTMENTS</Label>
            <h2>
              The teams behind
              <br />
              <em>the everyday.</em>
            </h2>
          </div>
          <a href="/careers/#career-teams" className="text-link">
            Find your team <Arrow />
          </a>
        </div>
        <div className="people-directory-toolbar">
          <div className="people-search">
            <label htmlFor="people-search">Find a department</label>
            <input
              id="people-search"
              type="search"
              placeholder="Search sales, HR, technology…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-row" aria-label="Filter departments">
            {["All teams", "Growth", "Operations", "People", "Creative"].map(
              (x) => (
                <button
                  key={x}
                  aria-pressed={filter === x}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ),
            )}
          </div>
        </div>
        <p className="people-results" role="status">
          {visible.length} {visible.length === 1 ? "department" : "departments"}
        </p>
        <div className="people-directory-grid">
          {visible.map((team) => (
            <article key={team.name} data-reveal>
              <div className="people-department-photo">
                <img
                  src={`/media/${team.photo}`}
                  alt={`${team.name} team at ZORKO`}
                  loading="lazy"
                  width="1000"
                  height="750"
                  data-team-photo
                />
              </div>
              <div className="people-department-caption">
                <small>{team.group}</small>
                <h3>{team.name}</h3>
                <p>{team.text}</p>
                <div className="team-focus">
                  {(teamFocus[team.name] || []).map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="people-empty">
            <h3>Find your people.</h3>
            <p>Try another search or explore every department.</p>
            <button
              className="text-link"
              onClick={() => {
                setSearch("");
                setFilter("All teams");
              }}
            >
              Show all departments <Arrow />
            </button>
          </div>
        )}
      </section>
      <section className="people-next-chapter">
        <div className="wrap">
          <Label>THERE’S ROOM FOR YOUR PERSPECTIVE</Label>
          <h2>
            Bring your strengths.
            <br />
            <em>Build with us.</em>
          </h2>
          <div>
            <a className="button" href="/careers/">
              Explore careers <Arrow />
            </a>
            <a className="text-link" href="/culture/">
              Discover our culture <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
