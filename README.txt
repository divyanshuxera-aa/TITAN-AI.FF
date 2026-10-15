TITAN QUICK INTRO — minimal and fast

This is a short, single-screen intro. It animates once quickly and then waits on the ENTER button. Tapping ENTER immediately fades it out so your EXISTING website underneath becomes visible.

Install in your existing GitHub Pages project:
1. Add `titan-quick-intro.css` and `titan-quick-intro.js` to the same folder as your current index.html.
2. Copy the overlay block from `add-to-existing-index.html` into your current index.html just before </body>.
3. Add `<link rel="stylesheet" href="titan-quick-intro.css">` inside the existing <head>.
4. Add `<script src="titan-quick-intro.js"></script>` just before </body>, after the overlay block.
5. Remove old welcome overlay markup and old intro scripts/CSS that also control the welcome screen, or both animations may appear at once.
6. Commit changes to GitHub and refresh the live site.

IMPORTANT: Do not replace your whole existing index.html with this snippet; preserve your main website content.
