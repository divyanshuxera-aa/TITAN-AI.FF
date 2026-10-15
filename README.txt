TITAN FF — API REMOVE KIT

IMPORTANT
This small file hides common UID/API lookup panels and the specific API/CORS warning.
It does not safely remove API calls from your existing app by itself, because your current
HTML/JavaScript files were not provided for inspection.

HOW TO USE
1. Upload api-off.js to the same folder as index.html in your GitHub repository.
2. Open index.html and add this line just before </body>:
   <script src="api-off.js"></script>
3. Commit the change and wait for GitHub Pages to redeploy.

TO REMOVE THE API CODE COMPLETELY
1. In index.html, locate the UID lookup form/section and remove only that section if you no
   longer want the lookup feature.
2. In your JavaScript files, search for fetch( and the API host/domain. Remove the specific
   UID/profile/ban-check request and its event handler only.
3. Do not delete a whole script file unless you know it contains only the API feature; it may
   also control the site's navigation, login screen, animations, or other buttons.

If the warning remains, the lookup code is likely in a different file or uses different IDs.
Upload index.html and the relevant .js file so the exact API code can be removed without
breaking the rest of TITAN FF.
