# # Well Come To Ghorer Bazar :(E-Commerce)

* live link : https://brand-tec.web.app/
* client site github : https://github.com/Masudur400/Brand-tec-client
* server site github : https://github.com/Masudur400/Brand-tec-server

 # Technologies
 * Html,
* CSS,
* Tailwind Css,
 * JavaScript,
* React,
* Node.js,
* Express.js,
* MongoDB,
* Firebase
 
 # Run Locally
 * npm i 
 * npm run dev


# impotent for server
{
    "version": 2,
    "builds": [
      {
        "src": "index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "index.js",
        "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
      }
    ]
  }