TITAN FF — UID LOOKUP STARTER

FILES
- index.html: page structure
- style.css: red/black responsive styling
- script.js: profile + ban-check API calls

HOW TO USE ON GITHUB PAGES
1. Open your existing GitHub repository.
2. Make a backup/download of your current site first.
3. Upload these files into the folder where your site index.html lives.
4. If prompted, replace only the files you intend to replace. This starter page is standalone; it does not automatically merge into your existing website layout.
5. Wait for GitHub Pages to redeploy, then open the site and test with a UID.

API SOURCES USED IN THIS STARTER
- Profile: https://github.com/PRINCE-LKTEAM/Free-Fire-API
  Example host in the docs: https://freefireinfo-zy9l.onrender.com/api/v1/player-profile
- Ban check: https://github.com/ravi252/Freefireapi
  Example host in the docs: https://api2.nftoken.info/checkbanned?id=UID

IMPORTANT LIMITATIONS
- These are unofficial third-party APIs, not Garena services. They may stop working, change schemas, require limits, or block browser requests with CORS.
- This starter displays avatarId and bannerId values returned by the profile API, but it does NOT fabricate actual avatar/banner image URLs. A numeric ID is not itself an image URL.
- The banner image API documented by siambhau/FreeFireApi requires an API key. Do not put a paid/private API key in public JavaScript. If you obtain an API key, use a server-side function (for example a Vercel serverless function) to keep it secret.
- A ban status of UNKNOWN means no reliable status was returned. Do not interpret UNKNOWN as banned or not banned.
- This is a standalone page. It does not modify your live GitHub Pages website until you upload the files yourself.
