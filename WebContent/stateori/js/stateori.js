//Author: Nikita Nangia
 
var mapinit=true;

var countysvi={};
var countypop={};
var countynri={};
var countynridesc={};
var countyfld={};
var countyflddesc={};
var countyareaden={};
var CountyCount={};
var CountyTxt={};
var selstate="North Carolina";
var selectedcounty='';
var curview='state';
var venue='Church';

var strmList=[];
var strmData={};


var cityList=[];
var cityData=[];

var vaccineData={};

var outageData={};

var MINLAT = 33.4;
var MAXLAT = 36.5;
var MINLON = -84;
var MAXLON = -75.5;

setTimeout(
		function() {
			saveStorms();
}, 400);

 
setTimeout(
		function() {
	 		try {MapdefMap.removeLayer(loadingMarker);}catch(err){} 
	 		document.getElementById("chksvi").checked=false;
	 	 	try {MapdefMap.removeControl(geosvi);}catch(err){}  
 		}, 7000);

	  
initCovid(); 
setTimeout(
		function() {
			loadVaccineData();	
		}, 200); 

setTimeout(
		function() {
			saveTemps();	
		}, 300);	 
	
for (i = 0; i < ncriskpop.length; i++) { 
	      var county = ncriskpop[i][0];
	      var pop = ncriskpop[i][1];
	      var nri = ncriskpop[i][2];
	 	  var nridesc = ncriskpop[i][3];
	      var fld = ncriskpop[i][4];
	      var flddesc = ncriskpop[i][5];
	      var cntyarea = ncriskpop[i][6];
	      var popden=pop/cntyarea;
	 	  //console.log( county+":"+flddesc);
	     countypop[county.toUpperCase().trim()]=pop.toFixed(2);
	     countynri[county.toUpperCase().trim()]=nri.toFixed(2);
	     countynridesc[county.toUpperCase().trim()]=nridesc;
	     countyfld[county.toUpperCase().trim()]=fld.toFixed(2);
	     countyflddesc[county.toUpperCase().trim()]=flddesc; 
	     countyareaden[county.toUpperCase().trim()]=popden.toFixed(2);
}

var hosMar=[];
var airMar=[];
var siteMar=[];
var elevMar=[]
var venMart=[];
var strmLayer=[];
var tempLayer=[];
var loadingMarker;


var geosvi ;
var geonri ;
var geofld ;
var geopop;
var geocnty ;
var geovacc;
var geocovid;
var geopower;

 
 
$.getJSON("https://oriai-api.mybluemix.net/oriai-api/api/getoutages", function( data ) { 
 	  for (var k=0;k<4000;k++) { 
		     var kk=''+k+'';
		  	 var js=data[kk]
		  	 if (!js) continue;
		   	 var state=js.State; 
			 if (state.toUpperCase()!='NORTH CAROLINA')
				 continue;
			 var County=js.County;
			 County=County.toUpperCase();
			 outageData[County]=js;
 	 }
}); 

 
//var alerturl="https://risk-insights-ibm.mybluemix.net/api/alert/alldocsbytime/12/Y,Earthquakes,NWS,Gdacs,Twc,Resilinc,IMD/N";

var ncounties=["Alamance", "Alexander", "Alleghany", "Anson", "Ashe", "Avery", "Beaufort", "Bertie", "Bladen", "Brunswick", "Buncombe", 
        "Burke", "Cabarrus", "Caldwell", "Camden", "Carteret", "Caswell", "Catawba", "Chatham", "Cherokee", "Chowan", "Clay", "Cleveland",
        "Columbus", "Craven", "Cumberland", "Currituck", "Dare", "Davidson", "Davie", "Duplin", "Durham", "Edgecombe", "Forsyth", "Franklin",
        "Gaston", "Gates", "Graham", "Granville", "Greene", "Guilford", "Halifax", "Harnett", "Haywood", "Henderson", "Hertford",
        "Hoke", "Hyde", "Iredell", "Jackson", "Johnston", "Jones", "Lee", "Lenoir", "Lincoln", "McDowell", "Macon", "Madison", "Martin", 
        "Mecklenburg", "Mitchell", "Montgomery", "Moore", "Nash", "New Hanover", "Northampton", "Onslow", "Orange", "Pamlico", "Pasquotank",
        "Pender", "Perquimans", "Person", "Pitt", "Polk", "Randolph", "Richmond", "Robeson", "Rockingham", "Rowan", "Rutherford", 
        "Sampson", "Scotland", "Stanly", "Stokes", "Surry", "Swain", "Transylvania", "Tyrrell", "Union", "Vance", "Wake", "Warren", "Washington", "Watauga", "Wayne", 
		"Wilkes", "Wilson", "Yadkin", "Yancey"];



