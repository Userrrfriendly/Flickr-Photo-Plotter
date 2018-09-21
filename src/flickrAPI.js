export const getPhotosByTitle = (marker)=> {
  /* This will ask flicker to fetch all photos (that have geolocation)
    that contain the markers location title in any way (tag, image name, album name etc)
    the photos returned will be within a 31km radius from the markers position
    the func returns an array of photos details (id,farm,server etc)
  */
        let url = new URLSearchParams();
        url.append('method', 'flickr.photos.search');
        url.append('api_key', 'f6536bb373bca1fcd14d4da1281f2839');
        // url.append('tags', marker.title); //text produces broader results than tags 
        url.append('text', marker.title);
        url.append('has_geo','1');
        url.append('lat', marker.position.lat());
        url.append('lon', marker.position.lng());
        url.append('radius', '31');
        url.append('radius_units', 'km');
        url.append('per_page', '250');
        url.append('format', 'json');
        url.append('nojsoncallback', '1');

let arrayOfPhotos = fetch('https://api.flickr.com/services/rest/?' + url)
        .then((res)=> {
          return res.json()
          .then((json)=>{
            return json.photos.photo;
          })
        })
        .catch((err)=>{
          console.log(err);
          return ['error'];
        })

      return arrayOfPhotos;
  }

  export const flickrUrlConstructor = (array)=>{
    /*This takes the array of photo information from the getPhotosByTitle() and transforms each photo to a straightforward url*/

      let urlArr={
        default:[],
        thumbNail:[], //t
        medium:[], //c
        large:[], //b
        title:[]
      };
      if (array[0] !=='error') {
        for (let i=0;i<array.length;i++) {
          urlArr.default.push([`https://farm${array[i].farm}.staticflickr.com/${array[i].server}/${array[i].id}_${array[i].secret}.jpg`,array[i].id]);
          urlArr.thumbNail.push([`https://farm${array[i].farm}.staticflickr.com/${array[i].server}/${array[i].id}_${array[i].secret}_t.jpg`,array[i].id]);
          urlArr.medium.push([`https://farm${array[i].farm}.staticflickr.com/${array[i].server}/${array[i].id}_${array[i].secret}_c.jpg`,array[i].id]);
          urlArr.large.push([`https://farm${array[i].farm}.staticflickr.com/${array[i].server}/${array[i].id}_${array[i].secret}_b.jpg`,array[i].id]);
          urlArr.title.push([array[i].title]);
        }
      } else {
        urlArr = {
          error : true,
          default:['no-preview128px.png'],
          thumbNail:['no-preview128px.png'], //t
          medium:['no-preview128px.png'], //c
          large:['no-preview128px.png'], //b
        }
      }
      return urlArr;
  }
  
export const getPhotoLocation = (photo_id)=>{
  /* This flicker api call returns a set of coordinates for a given photo
    (Since there are no means to get the coordinates of a batch of photos)
    this method must be called EACH TIME a new photograph marker is to be plotted on the map
  */
  let url = new URLSearchParams();
    url.append('method', 'flickr.photos.geo.getLocation');
    url.append('api_key', 'f6536bb373bca1fcd14d4da1281f2839');
    url.append('format', 'json');
    url.append('nojsoncallback', '1');
    url.append('photo_id', photo_id);

    let result = fetch('https://api.flickr.com/services/rest?' + url)
    .then((res)=> {
      return res.json()
      .then((json)=>{
        let position = {
          lat: parseFloat(json.photo.location.latitude),
          lng: parseFloat(json.photo.location.longitude)
        }
        return position;
      })
    })
    .catch((err)=>{
      console.log(err);
      return ['error'];
    })

  return result;
}