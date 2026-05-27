'use client';

export default function CityHero({ city, description, tagline }) {
  return (
    <section className="city-hero">
      <div className="hero-content">
        <h1>{city}</h1>
        {tagline && <p className="tagline">{tagline}</p>}
        {description && <p className="description">{description}</p>}
      </div>
    </section>
  );
}