var readyState = function(e) {
	setTimeout(
			function() {
				try {
					MapdefMap = L.map("worldmap", {
						maxBounds : bounds,
						preferCanvas : true
					}, {
						worldCopyJump : !0
					}).setView([  35, -80 ], 7, {
						animate : false
					});
							L.tileLayer("",{	attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(MapdefMap),
							L.Path.CLIP_PADDING = 3;
		 			MapdefMap.options.minZoom = 2; 
					$('#worldmap').height(650);
					MapdefMap.setView([ 35, -80 ], 7, {
						animate : true
					}); 
					var styleUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjazhzdHN0OGgwN2pnM2ZtdmkwMTA4cWVyIn0.YKdkXmVTJM76Y5ZmTEW0Ag';
					var Stamen_Toner = L
							.tileLayer(
									styleUrl,
									{
										attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
										subdomains : 'abcd',
										minZoom : 0,
										maxZoom : 20,
										ext : 'png'
									});

					// add the tiles to the map
					Stamen_Toner.addTo(MapdefMap);  
					var loadingIcon = L.icon({
						iconUrl : 'images/loadingbar1.gif',
						iconSize : [600,600],
					});
				loadingMarker= L.marker([ 35, -80], {icon : loadingIcon  }); 
				loadingMarker.addTo(MapdefMap);
					document.getElementById("county").selectedIndex=0;
					document.getElementById("chksvi").checked=true;
					dosvi(true); 
			 	} catch (err) {
					console.log(err);
				}
			}, 10);

	
	

}

window.addEventListener('DOMContentLoaded', readyState);

function getPopup(f){
	var county="";
	var svi="";
	var nri="";
	var nrirating="";
	var ffld="";
	var fflddesc="";
	var pp="";
	var covid="";
	var vacc="";
	var fpop=0;
	
 	countysvi[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]=f.properties['RPL_THEMES'];
	for(var key in f.properties){
		var g=key;
		if (g=='RPL_THEMES') { g="SVI Index"; svi=f.properties[key];}
		if (g=='LOCATION') county= f.properties[key];
		if (g=='COUNTY') {
			nri= countynri[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
			nrirating= countynridesc[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()];  
			ffld= countyfld[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
			fflddesc= countyflddesc[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
			pp= countypop[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
			covid= CountyCount[f.properties['COUNTY'].toUpperCase().trim()];
			vacc= vaccineData[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()];
			if (vacc==undefined) vacc="Unknown";
			else vacc=vacc+" %";
			
		  	var foutagejson= outageData[f.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
		 	if (foutagejson==undefined) fpop=0;
		 	else fpop=foutagejson.Customer_outage;
		 
		}
		  
}
var pop="<table style='color:#fff'>";
/*
pop=pop+"<tr><td style='background-color:#eee'>SVI Index</td><td>"+svi+"</td></tr>";
pop=pop+"<tr><td>NRI Index</td><td>"+nri+"</td></tr>";
pop=pop+"<tr><td>NRI Rating</td><td>"+nrirating+"</td></tr>";
pop=pop+"<tr><td>Flood Index</td><td>"+ffld+"</td></tr>";
pop=pop+"<tr><td>Flood Rating</td><td>"+fflddesc+"</td></tr>";
pop=pop+"<tr><td>Population</td><td>"+pp+"</td></tr>";
pop=pop+"<tr><td>Covid Cases</td><td>"+covid+"</td></tr>";
pop=pop+"<tr><td>Vaccin. Complete</td><td>"+vacc+"</td></tr>";
pop=pop+"<tr><td>Power Outages</td><td>"+fpop+"</td></tr>"; 
pop=pop+"<tr><th colspan=2 style='font-size:12px; font-weight:bold;background-color:#ddd'><b>"+county+"</b></th></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>SVI Index</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+svi+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>NRI Index</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+nri+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>NRI Rating</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+nrirating+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Flood Index</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+ffld+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Flood Rating</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+fflddesc+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Population</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+pp+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Covid Cases</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+covid+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Vaccin. Complete</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+vacc+"</b></td></tr>";
pop=pop+"<tr><td  style='font-size:12px; font-weight:bold;background-color:#eee'><b>Power Outages</b></td><td  style='font-size:12px; font-weight:bold;background-color:#fafafa'><b>"+fpop+"</b></td></tr>"; 
pop=pop+"<tr><th colspan=2><b>"+county+"</b></th></tr>";
pop=pop+"<tr><th colspan=2><hr /></th></tr>";
pop=pop+"<tr><td><b>SVI Index</b></td><td><b>"+svi+"</b></td></tr>";
pop=pop+"<tr><td><b>NRI Index</b></td><td><b>"+nri+"</b></td></tr>";
pop=pop+"<tr><td><b>NRI Rating</b></td><td><b>"+nrirating+"</b></td></tr>";
pop=pop+"<tr><td><b>Flood Index</b></td><td><b>"+ffld+"</b></td></tr>";
pop=pop+"<tr><td><b>Flood Rating</b></td><td><b>"+fflddesc+"</b></td></tr>";
pop=pop+"<tr><td><b>Population</b></td><td><b>"+pp+"</b></td></tr>";
pop=pop+"<tr><td><b>Covid Cases</b></td><td><b>"+covid+"</b></td></tr>";
pop=pop+"<tr><td><b>Vaccin. Complete</b></td><td><b>"+vacc+"</b></td></tr>";
pop=pop+"<tr><td><b>Power Outages</b></td><td><b>"+fpop+"</b></td></tr>"; 

*/
pop=pop+"<tr><th colspan=2><b>"+county+"</b></th></tr>";
pop=pop+"<tr><td colspan=2><hr /></td></tr>";
pop=pop+"<tr><td><b>SVI Index</b></td><td><b>"+svi+"</b></td></tr>";
pop=pop+"<tr><td><b>NRI Index</b></td><td><b>"+nri+"</b></td></tr>";  
pop=pop+"<tr><td></td><td><b>("+nrirating+")</b></td></tr>";  
pop=pop+"<tr><td><b>Flood Index</b></td><td><b>"+ffld+"</b></td></tr>"; 
pop=pop+"<tr><td></td><td nowrap><b>("+fflddesc+")</b></td></tr>"; 
pop=pop+"<tr><td><b>Population</b></td><td><b>"+pp+"</b></td></tr>";
pop=pop+"<tr><td><b>Covid Cases</b></td><td><b>"+covid+"</b></td></tr>";
pop=pop+"<tr><td><b>Vaccination</b></td><td><b>"+vacc+"</b></td></tr>";
pop=pop+"<tr><td nowrap><b>Power Outages&nbsp;&nbsp;</b></td><td><b>"+fpop+"</b></td></tr>"; 


pop=pop+"</table>"; 
return pop;
	
}

function dosvi(){
	dosvi(false);
}

function dosvi(isinit){  
	var issvi=document.getElementById('chksvi').checked; 
 	try {MapdefMap.removeControl(geosvi);}catch(err){} 
 	if (!issvi) 		return;
 	dopic('picsvi');
    geosvi = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
		var out = [];
			
		if (f.properties){
			pop=getPopup(f);
			l.bindPopup(pop);
 		}
    }}).addTo(MapdefMap); 
    
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geosvi.addData(data);	});
	 function style(feature) {
	 var f= feature.properties['RPL_THEMES']/2+0.2; 
	 var wt=0.6;
	 var fillc='#ff0000';
	 var cl='#000';
	 if (isinit) {f=0;wt=0;fillc="#ffffff";cl="#ffffff";}
	 
 		 return {
	           opacity:1,
	           fillOpacity:f, 
	           weight:.6,
	           color: cl,
	           fillColor: fillc
	       };
	} 
}

function doVaccination(){ 
	var ischkvacc=document.getElementById('chkvacc').checked;  
	try {MapdefMap.removeControl(geovacc);}catch(err){} 
 	if (!ischkvacc) 		return;
 	dopic('picvacc');
 	geovacc = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
		var out = [];
		var ffld="";
		var fflddesc="";
		var pp="";
		if (f.properties){
			pop=getPopup(f);
			l.bindPopup(pop);
 		}
    }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geovacc.addData(data);	});
	   function style(feature) {
		var ffld= vaccineData[feature.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
		f=ffld/100;		
 		 return {
	           opacity:1,
	           fillOpacity:f, 
	           weight:.6,
	           color: '#000',
	           fillColor: '#006600' 
	       };
	} 

}

