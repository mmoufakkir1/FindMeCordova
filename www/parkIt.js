var latitude;
var longitude;
var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
	 function onDeviceReady() {
        navigator.notification.alert("navigator.geolocation works well");
    }
}

function onDeviceReady() {
    var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');
    if (cordova.platformId == 'ios') {
        node.setAttribute('href', 'parkItios.css');
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else {
        node.setAttribute('href', 'parkItandroid.css');
        window.StatusBar.backgroundColorByHexString('#1565C0');
    }
    document.getElementsByTagName('head')[0].appendChild(node);
}
function setCss(elm, prop, val) {
    var node = document.getElementById(elm).style;
    node.setProperty(prop, val);
}

function setMyLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, locationError, { enableHighAccuracy: true });
}

function setParkingLocationSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  
     
    if (latitude != '' && longitude != '') {
        //showAlert();
        showNotification();

        // Vibrate for 1 seconds
        navigator.vibrate(1000);

        cordova.plugins.notification.local.schedule({
            title: 'Find Me',
            text: "Your Alert of a location was found your latitude : " + latitude + " and " +  latitude,
            trigger: {every: {  minute: 15 }},
            actions: [
                { id: 'yes', title: 'Yes' }
            ]
        });
        
        var location = new google.maps.LatLng(latitude, longitude);        
        var currgeocoder = new google.maps.Geocoder();

        currgeocoder.geocode({
            'location': location
        }, function (results, status) {
    
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);       
                document.getElementById('address').innerText = results[0].formatted_address;  
            } else {
                navigator.notification.alert('Geocode was not successful for the following reason: ' + status);
            }
        });

       
        document.getElementById('latitude').innerText = latitude;
        document.getElementById('longitude').innerText = longitude;
    
        setCss('map', 'visibility', 'visible');      
    }
    
}

function locationError(error) {
    navigator.notification.alert("Error Code: " + error.code + "\nError Message: " + error.message);
}

fu

// alert dialog dismissed
function alertDismissed() {
    // do something
}

//Show a custom alert
function showAlert() {
    navigator.notification.alert(
        "Your Alert of a location was found your latitude : " + latitude + " and " +  latitude ,//message 
        alertDismissed,         // callback
        'Find Me Alert',            // title
        'Ok'                  // buttonName
    );
}

// confirm dialog dismissed
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

//Show a custom confirm
function showNotification() {
    navigator.notification.confirm(
        "Your Notification of a location was found your latitude : " + latitude + " and " +  latitude ,//message 
        onConfirm,            // callback to invoke with index of button pressed
        'Find Me Notification',          // title
        //['Restart','Exit']     // buttonLabels
        'Ok'                  // buttonName
    );
}



