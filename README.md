# Flickr-Photo-Plotter
Final Project For the FEND NanoDegree at Udacity,
Bootstrapped with create-react-app + Google Maps API + Wikipedia API + Flickr API.



## Application Overview

This single page application displays a map (Google Maps) and a list of landmarks (currently the landmarks are mostly Dodecanese islands of Greece plus Santorini and Delos - which are too cool to ignore :P ). The user can filter the landmarks by using the input field above the marker list. By clicking on either the marker on the map or the list item at the list of markers an infoWindow will expand above the marker on the map. **By default the info window displays the following information:**
* A brief description of the landmark (fetched from the **Wikipedia API**)
* A thumbnail of a random public-photograph (fetched from the **Flickr API**)
    * By clicking on the thumbnail in the infowindow a modal window will open that displays the the large version of the photo. 
    * Each time the user clicks on a (non expanded) marker a different photo will appear (with the current version of the app each location can have up to 250 photographs)
* A button that if pressed will plot the current flickr photo on the map based on the photographs geolocation. In other words it will create a new marker(with a different icon from the default) and will place it on the spot that the photograph was taken.  

### How does the plotting work ?
Modern mobile phones/tablets and some cameras have a build in GPS (additionally even if GPS is disabled, location can be accessed via mobile data).
Naturally when a photograph is taken with a phone or a similar device the current coordinates(latitude & longitude) are stored as metadata inside the photograph. The Flickr API  supplies us some powerful tools regarding the photo's metadata including a search parameter that will return only photographs that have geolocation(flickr.photos.search with has_geo), and methods to get the coordinates from a photo (flickr.photos.geo.getLocation).

### Known issues
  1. Sometimes a photograph that was supposedly shot from one landmark(island) will be plotted on a different one (example: some photos from Lipsi island are plotted on the nearby Patmos island - the two islands are less than 10km apart). **This is actually not a bug** When the app makes a request to flickr API it asks for all the photos that flickr can find within a 31km radius from the landmark + the photograph must have either a tag,description,album that matches the landmark's title. So if for example the user who uploaded the image to flickr used the wrong title on the photo (or if the photo is in an album that includes the landmarks title eg. "trip to ,Patmos, Lipsi, Leros") the photograph will satisfy the search criteria. Although the 31km radius seems excessive it makes sense for big islands like Rhodes. *In the future I plan to eliminate this behaviour by using Bounding Box search parameter, but for now it will do.*
  2. There is **a highly improbable** (*but still possible*) chance that you run onto a photo where the flickr user either changed the permissions from public to private or just removed the large version of the photo. In that case if the photo's thumbnail in the infowindow is clicked the expanded photo will be blank with a message from flickr 'This photo is no longer available'. *This could possibly be avoided by making an extra API call to flickr (and asking for the availability of the current image in large versions)but at this stage it would be overkill*. In case you are desperate to see a larger than thumbnail version of that specific image you can simply resize your browser (there is a fallback for small screens that will serve smaller(default by flickr standards) pictures on small screens). 


## Installation:
* Clone or Download this project
* navigate inside the project directory and run `npm install`
* to start the development build run `npm start` this will load the page on http://localhost:3000/

**Warning:**
The service worker is availiable only during production build.
To implement it follow the following steps:
* To create a production build, use `npm run build`
* then run `npm install -g serve` to serve it with static server
* finaly run `serve -s build`. You can view the production version of the project at http://localhost:5000 


*(This app uses the Flickr API but is not endorsed or certified by SmugMug, Inc.)*