function dofld(){  

	var isfld=document.getElementById('chkfld').checked; 
 	try {MapdefMap.removeControl(geofld);}catch(err){} 
 	if (!isfld) 		return;
 	dopic('picfld');
    geofld = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
		var out = [];
		var ffld="";
		var fflddesc="";
		var pp="";
		if (f.properties){
			pop=getPopup(f);
			l.bindPopup(pop);
 		}
    }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geofld.addData(data);	});
	   function style(feature) {
	 	var ffld= countyfld[feature.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
	 	if (ffld==undefined) ffld=1;
 		 return {
	           opacity:1,
	           fillOpacity:ffld/50, 
	           weight:.6,
	           color: '#000',
	           fillColor: '#000066' 
	       };
	} 
}

function docovid(){ 
	var iscovid=document.getElementById('chkcovid').checked; 
 	try {MapdefMap.removeControl(geocovid);}catch(err){} 
 	if (!iscovid) 		return;
 	dopic('piccovid');
    geocovid = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
		var out = [];
		var ffld="";
		var fflddesc="";
		var pp="";
		if (f.properties){
			pop=getPopup(f);
			l.bindPopup(pop);
 		}
    }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geocovid.addData(data);	});
	   function style(feature) { 
   	 	var fcnt= CountyCount[feature.properties['COUNTY'].toUpperCase().trim()];
		console.log('fcounty:'+feature.properties['COUNTY'].toUpperCase().trim());
		console.log('fcnt:'+fcnt);
       	if (fcnt==null || fcnt==undefined || fcnt=='undefined' || fcnt=='') fcnt=0;
       	var fillOp=0.1;
       	if (fcnt<5000) fillOp=0.1;
      	else if (fcnt<10000) fillOp=0.2;
      	else if (fcnt<20000) fillOp=0.4;
    	else if (fcnt<40000) fillOp=0.6;
    	else fillOp=0.8;
		 return {
	           opacity:1,
	           fillOpacity:fillOp, 
	           weight:.6,
	           color: '#000000',
	           fillColor: '#FFFF00' 
	       };
	} 

}

