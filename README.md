# Gladstone Neighborhood Map
* React.js Progressive Web App
    * Created using `create-react-app`
* Utilizes google-maps and yelp-fusion APIs (via Express app)
* features:
    * Responsive Design
    * Service Worker to cache static resources and dynamic fetches with Express API
    * Accessibility (with aria attributes and semantic elements)
### Required Setup:
* Clone express server in separate directory and initialize server from 
https://github.com/zoemrob/neighborhood-map-server
* File structure should be:
```
| neighborhood-map
  |src/
  |public/
| neighborhood-map-server
```
* Obtain Google Maps API Key from 
https://developers.google.com/maps/documentation/
* in `src/` create a file `apikeys.js`
   * contents: `export const gmapsAPIKey = <your-api-key>;`
* run `npm start` from root directory!

_Voila!_

### Using the app:
* Click a location marker or list item to pull details from yelp-fusion API for the business.
* Search in input field to filter search results.