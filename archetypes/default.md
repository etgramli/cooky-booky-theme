---
title: "Test Recipe"
id: test-recipe
publishDate: {{ time.Now }}
changedDate: {{ time.Now }}
author: "Author A"
category: "Salads"
url: "recipe/test-recipe"
_build:
  publishResources: false
type: "recipe"
bigImageName: "TestRecipe_0"
preparationTime: "xx Min"
bakingTemperature: "220"
bakingTime: "xx Min"
keywords:
- Test
- Recipe
---
{{% zutaten %}}
## Zutaten
| Menge | Einheit | Zutat                     |
|------:|:--------|:--------------------------|
| 60    | g       | Goldleinsamenmehl         |
| 30    | g       | Kokosmehl                 |
| 10    | g       | Flosamenschalen, gemahlen |
| ½     | TL      | Salz                      |
| 180   | ml      | Wasser, 80°C              |
| 1     | g       | Xanthan (optional)        |
{{% /zutaten %}}

{{% zubereitung %}}
## Zubereitung
1. First step.
2. Second step.
3. Third step.
{{% /zubereitung %}}

{{% bemerkung %}}
## Bemerkung
First hint line.

Second line.

Third one.
{{% /bemerkung %}}