function donri(){  
	var isnri=document.getElementById('chknri').checked; 
 	try {MapdefMap.removeControl(geonri);}catch(err){} 
 	if (!isnri) 		return;
 	dopic('picnri');
    geonri = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
		var out = [];
		var ffld="";
		var fflddesc="";
		var pp="";
		if (f.properties){
			pop=getPopup(f);
			l.bindPopup(pop);
 		}
    }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geonri.addData(data);	});
	   function style(feature) {
	 	var fnri= countynri[feature.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
	 	if (fnri==undefined) fnri=1;
 		 return {
	           opacity:1,
	           fillOpacity:fnri/25, 
	           weight:.6,
	           color: '#000',
	           fillColor: '#800080' 
	       };
	} 
}

function doOutages(){
 	var ischkpower=document.getElementById('chkoutage').checked; 
 	try {MapdefMap.removeControl(geopower);}catch(err){} 
 	if (!ischkpower) 		return;
  	
 	dopic('picpow');
 	geopower = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
    		var out = [];
    		var ffld="";
    		var fflddesc="";
    		var pp="";
    		if (f.properties){
    			pop=getPopup(f);
    			l.bindPopup(pop);
     		}
        }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geopower.addData(data);	});
	   function style(feature) {
	 	var fpop=0;
	 	var fillc='#ff7600';
	  	var foutagejson= outageData[feature.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
	 	if (foutagejson==undefined) { fpop=0; fillc="#ffffff";}
	 	else fpop=foutagejson.Customer_outage;
	 	return {
	           opacity:1,
	           fillOpacity:fpop/30+0.2, 
	           weight:.6,
	           color: '#000',
	           fillColor:  fillc
	       };
	} 


}


function dopop(){
	  
	var ispop=document.getElementById('chkpop').checked; 
 	try {MapdefMap.removeControl(geopop);}catch(err){} 
 	if (!ispop) 		return;
 	dopic('picpop');
    	geopop = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
    		var out = [];
    		var ffld="";
    		var fflddesc="";
    		var pp="";
    		if (f.properties){
    			pop=getPopup(f);
    			l.bindPopup(pop);
     		}
        }}).addTo(MapdefMap);
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA') return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geopop.addData(data);	});
	   function style(feature) {
	 	var fpop= countypop[feature.properties['COUNTY'].toUpperCase().replace("COUNTY","").trim()]; 
	 	if (fpop==undefined) fpop=1;
 		 return {
	           opacity:2,
	           fillOpacity:fpop/200000, 
	           weight:.7,
	           color: '#000',
	           fillColor: '#ff7600' 
	       };
	} 

}


 
function doSite(){ 


	
	var issitesite=document.getElementById('sitesite').checked; 
	
	if (siteMar!=null) { 
		for (var k=0;k<siteMar.length;k++) {
			MapdefMap.removeLayer(siteMar[k]);
		}
		siteMar=[];
	}
 	if (issitesite){
 	dopic('picsupp');
	var uri="data/dayone.json"; 
	var vwIcon = L.icon({
		iconUrl : 'images/icons/ORI-Icons-supplier.png',
		iconSize : [15,15],
	}); 

		 $.getJSON(uri, function( data ) {
			 var js=data.rows; 
			 for (var k=0;k<js.length;k++) { 
					 var lat=js[k].latitude;
					 var long=js[k].longitude;
					 var address=js[k].address;
					 var county=js[k].county; 
			
					 if (!(lat>=MINLAT && lat<=MAXLAT && long>=MINLON && long<=MAXLON))	
						 continue
				 var f = L.marker([ lat,long ], {
		 				icon : vwIcon 
		 			}); 
					f.bindPopup(address+"<br />" +county+" County");  
				 	
					f.on('mouseover', function (e) { 
		            this.openPopup();
					});
					f.on('mouseout', function (e) {
		            this.closePopup();
					});
					f.addTo(MapdefMap);
					siteMar.push(f);
				  
			 }
			 
		 }); 
		 
	} 
}

function dovenues(){ 
	
	var ischkevenue=document.getElementById('chkevenue').checked; 
	
	if (venMart!=null) { 
		for (var k=0;k<venMart.length;k++) {
			MapdefMap.removeLayer(venMart[k]);
		}
		venMart=[];
	}
 	if (ischkevenue){
 		dopic('picven');
 		//var uri="data/ncallvenues.json"; 
 		var uri="data/ncparkchurch.json"; 
	var vwIcon = L.icon({
		iconUrl : 'images/icons/ORI-Icons-'+venue.toLowerCase()+'.png',
		iconSize : [15,15],
	}); 
 		
		 $.getJSON(uri, function( data ) {
			 console.log(data);
			 var js=data.rows; 
			 console.log(js);
			 console.log(js.length);
		 	 for (var k=0;k<js.length;k++) {
					var county=js[k].county.toUpperCase().replace("COUNTY, NORTH CAROLINE").trim();
					var name=js[k].name;
					var lat=js[k].lat;
					var long=js[k].lng;
					//var vtype=js[k].vmaintype;
					//var atype=js[k].maintype;
					var vtype=js[k].vtype;
					var atype=js[k].gtype;
					console.log(curview+selectedcounty+county+":"+atype+","+venue+":");
					if (atype==undefined || atype.toUpperCase()!=venue.toUpperCase())
						continue;
			 		
					if (curview=='state' || selectedcounty=='' || selectedcounty=='ALL' || selectedcounty.toUpperCase()==county) {
	 	 								 
		 			var f = L.marker([ lat,long ], {
		 				icon : vwIcon 
		 			}); 
					f.bindPopup(name.toUpperCase().trim()+"<br />"+county.toUpperCase().replace(", NORTH CAROLINE").trim()+"<br />"+vtype.toUpperCase());  
				 	
					f.on('mouseover', function (e) { 
		            this.openPopup();
					});
					f.on('mouseout', function (e) {
		            this.closePopup();
					});
					f.addTo(MapdefMap);
					venMart.push(f);
			   }
				 }
			 
			 
		 }); 
		 
	}


}


