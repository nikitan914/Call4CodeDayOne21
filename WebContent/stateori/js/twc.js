//Author: Nikita Nangia

var productData;

var tropicalCycloneLayerAE;
var tropicalCycloneLayerWI;

var tropicalDepressionLayerAE;
var tropicalDepressionLayerWI;

var tropicalStormLayerAE;
var tropicalStormLayerWI;

var hurricaneLayerAE;
var hurricaneLayerWI;
var thresholdVal;

var info = L.control();

var markerList=[];
var impactedLocationLayers=[];

var Map = [];
 
var plotImpacted = false;
  var myStyle = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0.65
      };

  var blueStyle = {
          "color": "blue",
          "weight": 5,
          "opacity": 0.65
      };

  var yellowStyle = {
          "color": "yellow",
          "weight": 5,
          "opacity": 0.65
      };

  var greenStyle = {
          "color": "green",
          "weight": 5,
          "opacity": 0.65
      };

 
  var southWest = L.latLng(-90, -180);
  var northEast = L.latLng(90, 180);
  var bounds = L.latLngBounds(southWest, northEast);
 

function loadAllProductData()
{
	removeAllPolygon();
	removeAllImpacted();

	var ischkforecast = document.getElementById('chkforecast').checked;
	if (!ischkforecast)
		return;
 	thresholdVal = 0.3; 
 	dopic('pic15day');
	$.ajax({
		url : "/api/twcapi/allProducts/" + thresholdVal,
		beforeSend : function(xhr) {
		}
	}).done(function(response) {
		console.log("response" + response);
		productData = response;
		plotPolygon();
	});
 }

  function loadAlerts()
   {
	  for(var i=0;i<markerList.length;i++)
	  {
		  MapdefMap.removeLayer(markerList[i]);
	  }
	var ischkalerts = document.getElementById('chkalerts').checked;
	if (!ischkalerts)
		return;

	var url =   "/api/alert/alldocsbytime/24/Y,Earthquakes,NWS,GDACS,TWC,Resilinc/N";
	$.getJSON(url,
					function(response) {
						var docsArray = response["rows"]; // getting docsArray
															// = Array(11)

						var numDocs = 0;
						if (docsArray)
							numDocs = docsArray.length;
						if (numDocs > 0) {
 
							 
							var doctxt = "";
							for (var i = 0; i < numDocs; i++) {

								var divid = 'div' + i;
								var urlArray = docsArray[i];
								var alert_id = urlArray["_id"];
								var alert_rev = urlArray["_rev"];
								var alertDesc = urlArray["alertDesc"];
								var alert_user_expiry_date = urlArray["alert_user_expiry_date"];
								var alert_last_update = urlArray["alert_last_update"];
								var alerturl = urlArray["alerturl"];
								if (!alerturl)
									alerturl = "#";
								var alert_geo_latitude = urlArray["alert_geo_latitude"];
								var alert_geo_longitude = urlArray["alert_geo_longitude"];
								var alert_source = urlArray["alert_source"];
								var alertIntensity = urlArray["alertIntensity"];
								var eventTime = new Date(
										urlArray["alert_creation_date"]);
								var title = urlArray["title"];
								if (title == null || title == 'null')
									title = alert_source.toUpperCase()
											+ " Alert";

								var lat=alert_geo_latitude;
								var long=alert_geo_longitude;
								if (!(lat>=MINLAT && lat<=MAXLAT && long>=MINLON && long<=MAXLON))	
									 continue
									 
								var msg = alertDesc.toLowerCase();
								var img = "";
								if (msg.indexOf("flood") >= 0)
									img = "flood";
								else if (msg.indexOf("tornado") >= 0)
									img = "tornado";
								else if (msg.indexOf("volcano") >= 0)
									img = "volcano";
								else if (alert_source.toLowerCase().indexOf(
										"earthquake") >= 0)
									img = " earth.png";
								else
									continue;

								var headtext = '<ul><div id='
										+ divid
										+ ' onmouseover="document.getElementById(\''
										+ divid
										+ '\').style.backgroundColor=\'#cccccc\'; '
										+ '"     onmouseout="this.style.backgroundColor=\'\';" >&#x2600;&nbsp;<small><b><font color="red">'
										+ title
										+ '</font></b><br/>'
										+ urlArray["alertDesc"].substring(0,
												200) + ''
										+ "<br/><b>Severity : </b>"
										+ urlArray["alert_severity"]
										+ "<br/><b>Created Date : </b>"
										+ eventTime.toGMTString()
										+ '</div> </ul><hr />';

								doctxt = doctxt + headtext;
								// //
								// spotRisk(alertDesc+"("+alert_source+")",
								// alerturl, alert_geo_latitude,
								// alert_geo_longitude, divid);

								var txt = alertDesc + "(" + alert_source + ")";
								var url = alerturl;
								var lat = alert_geo_latitude;
								var lang = alert_geo_longitude;

								var msg = msg.toLowerCase();
								var img = "severeweather";
								if (msg.indexOf("flood") >= 0)
									img = "flood";
								if (msg.indexOf("blizzard") >= 0)
									img = "blizzard";
								if (msg.indexOf("fire") >= 0)
									img = "volcano";
								if (msg.indexOf("volcano") >= 0)
									img = "volcano";
								if (msg.indexOf("Wind Chill") >= 0)
									img = "snowfall";
								if (msg.indexOf("Winter") >= 0)
									img = "snowfall";
								if (msg.indexOf("storm") >= 0)
									img = "storm";
								if (msg.indexOf("tornado") >= 0)
									img = "tornado";
								if (msg.indexOf("earthquake") >= 0)
									img = "earth";

								var vwIcon = L.icon({
									iconUrl : '/img/' + img + '.png',
									iconSize : [ 14, 14 ]
								});

								if (lat && lang) {
									var marker = L.marker([ lat, lang ], {
										icon : vwIcon,
										opacity : 10
									});

									marker
											.on(
													'mouseover',
													function() {
														if (document
																.getElementById(divid)) {
															document
																	.getElementById(divid).style.backgroundColor = '#cccccc';

														}
														// this.openPopup();
													});

									marker
											.on(
													'mouseout',
													function() {
														if (document
																.getElementById(divid)) {
															document
																	.getElementById(divid).style.backgroundColor = '';

														}
														// this.closePopup();
													});

									if (url) {
										if (txt.length > 100)
											txt = txt.substring(0, 100);
										marker
												.bindPopup(""
														+ txt
														+ " <a href='"
														+ url
														+ "' target='new'>check more info..</a>");

									} else {
										if (txt.length > 100)
											txt = txt.substring(0, 100);
										marker.bindPopup("" + txt + "");

									}
									marker.addTo(MapdefMap);
									markerList.push(marker); 
								}

							}
 
						}

					});

}

