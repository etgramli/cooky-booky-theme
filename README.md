# Coooky-Booky

Theme for my personal recipe website. It is responsive and minimal and includes special features for a recipe collection (i.e. random recipe button, search by title). This theme uses two free fonts from Google Fonts: Amatic SC for headlines and Source Sans Pro for the rest.

## Features

- Responsive
- Minimal
- Random recipe button
- Share button (incl. OpenGraph tags)
- Search with Fuse.js
- Minimal PWA
  - Icons in different sizes
  - Precaches texts, styles, fonts, but not the images

## Installation

- Git Submodule, or
- Download and unzip

- Set the theme in the config

## Design

### Farbschema

| Objekt        | Light mode                                      | Dark mode                                           |
|---------------|-------------------------------------------------|-----------------------------------------------------|
| Text          | $${\color{black}{Schwarz}}$$ (black)            | $${\color{#D0D0D0}{Hellgrau}}$$ (#D0D0D0)           |
| Hintergrund   | $${\color{black}{Weiss}}$$ (white)              | $${\color{#161616}{Antrazit}}$$ (#161616)           |
| Link          | $${\color{green}{Mittelgrün}}$$ (green)         | $${\color{#81BD81}{Blasses Grün}}$$ (#81BD81)       |
| Gefolger Link | $${\color{darkgreen}{Dunkelgrün}}$$ (darkgreen) | $${\color{#6A946A}{Blasses Dunkelgrün}}$$ (#6A946A) |
| Navbar        | $${\color{lightgray}{Hellgrau}}$$ (lightgray)   | $${\color{#808080}{Dunkelgrau}}$$ (#808080)         |
| Zutaten       | $${\color{darkblue}{Dunkelblau}}$$ (darkblue)   | $${\color{lightblue}{Hellblau}}$$ (lightblue)       |
| Bemerkung     | $${\color{darkred}{Dunkelrot}}$$ (darkred)      | $${\color{lightcoral}{Hellrot}}$$ (lightcoral)      |
| Buttons       | $${\color{#42b983}{Hellgrün}}$$ (#42b983)       | $${\color{#42b983}{Hellgrün}}$$ (#42b983)           |

### Bild-Varianten

Es werden verschiedene Bild-Varianten (im Webp-Format) generiert, die sich an folgenden Szenarien orientieren:

| Auflösung | Anwendungszweck                                        |
|-----------|--------------------------------------------------------|
| 1280x720  | Viewport-Breite ab 1280 Pixeln Breite (Laptop/Desktop) |
| 600x315   | OpenGraph-Vorschau                                     |
| 768x432   | Viewport-Breite ab 768 Pixeln (inkl.)                  |
| 430x242   | Viewport-Breite unter 768 Pixeln + Fallback            |

### Abstände

| Bezeichnung                | Abstand |
|----------------------------|---------|
| Zwischen Menge und Einheit | 0.125em |
| Zwischen Einheit und Zutat | 1em     |

## Nice to know

### Zufälliges Rezept

Der Zufalls-Button funktioniert analog wie ein gemischtes Kartendeck, von dem man eine neue Karte zieht und sie unters Deck legt. Das bedeutet, dass es eine zufällige Reihenfolge der Rezepte gibt, sodass bei wiederholtem Drücken nicht das selbe Rezept mehrfach erscheint - beim Münzwurf könnte das passieren. Wenn man wieder beim ersten Rezept angekommen ist wird man feststellen, dass sich die (zufällige) Abfolge der Rezepte wiederholt. Drückt man von einer Nicht-Rezept-Seite (Startseite, Kategorie, ...) auf den Zufalls-Button, steigt man an einer zufälligen Position in der Abfolge ein.

### Wieso eine sticky Navbar?

Weil bei ```fixed-top``` nach dem Hoch-Scrollen die Navbar immer über dem Inhalt liegt (z.B. Listen-Titel nicht lesbar).

### PWA- Hinweise

- Icons im ```static```-Verzeichnis des Themes müssen bei Änderung neu generiert werden