function doAirport(){

	
	var issiteairport=document.getElementById('siteairport').checked; 
	
	if (airMar!=null) { 
		for (var k=0;k<airMar.length;k++) {
			MapdefMap.removeLayer(airMar[k]);
		}
		airMar=[];
	}
 	if (issiteairport){
 		dopic('picair'); 
 		//var uri="data/airport.json"; 
 		var uri="data/all_airport.json"; 
	var vwIcon = L.icon({
		iconUrl : 'images/icons/ORI-Icons-airportloc.png',
		iconSize : [15,15],
	}); 

		 $.getJSON(uri, function( data ) {
			 var js=data.rows; 
			 for (var k=0;k<js.length;k++) {
		 		 /* var lat=js[k].latitude;  var long=js[k].longitude; 	 var address=js[k].address; */
			 		
				 if (js[k]['doc'] && js[k]['doc']['geo']&& js[k]['doc']['address'] && js[k]['doc']['geo']['geometry']) {
	 				var address=js[k]['doc']['address'];
	 				var long=js[k]['doc']['geo']['geometry']['coordinates'][0];
	 				var lat=js[k]['doc']['geo']['geometry']['coordinates'][1]; 

			 if (lat>=MINLAT && lat<=MAXLAT && long>=MINLON && long<=MAXLON) {
										 
				 var f = L.marker([ lat,long ], {
		 				icon : vwIcon 
		 			}); 
					f.bindPopup(address);  
				 	
					f.on('mouseover', function (e) { 
		            this.openPopup();
					});
					f.on('mouseout', function (e) {
		            this.closePopup();
					});
					f.addTo(MapdefMap);
					airMar.push(f);
			   }
				 }
			 }
			 
		 }); 
		 
	}

}

function doHospital(){
	
	var issitehospital=document.getElementById('sitehospital').checked; 
	
	if (hosMar!=null) { 
		for (var k=0;k<hosMar.length;k++) {
			MapdefMap.removeLayer(hosMar[k]);
		}
		hosMar=[];
	}
 	if (issitehospital){
 	dopic('pichos');
	var uri="data/hospital.json"; 
	var vwIcon = L.icon({
		iconUrl : 'images/icons/ORI-Icons-hospital.png',
		iconSize : [15,15],
	}); 

		 $.getJSON(uri, function( data ) {
			 var js=data.rows; 
			 for (var k=0;k<js.length;k++) {
				 var state=js[k].state;
				 if (state.toUpperCase()=='NORTH CAROLINA') {
					 var lat=js[k].latitude;
					 var long=js[k].longitude;
					 var address=js[k].address;
					 var city=js[k].city;
					 var url=js[k].website;
					 if (!(lat>=MINLAT && lat<=MAXLAT && long>=MINLON && long<=MAXLON))	
						 continue;
					 
				 var f = L.marker([ lat,long ], {
		 				icon : vwIcon 
		 			}); 
					f.bindPopup(address+"<br />" +city+"<br /><a href='"+url+"'>"+url+"</a>");  
				 	
					f.on('mouseover', function (e) { 
		            this.openPopup();
					});
					f.on('mouseout', function (e) {
		            this.closePopup();
					});
					f.addTo(MapdefMap);
					hosMar.push(f);
				 }
			 }
			 
		 }); 
		 
	}
}




function dotoggle(p) {
	  var x = document.getElementById(p);
	  var xshow = document.getElementById(p+"expand");
	   if (x.style.display === "none") {
		    x.style.display = "";
		    xshow.style.display = "none";
	  } else {
		    x.style.display =  "none";
		    xshow.style.display =  "";
			  }
	} 


function statecounty(sel){
	if (curview==sel)
		return;
	if (selectedcounty=='' || selectedcounty=='ALL')
		alert("Please select a county");
	else {
	var st= document.getElementById('statebtn');
	var cnty= document.getElementById('countybtn');
	st.classList.remove('selbutton');
	st.classList.remove('deselbutton');
	cnty.classList.remove('selbutton');
	cnty.classList.remove('deselbutton');
 		if (sel=='state'){
			st.classList.add('selbutton');
			cnty.classList.add('deselbutton'); 
			document.getElementById("countydata").style.display =  "none";
			document.getElementById("sit").style.display =  "none";
			document.getElementById("sitexpand").style.display =  "";
			MapdefMap.setView([ 35, -80 ], 7, {
				animate : true
			}); 	
			try {MapdefMap.removeControl(geocnty);}catch(err){} 
			dosvi(false);donri();dofld(); dopop();docovid();doVaccination(); doOutages();

			MINLAT = 33.4;
			MAXLAT = 36.5;
			MINLON = -84;
			MAXLON = -75.5;
				
			doSite();
			doAirport();
			doHospital();
			doelevation();
			
			curview='state';
			document.getElementById("county").selectedIndex=0;
			} else{
			st.classList.add('deselbutton');
			cnty.classList.add('selbutton');
			document.getElementById("countydata").style.display =  "";
			document.getElementById("sit").style.display =  "none";
			document.getElementById("sitexpand").style.display =  "none";
			countymap();
			curview='county';
			
	 	}
	}
}



