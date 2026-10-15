TITAN UNBAN WORLD — Welcome Intro Animation

This ZIP is a working preview plus files to integrate a welcome intro into your existing website.

Files:
- index.html: preview page (not a replacement for your real site's index.html)
- welcome-animation.css: visual effects and animation
- welcome-animation.js: fades the intro away after about 6.7 seconds

Add it to your existing website:
1. Upload `welcome-animation.css` and `welcome-animation.js` into the same folder as your current `index.html`.
2. In your existing `index.html`, paste the `<div id="titan-welcome" ...>` block from this ZIP's `index.html` just before `</body>`.
3. Add this inside your existing `<head>`:
   <link rel="stylesheet" href="welcome-animation.css">
4. Add this just before `</body>`, after the intro div:
   <script src="welcome-animation.js"></script>
5. Commit the changes and wait for GitHub Pages to publish.

Important:
- Do NOT replace your current website's whole index.html with the preview index.html; that would replace your existing page.
- This is a similar dark neon gaming-style intro inspired by the uploaded reference, not a frame-for-frame copy.
- To change the title, edit the text in the welcome-title section of index.html.
- Intro lasts about 6.7 seconds, then fades away to reveal the existing page.