function showLastUpdated()
{
 if(productData.lastUpdated)
   {
   $("#lastUpdated").html("<b>Last Udpated On</b> :"+ productData.lastUpdated);
   }
}
 
  
 

function addImpactedLocationsToMap(locations)
{
  var innerhtml="";
  var img = "";
  var iconsize = 15;
      var vwIcon = L.icon({
        iconUrl: 'images/icon/circle_orange.png',
        iconSize: [iconsize, iconsize]
      });

  for(var j=0;j<locations.length;j++)
  {
     var location =  locations[j];
     innerhtml  = innerhtml + ","+location.id;
     var longitude = location.geometry.coordinates[0];
     var latitude = location.geometry.coordinates[1];
     if (latitude != null && longitude != null) {
       // console.debug(latitude+"::::"+longitude);
       var f = L.marker([latitude, longitude], {
         icon: vwIcon
       }).addTo(MapdefMap);
       f.bindPopup("Location : " + location.id + "");
       impactedLocationLayers.push(f);
     }

  }
}

function removeAllImpacted()
{
  for(var i=0;i<impactedLocationLayers.length;i++)
  {
	  MapdefMap.removeLayer(impactedLocationLayers[i]);
  }
}
function plotPolygon()
{
   console.log("--product data----"+productData);

  tropicalCycloneWPI15D();
  tropicalCycloneAE306TCPROB();

  tropicalDepressionAE306TDPROB();
  tropicalDepressionWPI304TDPROB();
  

  tropicalStormWPI306TSPROB();
  tropicalStormWPI15D();
  

  hurricaneWPI15D();
  hurricaneAE306TCPROB();
  
  
}