function docounty(county){
 	selectedcounty=county;
 	if (selectedcounty=='' || selectedcounty=='ALL')
 		return;
	document.getElementById('countyname').innerHTML=county+" County";
	document.getElementById('cdcsvi').innerHTML=countysvi[county.toUpperCase().replace("COUNTY","").trim()];
	document.getElementById('femanri').innerHTML=countynri[county.toUpperCase().replace("COUNTY","").trim()];
	document.getElementById('femanrirating').innerHTML=' ('+countynridesc[county.toUpperCase().replace("COUNTY","").trim()]+')';
	document.getElementById('floodindex').innerHTML=countyfld[county.toUpperCase().replace("COUNTY","").trim()];
	document.getElementById('floodindexrating').innerHTML=' ('+countyflddesc[county.toUpperCase().replace("COUNTY","").trim()]+')';
	var popp=countypop[county.toUpperCase().replace("COUNTY","").trim()];
	if (popp==undefined) popp='-';
	else popp=popp.replace(".00","");
	document.getElementById('population').innerHTML=popp;
	document.getElementById('populationdensity').innerHTML=countyareaden[county.toUpperCase().replace("COUNTY","").trim()]+' per Sq Mile';
	document.getElementById('vaccinated').innerHTML=vaccineData[county.toUpperCase().replace("COUNTY","").trim()]+' %';
  	var fpop=0;
  	var foutagejson= outageData[county.toUpperCase().replace("COUNTY","").trim()]; 
 	if (foutagejson==undefined) fpop=0;
 	else fpop=foutagejson.Customer_outage; 
	document.getElementById('outages').innerHTML=fpop; 
	if (curview=='county') {countymap();}
}

function countymap(){   
 	try {MapdefMap.removeControl(geosvi);}catch(err){} 
 	try {MapdefMap.removeControl(geonri);}catch(err){} 
	try {MapdefMap.removeControl(geofld);}catch(err){} 
	try {MapdefMap.removeControl(geocnty);}catch(err){} 
	try {MapdefMap.removeControl(geopop);}catch(err){} 
	try {MapdefMap.removeControl(geovacc);}catch(err){} 
	try {MapdefMap.removeControl(geocovid);}catch(err){} 
	try {MapdefMap.removeControl(geopower);}catch(err){} 
	
	var sMINLAT;
	var sMAXLAT;
	var sMINLON;
	var sMAXLON;
 	geocnty = L.geoJson({features:[]},{filter: stateFilter,style:style, onEachFeature:function popUp(f,l) {
 		var len=Math.round(f.geometry['coordinates'][0].length/2);
 		lat=(f.geometry['coordinates'][0][0][1]+f.geometry['coordinates'][0][len][1])/2;
 		lon=(f.geometry['coordinates'][0][0][0]+f.geometry['coordinates'][0][len][0])/2; 
 	 	//MapdefMap.setView([ f.geometry['coordinates'][0][10][1], f.geometry['coordinates'][0][10][0]], 10, {
 	 	MapdefMap.setView([ lat, lon], 10, {
 	 	 				animate : true
		}); 
 	 	
 	 	
 	 	 sMINLAT= f.geometry['coordinates'][0][0][1];
 	 	 sMAXLAT=sMINLAT;
 	 	 sMINLON =f.geometry['coordinates'][0][0][0];
 	 	 sMAXLON = sMINLON;
  	 	 for (var x=0;x<f.geometry['coordinates'][0].length;x++){
 	 		 var lt=f.geometry['coordinates'][0][x][1];
 	 		 var ln=f.geometry['coordinates'][0][x][0];
	 		 if (lt>sMAXLAT) sMAXLAT=lt;
	 		 if (lt<sMINLAT) sMINLAT=lt; 
	 		 if (ln>sMAXLON) sMAXLON=ln;
	 		 if (ln<sMINLON) sMINLON=ln;  	 	 
	 		 }

 		MINLAT = sMINLAT;
 		MAXLAT = sMAXLAT;
 		MINLON = sMINLON;
 		MAXLON = sMAXLON;
 	 

    	 }}).addTo(MapdefMap);
 		
	
	
	setTimeout(function(){ 
	doSite();
	doAirport();
	doHospital();
	doelevation(); }, 3000);
	
 
     
     function stateFilter(feature) {
     	  if (feature.properties.STATE === 'NORTHCAROLINA' && feature.properties.COUNTY===selectedcounty) return true
    	} 
     var base = 'data/us14.zip';
     shp(base).then(function(data){    	 geocnty.addData(data);	});
	   function style(feature) {
		var f= 0.1
 		 return {
	           opacity:1,
	           fillOpacity:f, 
	           weight:.8,
	           color: '#000',
	           fillColor: '#0000ff' 
	       };
	}  
}



