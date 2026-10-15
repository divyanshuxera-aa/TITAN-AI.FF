TITAN.AI — Remove Welcome / ENTER Animation

IMPORTANT:
This package does NOT contain your original full website HTML. Do not replace index.html with a new/demo page, because that can erase your real main website.

SAFE FIX (recommended):
1. Open your GitHub repository:
   https://github.com/divyanshuxera-aa/TITAN-AI.FF
2. Open index.html, then open History.
3. Restore the version from BEFORE the welcome/ENTER animation was added.
   This restores the original site content.
4. If you want to keep the current index.html, upload remove-animation.js to the repository.
5. In the real index.html, add this line just before </body>:
   <script src="remove-animation.js"></script>
6. Commit the changes, wait a few minutes, then reload the website.

If the preview text (“Your main website appears after ENTER”) is part of the current index.html, this helper cannot recreate overwritten main-site content. Restore the earlier index.html from History first.
