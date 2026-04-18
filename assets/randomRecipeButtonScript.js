const diceVariants = ['dice-1', 'dice-2', 'dice-3', 'dice-4', 'dice-5', 'dice-6'];
const diceIndex = Math.floor(Math.random() * (diceVariants.length * 2)) % diceVariants.length;
const diceVariant = diceVariants[diceIndex];
const randomRecipeButtonIconUse = document.querySelector('#randomRecipeButtonIcon use');
if (randomRecipeButtonIconUse) {
    randomRecipeButtonIconUse.setAttribute('href', `#${diceVariant}`);
}
{{ $recipes := shuffle (where .Site.RegularPages "Type" "recipe") }}
{{ if gt (len $recipes) 0 }}
let links = [
{{- range $recipes -}}
'{{- .RelPermalink -}}',
{{- end -}}
""];
{{ else }}
let links = ["404.html"];
{{- end -}}
var recipeIndex = links.indexOf('/recipe/' + window.location.pathname.split('/').at(-2) + '/');
if (recipeIndex === -1) {
    recipeIndex = Math.floor(Math.random() * (links.length - 1));
} else {
    recipeIndex = (recipeIndex + 1) % links.length;
}
document.getElementById("randomRecipeButton").onclick = function () {location.href = links[recipeIndex];};