function doelevation(){

	 var colrs=['#f7e1e8','#f7d0dd','#f1a5d0','#e284ba','#bd2561','#66032a' ];
 	var radius=200; 
  	var siz=2;
  	var iselevelev=document.getElementById('chkelev').checked; 
 	if (elevMar!=null) { 
		for (var k=0;k<elevMar.length;k++) {
			MapdefMap.removeLayer(elevMar[k]);
		}
		elevMar=[];
	}
 	if (iselevelev){ 
 		dopic('picelev');
 	for (i = 0; i < ncelevation.length; i++) { 
	      var place = ncelevation[i][0];
	      var placetype = ncelevation[i][1];
	      var placecounty = ncelevation[i][2];
		  var lat = ncelevation[i][3];
 	      var long = ncelevation[i][4];
 	      var elev = ncelevation[i][5];
 	      
		 if (!(lat>=MINLAT && lat<=MAXLAT && long>=MINLON && long<=MAXLON))	
				 continue;

 	      var colr=colrs[0];
 	      if (elev >= 2000 ) { colr=colrs[5];  siz=6;}
 	      else if (elev >= 1000) { colr=colrs[4];  siz=4;}
 	      else if (elev >= 100) { colr=colrs[3]; siz=3;}
 	      else colr=colrs[2];
 	  	  
 	      var f = L.circle([lat, long],  radius, {
			    color: colr,
			    opacity: 0.9,
			    weight : 1,
			    fillColor: colr,
			    fillOpacity: 0.7 
			});
	 	     
	 	    
 		f.bindPopup(""+ place +", "+placecounty+" County <br />:("+ placetype + ")<br />Elevation:"+ elev + " Feet"); 
 		
 		f.on('mouseover', function (e) {
            this.openPopup();
        });
        f.on('mouseout', function (e) {
        this.closePopup();
        });
        f.addTo(MapdefMap); 
        elevMar.push(f);  
 	    }
 	}

}

function doTemp(){
 	var ischktemp=document.getElementById('chktemp').checked; 
	if (tempLayer!=null) { 
		for (var k=0;k<tempLayer.length;k++) {
			MapdefMap.removeLayer(tempLayer[k]);
		}
		tempLayer=[];
	}
	if (!ischktemp) return; 
	
	
	  for (var i=0;i<cityList.length;i++){ 
		 try {
		 var ctywhole = cityList[i].split('~'); 
		 var city=ctywhole[0];
		 var lat=ctywhole[1];
		 var long=ctywhole[2];
	 	 var cityd = cityData[i];
	 	 var iconurl=cityd['properties']['periods'][0].icon;
	 	 var temp=cityd['properties']['periods'][0].temperature;
		 var wind=cityd['properties']['periods'][0].windSpeed;
		 var forecast=cityd['properties']['periods'][0].shortForecast;
		 var txt='City:'+city+"<br />Current Temperature:"+	temp+" F<br />Windspeed "+wind+"<br />Forecast:"+forecast;
		
		 if ( forecast.toUpperCase().indexOf('SUNNY')>=0)
			 iconurl= 'images/icons/sunny.png';
		 else if ( forecast.toUpperCase().indexOf('CLOUDY')>=0)
			 iconurl= 'images/icons/cloudy.png';
		 else if ( forecast.toUpperCase().indexOf('RAIN')>=0)
			 iconurl= 'images/icons/rain.png';
		 else if ( forecast.toUpperCase().indexOf('THUNDER')>=0)
			 iconurl= 'images/icons/rain.png';//thunder doesn't look good
		 else if ( forecast.toUpperCase().indexOf('SHOWER')>=0)
			 iconurl= 'images/icons/rain.png';
		 else if ( forecast.toUpperCase().indexOf('CLEAR')>=0)
			 iconurl= 'images/icons/moon.png';
		
		  
		 	 var vwIcon = L.icon({
				iconUrl : iconurl,
				iconSize : [22,22],
			});
		 var f = L.marker([ lat,long ], {
 				icon : vwIcon 
 			}); 
			f.bindPopup(txt);
			f.bindTooltip('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+temp+' F', {permanent: true, 
				   direction: "center",
				   className: "my-labels"}).openTooltip();
			f.addTo(MapdefMap);
			tempLayer.push(f); 
		 }catch(err){}
	  }
}