function removeAllPolygon()
{
  if(tropicalCycloneLayerAE)
	  MapdefMap.removeLayer(tropicalCycloneLayerAE);
  if(tropicalCycloneLayerWI)
	  MapdefMap.removeLayer(tropicalCycloneLayerWI);
  if(tropicalDepressionLayerAE)
	  MapdefMap.removeLayer(tropicalDepressionLayerAE);
  if(tropicalDepressionLayerWI)
	  MapdefMap.removeLayer(tropicalDepressionLayerWI);
  if(tropicalStormLayerAE)
	  MapdefMap.removeLayer(tropicalStormLayerAE);
  if(tropicalStormLayerWI)
	  MapdefMap.removeLayer(tropicalStormLayerWI);
  if(hurricaneLayerAE)
	  MapdefMap.removeLayer(hurricaneLayerAE);
  if(hurricaneLayerWI)
	  MapdefMap.removeLayer(hurricaneLayerWI);
}


function tropicalDepressionAE306TDPROB()
{
  if(productData["306:tdprob"].geojson.features && productData["306:tdprob"].geojson.features.length >0)
  {
    tropicalDepressionLayerAE = L.geoJson(productData["306:tdprob"].geojson,{
      style: myStyle
    }).addTo(MapdefMap);
    //map.fitBounds(tropicalDepressionLayerAE.getBounds());
  }
  if((productData["306:tdprob"].impactedLocations) && productData["306:tdprob"].impactedLocations.length >0)
    {
    var locations = productData["306:tdprob"].impactedLocations;
    addImpactedLocationsToMap(locations);
    }
}


function tropicalDepressionWPI304TDPROB()
{

	if(productData["304:tdprob"].geojson.hasOwnProperty("features"))
  if(productData["304:tdprob"].geojson.features.length >0)
  {
    tropicalDepressionLayerWI = L.geoJson(productData["304:tdprob"].geojson,{
      style: myStyle
    }).addTo(MapdefMap);
   // map.fitBounds(tropicalDepressionLayerWI.getBounds());

  }
  if((productData["304:tdprob"].impactedLocations) && productData["304:tdprob"].impactedLocations.length >0)
  {
    var locations = productData["304:tdprob"].impactedLocations;
    addImpactedLocationsToMap(locations);
  }

}

function tropicalStormWPI306TSPROB()
{
if(productData["306:tsprob"].geojson.hasOwnProperty("features"))
  if(productData["306:tsprob"].geojson.features.length >0)
  {
    tropicalStormLayerAE = L.geoJson(productData["306:tsprob"].geojson,{
      style: yellowStyle
    }).addTo(MapdefMap);
  }
  if((productData["306:tsprob"].impactedLocations) && productData["306:tsprob"].impactedLocations.length >0)
  {
    var locations = productData["306:tsprob"].impactedLocations;
    addImpactedLocationsToMap(locations);
  }

}

