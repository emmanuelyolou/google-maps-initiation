 /**
 * The custom USGSOverlay object contains the USGS image,
 * the bounds of the image, and a reference to the map.
 */
  export default class UserPositionOverlay extends google.maps.OverlayView {
    pos;
    image;
    div;
    constructor(pos, image) {
      super();
      this.pos = pos;
      this.image = image;
      this.div = null;
    }

    /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
    onAdd() {
      this.div = document.createElement("div");
      this.div.classList.add("user-position-marker");
      this.div.style.position = "absolute";
      
      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image;

      //Create a wrapper for the image to display the animation
      let userMarkerImgWrapper = document.createElement('div');
      userMarkerImgWrapper.classList.add('user-position-img-wrapper');
      userMarkerImgWrapper.appendChild(img);
      this.div.appendChild(userMarkerImgWrapper);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.div);
    }

    draw() {
      const overlayProjection = this.getProjection();
      const position = overlayProjection.fromLatLngToDivPixel( this.pos );
      this.div.style.left = position.x + "px";
      this.div.style.top = position.y + "px";
    }

    /**
   * The onRemove() method will be called automatically from the API if
   * we ever set the overlay's map property to 'null'.
   */
    onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        delete this.div;
      }
    }
    /**
   *  Set the visibility to 'hidden' or 'visible'.
   */
    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }
    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
    toggleDOM(map) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }
  }
 