function addNewStorms() {
 	var isstroms=document.getElementById('chkstorm').checked; 
 	if (strmLayer!=null) { 
		for (var k=0;k<strmLayer.length;k++) {
			MapdefMap.removeLayer(strmLayer[k]);
		}
		strmLayer=[];
	}
 	if (!isstroms) return; 
 		
	  for (var i=0;i<strmList.length;i++){
		  
		 var strm = strmList[i];
		  
		 var res= strmData[strm];
	 	 if (strm!=undefined && res!=undefined){
			 var e=[]
			  var geom =res.impacted.geometry.coordinates[0][0];
		      for (let i = 0; i < geom.length; i++) {
		    	 var gPoint = [];
		    	 gPoint.push(geom[i][1]);
		    	 gPoint.push(geom[i][0]); 
		     	 e.push(gPoint); 
              }
		        pathPolym = new L.polygon(e, {
                   color: "red",
                   fillColor:"yellow",
                   weight: 3,
                   opacity: 5,
                   smoothFactor: 1,
                   dashArray: "3,3",
                   clickable: 1
               }),
               pathPolym.bindPopup(strm); 
                pathPolym.addTo(MapdefMap);
		        strmLayer.push(pathPolym);
		 }
		 
	 }
}

function loadVaccineData(){
	var uri="https://data.cdc.gov/resource/8xkx-amqh.json?recip_state=NC";
	 $.getJSON(uri,
				function(response) { 
	 		  	for (var i=0;i<101;i++){
	 		  		var cnty=response[i].recip_county;
	 		  		cnty=cnty.replace("County","").toUpperCase().trim()
	 		  		var completeness_pct=response[i].series_complete_pop_pct;
	 		 		vaccineData[cnty]=completeness_pct;
	 		  	
	 		 	}
	 	  	 	});
}


async function saveTemps() { 
	var promises = [];
	  $.getJSON('data/nctemp.json',
			function(response) { 
		  	var js=response.rows;  
 		 	 for (var k=0;k<js.length;k++) {
 				var city=js[k].city; 
 				var lat=js[k].lat; 
 				var lng=js[k].lng; 
 				var apiurl=js[k].apiurl; 
 				cityList.push(city+'~'+lat+'~'+lng);
 				$.getJSON(apiurl,
 					function(response,request) { 
 					promises.push(response);
 					cityData.push(response); 
 					console.log(response); 
 				}); 
 			}
 					
 		 	});
	 const prom = await Promise.all(promises); 
	
}

async function saveStorms() { 
		var date = new Date();
		var last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
		var day = last.getDate();
		var month = last.getMonth() + 1;
		var year = last.getFullYear();
		var sday = day < 10 ? "0" + day : "" + day;
		var smonth = month < 10 ? "0" + month : "" + month;
		sday = year + "-" + smonth + "-" + sday;
		var url="/api/riskevents/storm/"+sday+"/relevant/N";
		var promises = [];
		 $.getJSON(url,
				function(response) { 
	 		 	var js=response.rows;  
	 			 for (var k=0;k<js.length;k++) {
	 				var strm=js[k]; 
	 				strmList.push(strm)
	 				$.getJSON("/api/riskevents/storm/all/"+strm,
	 					function(response,request) { 
	 					promises.push(response);
	 					strmData[response._id]=response; 
	 					console.log(response); 
	 				}); 
	 			}
	 					
	 		 	});
		 const prom = await Promise.all(promises); 
 	}


 


function initCovid(){ $.ajax({
    url: "/api/corona/county",
}).done(function(data) { 
	  	 var records = data.data; 
	     for(var k=0;k<records.length;k++) 
		 {  
	    	var province = records[k].state; 
	    	if (province==null || province=='undefined') province = records[k].province;
			if (selstate.toLowerCase()!=province.toLowerCase()) continue;
		      		var country = records[k].country;
			    	var lat = records[k].latitude;
			    	var longt = records[k].longitude;
			    	var county = records[k].county;
			    	var city = records[k].city;
			    	 if (city==null || city=='undefined') city=records[k].province
					 	if (province==null || province=='undefined') province='';
			    		 	 	
			    	if (county==null || county=='undefined') county='';
			    	if (city==null || city=='undefined') city=''; 
			    	var tg="County";
			    	if (county=='') {
			    		tg="City";
			    		county=city;} 
			     		
			    	var confirmed = records[k].confirmed_cases;
			    	if (confirmed==undefined || confirmed==null || confirmed=='undefined')
			    		confirmed = records[k].confirmed;
			    	if (confirmed==undefined || confirmed==null || confirmed=='undefined')
			    		confirmed =0;
			    	var deaths = records[k].deaths;
			    	var recoverd = records[k].recoverd; 
			    	if (province=='') continue;
			    	if (county=='') continue; 
			    	
					var strInfoTxt = "<table><tr><td><b>State</b></td><td>"+province+"</tr><tr><td><b>"+tg+"</b></td><td>"+county+"</tr><tr><td><font color=#000066><b>Confirmed&nbsp;&nbsp;</b></font></td><td><font color=#000066><b>"+confirmed+"</b></font></tr></table>";
					CountyCount[county.replace("County","").toUpperCase().trim()]=confirmed;
					CountyTxt[county.replace("County","").toUpperCase().trim()]=strInfoTxt;
		 }

});
	
}

function todo(){
	alert("coming soon");
}


function dopic(id){ } 

function dopicreplaces(id){
 	 var elem=document.getElementById(id);
	 var origsrc=elem.src;
	 elem.src='images/loading.gif'; 
	 setTimeout(
				function() {
					elem.src=origsrc;
		}, 1500);
	  
 }
