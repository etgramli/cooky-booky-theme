let diceclasses = Array('bi-dice-1', 'bi-dice-2', 'bi-dice-3', 'bi-dice-4', 'bi-dice-5', 'bi-dice-6');
let diceclass = diceclasses[Math.floor(Math.random()*diceclasses.length)];
document.getElementById("randomRecipeButtonIcon").classList.add(diceclass);
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
    recipeIndex = (recipeIndex + 1) % (links.length - 1);
}
document.getElementById("randomRecipeButton").onclick = function () {location.href = links[recipeIndex];};