function tropicalStormWPI15D()
{
	if(productData["304:tsprob"].geojson.hasOwnProperty("features"))
  if(productData["304:tsprob"].geojson.features.length >0)
  {
    tropicalStormLayerWI = L.geoJson(productData["304:tsprob"].geojson,{
      style: yellowStyle
    }).addTo(MapdefMap);
  }
  
  if((productData["304:tsprob"].impactedLocations) && productData["304:tsprob"].impactedLocations.length >0)
  {
    var locations = productData["304:tsprob"].impactedLocations;
    addImpactedLocationsToMap(locations);
  }

}


  function tropicalCycloneWPI15D()
  {
    console.log("--code check---");
    if(productData["304:tcprob"].geojson.hasOwnProperty("features"))
    if(productData["304:tcprob"].geojson.features && productData["304:tcprob"].geojson.features.length >0)
      {
        tropicalCycloneLayerWI = L.geoJson(productData["304:tcprob"].geojson,{
          style: greenStyle
        }).addTo(MapdefMap);
      }
    
    if((productData["304:tcprob"].impactedLocations) && productData["304:tcprob"].impactedLocations.length >0)
    {
      var locations = productData["304:tcprob"].impactedLocations;
      addImpactedLocationsToMap(locations);
    }
    
  }
  
  function tropicalCycloneAE306TCPROB()
  {
	    if(productData["306:tcprob"].geojson.hasOwnProperty("features"))
    if(productData["306:tcprob"].geojson.features && productData["306:tcprob"].geojson.features.length >0)
    {
      tropicalCycloneLayerAE = L.geoJson(productData["306:tcprob"].geojson,{
        style: greenStyle
      }).addTo(MapdefMap);
    }
    if((productData["306:tcprob"].impactedLocations) && (productData["306:tcprob"].impactedLocations.rows) && productData["306:tcprob"].impactedLocations.rows.length >0)
    {
      var locations = productData["306:tcprob"].impactedLocations;
      addImpactedLocationsToMap(locations);
    }

  }

  function hurricaneWPI15D()
  {
	  if(productData["304:hrprob"].geojson.hasOwnProperty("features"))
    if(productData["304:hrprob"].geojson.features && productData["304:hrprob"].geojson.features.length >0)
      {
        hurricaneLayerWI = L.geoJson(productData["304:hrprob"].geojson,{
          style: blueStyle
        }).addTo(MapdefMap);
      }
    if((productData["304:hrprob"].impactedLocations) && productData["304:hrprob"].impactedLocations.length >0)
    {
      var locations = productData["304:hrprob"].impactedLocations;
      addImpactedLocationsToMap(locations);
    }
    
}


  function hurricaneAE306TCPROB()
  {
	  if(productData["306:hrprob"].geojson.hasOwnProperty("features"))
    if(productData["306:hrprob"].geojson.features && productData["306:hrprob"].geojson.features.length >0)
    {
      hurricaneLayerAE = L.geoJson(productData["306:hrprob"].geojson,{
        style: blueStyle
      }).addTo(MapdefMap);
    }
    if((productData["306:hrprob"].impactedLocations) && productData["306:hrprob"].impactedLocations.length >0)
    {
      var locations = productData["306:hrprob"].impactedLocations;
      addImpactedLocationsToMap(locations);
    }

  }

 

  function getSiteSuppliers(siteorsupplier) { }

  
  


  function spotRisk(txt, url, lat, lang, divid) {
	    var msg = txt.toLowerCase();
	    var img = "severeweather";
	    if (msg.indexOf("flood") >= 0) img = "flood";
	    if (msg.indexOf("blizzard") >= 0) img = "blizzard";
	    if (msg.indexOf("fire") >= 0) img = "volcano";
	    if (msg.indexOf("volcano") >= 0) img = "volcano";
	   if (msg.indexOf("Wind Chill") >= 0) img = "snowfall";
	    if (msg.indexOf("Winter") >= 0) img = "snowfall";
	    if (msg.indexOf("storm") >= 0) img = "storm";
	    if (msg.indexOf("tornado") >= 0) img = "tornado";
	    if (msg.indexOf("earthquake") >= 0) img = "earth"; 
		
	    var vwIcon = L.icon({
	      iconUrl: '/img/' + img + '.png',
	      iconSize: [14, 14]
	    });

	 

	    if(lat && lang)
	      {
	          var marker = L.marker([lat, lang], {
	            icon: vwIcon,
	            opacity: 10
	          });
	        
	          marker.on('mouseover', function() {
	            if (document.getElementById(divid)) {
	              document.getElementById(divid).style.backgroundColor = '#cccccc';
	            
	            }  
	            //this.openPopup();
	          });
	        
	          marker.on('mouseout', function() {
	            if (document.getElementById(divid)) {
	              document.getElementById(divid).style.backgroundColor = '';
	        
	            }
	            //this.closePopup();
	          }); 
	          
	           if(url)
	          { 
	        	   marker.bindPopup("" + txt + "<a href='" + url + "' target='new'>check more info..</a>");  
	        	 
	          }
	        else
	          {
	      	   marker.bindPopup("" + txt + "");  
	           
	          } 
	           marker.addTo(MapdefMap);
	            
	      }
	    
	  }
  
   