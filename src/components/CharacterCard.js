import { useState } from "react";

function Section({ title, children }) {
  return (
    <div className="section">
      <span className="sectionTitle">{title}</span>
      <div className="sectionContent">{children}</div>
    </div>
  );
}

function List({ title, children, id }) {
  return (
    <Section title={title}>
      <ul className="list">
        {children.map((item, index) => (
          <li key={`${id}_${index}`}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}

function DropdownInfo({ title, onClick, isActive, children }) {
  return (
    <div className="dropdownContainer">
      <button
        className={isActive ? "dropdownButton active" : "dropdownButton"}
        onClick={onClick}
      >
        {title}
        <p className={isActive ? "arrow up" : "arrow down"} />
      </button>
      {isActive && children}
    </div>
  );
}

function Favorite({ isFavorite, onClick }) {
  return (
    <div className="favoriteContainer">
      <button className="favorite" onClick={onClick}>
        {isFavorite ? "★" : "☆"}
      </button>
    </div>
  );
}

function Scale({ title, value }) {
  return (
    <Section title={title}>
      <div className="scaleContainer">
        <div className="scale" style={{ width: value + "%" }}>
          {value}
        </div>
      </div>
    </Section>
  );
}

export function CharacterCard({
  id,
  name,
  imgUrl,
  biography,
  powerstats,
  appearance,
  occupation,
  relatives,
  addFavorite,
  removeFavorite,
  isFavorite
}) {
  const [showAppearance, setShowAppearance] = useState(false);
  const [showPowerstats, setShowPowerstats] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  function toggleFavorite() {
    if (!isFavorite) {
      addFavorite();
    } else {
      removeFavorite();
    }
  }

  function toArray(string) {
    const reg = /,(?![^()]*\))\s*/;
    return string.split(reg);
  }

  function toTitle(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }
  return (
    <div className={"characterCard " + biography.alignment}>
      <Favorite isFavorite={isFavorite} onClick={toggleFavorite} />
      <h1 className="characterTitle">{name}</h1>
      <img src={imgUrl} alt={name} className="characterImage" />
      <Section title="Full name">{biography["full-name"]}</Section>
      <Section title="Publisher">{biography.publisher}</Section>
      <DropdownInfo
        title="More info"
        isActive={showMoreInfo}
        onClick={() => setShowMoreInfo(!showMoreInfo)}
      >
        {biography.aliases !== "-" && (
          <List title="Aliases" id={id}>
            {biography.aliases}
          </List>
        )}
        <Section title="Place of Birth">{biography["place-of-birth"]}</Section>
        <Section title="Alignment">{biography.alignment}</Section>
        <DropdownInfo
          title="Appearance"
          isActive={showAppearance}
          onClick={() => setShowAppearance(!showAppearance)}
        >
          <Section title="Gender">{appearance.gender}</Section>
          <Section title="Race">{appearance.race}</Section>
          {appearance.height[0] !== "-" && (
            <Section title="Height">
              {appearance.height[0] + " " + appearance.height[1]}
            </Section>
          )}
          {appearance.height[0] !== "-" && (
            <Section title="Weight">
              {appearance.weight[0] + " " + appearance.weight[1]}
            </Section>
          )}
          <Section title="Hair color">{appearance["hair-color"]}</Section>
          <Section title="Eye color">{appearance["eye-color"]}</Section>
        </DropdownInfo>

        <DropdownInfo
          title="Powerstats"
          isActive={showPowerstats}
          onClick={() => setShowPowerstats(!showPowerstats)}
        >
          {Object.entries(powerstats).map(
            (item, index) =>
              item[1] !== "null" && (
                <Scale
                  key={`${id}_${index}`}
                  title={toTitle(item[0])}
                  value={item[1]}
                />
              )
          )}
        </DropdownInfo>
        {occupation !== "-" && (
          <List title="Occupation" id={id}>
            {toArray(occupation)}
          </List>
        )}
        {relatives !== "-" && (
          <List title="Relatives" id={id}>
            {toArray(relatives)}
          </List>
        )}
      </DropdownInfo>
    </div>
  );
}
