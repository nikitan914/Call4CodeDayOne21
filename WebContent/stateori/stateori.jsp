<%@ page import="java.util.*, java.text.DecimalFormat"%> 
<!-- Author: Nikita Nangia -->
<style>
 
.custom-popup .leaflet-popup-content-wrapper {
  background:#2c3e50;
  color:#fff;
  font-size:16px;
  line-height:24px;
  }
.custom-popup .leaflet-popup-content-wrapper a {
  color:rgba(255,255,255,0.5);
  }
.custom-popup .leaflet-popup-tip-container {
  width:30px;
  height:15px;
  }
.custom-popup .leaflet-popup-tip {
  border-left:15px solid transparent;
  border-right:15px solid transparent;
  border-top:15px solid #2c3e50;
  }
 
  </style>
  
<%
String[] ncounties={"Alamance", "Alexander", "Alleghany", "Anson", "Ashe", "Avery", "Beaufort", "Bertie", "Bladen", "Brunswick", "Buncombe", 
                    "Burke", "Cabarrus", "Caldwell", "Camden", "Carteret", "Caswell", "Catawba", "Chatham", "Cherokee", "Chowan", "Clay", "Cleveland",
                    "Columbus", "Craven", "Cumberland", "Currituck", "Dare", "Davidson", "Davie", "Duplin", "Durham", "Edgecombe", "Forsyth", "Franklin",
                    "Gaston", "Gates", "Graham", "Granville", "Greene", "Guilford", "Halifax", "Harnett", "Haywood", "Henderson", "Hertford",
                    "Hoke", "Hyde", "Iredell", "Jackson", "Johnston", "Jones", "Lee", "Lenoir", "Lincoln", "McDowell", "Macon", "Madison", "Martin", 
                    "Mecklenburg", "Mitchell", "Montgomery", "Moore", "Nash", "New Hanover", "Northampton", "Onslow", "Orange", "Pamlico", "Pasquotank",
                    "Pender", "Perquimans", "Person", "Pitt", "Polk", "Randolph", "Richmond", "Robeson", "Rockingham", "Rowan", "Rutherford", 
                    "Sampson", "Scotland", "Stanly", "Stokes", "Surry", "Swain", "Transylvania", "Tyrrell", "Union", "Vance", "Wake", "Warren", "Washington", "Watauga", "Wayne", 
					"Wilkes", "Wilson", "Yadkin", "Yancey"};
%> 

<!DOCTYPE html>
<html lang="en">
<head>
<title>IBM -Operations Risk Insights State Alerts</title>

<LINK href="http://www.ibm.com/us-en/" rel="canonical">
<meta charset="utf-8" />
<META name="robots" content="index,follow">
<META name="description" content=" Risk Insights States Dashboard">
<META name="keywords" content="IBM Risk Insights">
<META name="dcterms.date" content="2015-10-01">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="geo.country" content="US" />
<meta name="dcterms.rights" content="© Copyright IBM Corp. 2016" />
<meta name="generator" content="v18.1.0 IBM Template Generator" />
<meta name='viewport'
	content='initial-scale=1,maximum-scale=1,user-scalable=no' />

<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/d3-color/1.2.1/d3-color.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.js"></script>
<script src="//cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"
	type="text/javascript" charset="utf8"></script>

<script src="leaflet/leaflet.markercluster-src.js"></script>
<script src="leaflet/shp.min.js"></script>
<script src="js/datas.js"></script>
<script src="js/stateori.js"></script>
<script src="js/twc.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css" />
<link rel="stylesheet" type="text/css"
	href="//cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="css/stateori.css" />
<link rel="stylesheet" href="css/ibm.css" />
<link rel="stylesheet" href="leaflet/MarkerCluster.Default.css" />
<link rel="stylesheet" href="leaflet/MarkerCluster.css" />
 
</head>
<BODY class="ibm-type" id="ibm-com">
	<DIV class="ibm-landing-page" id="ibm-top">
		<!-- header -->
				 
		<DIV class="ibm-landing-page" id="ibm-top">
		<!-- MASTHEAD_BEGIN -->	 
		<DIV id="ibm-masthead" style="" role="banner" aria-label="IBM Operations Risk Insights - State Dashboard"> 
		<DIV id="ibm-universal-nav" style="background-color:black"><NAV aria-label="IBM Operations Risk Insights - State Dashboard">
		<DIV id="ibm-home">
		</DIV> 
		<DIV style="text-align:center;color:#ffffff; width:30px;height:40px;line-height: 40px;float:left; margin-top: 5px;">
		<a name="maptag" id="maptag"></a> 
		</DIV>
		<DIV style="color:#ffffff;width:1000px;height:40px;line-height: 40px;float:left; margin-top: 5px; font-size:16px;font-family:'IBM Plex Sans SemiBold'">
		 IBM Operations Risk Insights - State Dashboard</DIV>
		 <DIV style="text-align:center;color:#fff; height:40px;line-height: 40px;float:right; margin-top: 5px;margin-right:40px;font-size:14px;font-family:'IBM Plex Sans SemiBold'">
	 		</DIV>  
		</DIV></DIV>
 		<!-- header end -->
		
		
		<!-- MAIN PAGE WRAPPER AROUND LEADSPACE, MAIN CONTENT SIDENAV AND RELATED CONTENT -->

 

				<main aria-labelledby="ibm-pagetitle-h1">
				<div id="ibm-pcon">
					<div id="ibm-content">
						<div id="ibm-content-body">
							<div id="ibm-content-main" class="custom_alerts ibm-columns c11" style="background-color:#000">
								<div style="background-color:#fff; float: left; width: 25%; height: 650px; border: 1px dotted #ddd; padding: 5px 5px 0px 5px; overflow-y: auto;">
							 	<br />
								<table style="width: 100%">
									<tr>
										<td style="width: 5%">
										<td style="width: 30%"><label class="plainbold">Select
												State</label></td>
										<td style="width: 65%">
										 		<select id="state" style="width: 200px;height:30px;font-size:14px;background-color:#222;color:white">
												 	<option value="North Carolina" selected>North Carolina</option>
												</select>
							 			</td>
									</tr>
										<tr>
										<td style="width: 5%">
										<td style="width: 30%"><label class="plainbold">Select
												County</label></td>
										<td style="width: 65%">
										 		<select id="county" onchange="docounty(this.value)"  style="width: 200px;height:30px;font-size:14px;background-color:#222;color:white">
												 	<option value="ALL" selected>&nbsp;&nbsp;ALL</option>
												 	<% for (int i=0;i<ncounties.length;i++){
												 		out.println("<option value=\""+ncounties[i]+"\">&nbsp;&nbsp;"+ncounties[i]+"</option>");
												 	} %>
												</select> 
										</td>
									</tr> 
								</table>
								<div style="text-align: center">
				 				<button id="statebtn" class="selbutton" onclick="statecounty('state')">State View</button>
								<button id="countybtn" class="deselbutton"  onclick="statecounty('county')">County View</button>
						 		<br />
								</div>
								<table style="width: 100%">
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">15-Day Forecast<input id="chkforecast" type="checkbox" onclick="loadAllProductData()"><span class="checkmark"></span></label></td>
										<td width="20%"><img id="pic15day" class="mypic" src="images/icons/ORI-Icons-stormalert.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Tropical Cyclones<input id="chkstorm" type="checkbox" onclick="addNewStorms()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" src="images/icons/ORI-Icons-storms.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Current Temperatures
							 			<input id="chktemp" type="checkbox" onclick="doTemp()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" src="images/icons/ORI-Icons-temperature.png" width="20px" height="20px" /></td> 
									</tr> 
								<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Alerts<input id="chkalerts" type="checkbox" onclick="loadAlerts()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" src="images/icons/ORI-Icons-severeweather.png" width="20px" height="20px" /></td> 
									</tr> 
									</table>
									<br />
									<div id="poe" style="display:none">
									<table style="width: 100%">
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="bigplain" style="font-size:16px;padding-left: 1px;margin-bottom: 12px;">Points of Interest</label></td>
										<td width="20%"><img class="mypic" src="images/icons/down.png" width="20px" height="20px"  onclick="dotoggle('poe');"  /></td>
					 				</tr>
					 				</table>
					 				</div>
					 				<div id="poeexpand">
									<table style="width: 100%">
									<tr><td style="width: 5%"><td style="width: 75%"><label class="bigplain" style="font-size:16px;padding-left: 1px;margin-bottom: 12px;">Points of Interest</label></td>
									<td width="20%"><img class="mypic" src="images/icons/up.png" width="20px" height="20px" onclick="dotoggle('poe');" /></td>
					 				</tr> 
					 				 <tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Locations<input  id="sitesite" type="checkbox" onclick="doSite()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picsupp" src="images/icons/ORI-Icons-supplier.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Airport<input id="siteairport" type="checkbox" onclick="doAirport()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picair" src="images/icons/ORI-Icons-airportloc.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Hospitals<input id="sitehospital" type="checkbox" onclick="doHospital()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="pichos" src="images/icons/ORI-Icons-hospital.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Elevation<input   id=chkelev type="checkbox"  onclick="doelevation()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picelev" src="images/icons/ORI-Icons-elevation.png" width="20px" height="20px" /></td> 
									</tr> 
									
										<tr>
										<td style="width: 5%">
												<td style="width: 95%; padding-top:15px" colspan="2" >
												<table><tr><td style="width: 50%">
												<label class="checkcont">Venues<input   id=chkevenue type="checkbox"  onclick="dovenues()"><span class="checkmark"></span></label>
												<img src='images/c.gif' border=1 width="20px" height="20px" id="picven"></td><td>
							 					<select id="venue" onchange="venue=this.value;dovenues();" style="width: 150px;height:30px;font-size:14px;background-color:#222;color:white">
												 <option value="Church" selected>&nbsp;&nbsp;Church</option>
											 	<option value="Park">&nbsp;&nbsp;Park</option>
											 	<option value="School">&nbsp;&nbsp;School</option>
												</select></td></tr>
												</table>
												
										</td></tr> 
							
									</table> 
					 				</div>
					 					 
					 		 		<div id="sit"  style="display:none">
									<table style="width: 100%">
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="bigplain" style="font-size:16px;padding-left: 1px;margin-bottom: 12px;">Situational Awareness</label></td>
										<td width="20%"><img class="mypic" src="images/icons/down.png" width="20px" height="20px" onclick="dotoggle('sit');"/></td>
					 				</tr>
					 				</table>
					 				</div>
					 				<div id="sitexpand">
									<table style="width: 100%">
									<tr><td style="width: 5%"><td style="width: 75%"><label class="bigplain" style="font-size:16px;padding-left: 1px;margin-bottom: 12px;">Situational Awareness</label></td>
									<td width="20%"><img class="mypic" src="images/icons/up.png" width="20px" height="20px" onclick="dotoggle('sit');"/></td>
					 				</tr> 
					 				 <tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">CDC- SVI<input id="chksvi" type="checkbox" checked="checked" onclick="dosvi()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picsvi" src="images/icons/ORI-Icons-svi.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">FEMA - NRI<input  id="chknri" type="checkbox"  onclick="donri()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picnri"  src="images/icons/ORI-Icons-nri.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">FEMA - Flood Index<input   id="chkfld" type="checkbox"  onclick="dofld()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picfld"  src="images/icons/ORI-Icons-flood.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Population<input   id="chkpop" type="checkbox"  onclick="dopop()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picpop"  src="images/icons/ORI-Icons-pop.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">COVID<input   id="chkcovid" type="checkbox"  onclick="docovid()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="piccovid"  src="images/icons/ORI-Icons-cmt.png" width="20px" height="20px" /></td> 
									</tr> 
										<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Power Outages 
										<input   id=chkoutage type="checkbox"  onclick="doOutages()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picpow" src="images/icons/ORI-Icons-power.png" width="20px" height="20px" /></td> 
									</tr> 
									<tr>
										<td style="width: 5%">
										<td style="width: 75%"><label class="checkcont">Vaccination
										<input   id="chkvacc" type="checkbox"  onclick="doVaccination()"><span class="checkmark"></span></label></td>
										<td width="20%"><img class="mypic" id="picvacc"  src="images/icons/ORI-Icons-vaccination2.png" width="20px" height="20px" /></td> 
									</tr> 
								
									</table> 
									<br /><br />
					 				</div>
					 				
					 				
					 				<div id="countydata" style="display:none">
					 				<br />
									<table style="width: 100%;background-color:#eee;">
									<tr><td style="width: 5%;background-color:#ccc;"><td style="width: 95%;background-color:#ccc" colspan="2"><label  id="countyname" class="bigplain" style="font-size:16px;padding-left: 1px;margin-bottom: 12px;">county</label></td>
								 	</tr> 
					 				 <tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;"><label>CDC- SVI</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="cdcsvi"></label></td> 
									</tr> 
										<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;"><label>FEMA NRI</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="femanri"></label>&nbsp;&nbsp;<label  id="femanrirating"></label></td>
									</tr>
									 
									<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;" nowrap><label>Flood Index</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="floodindex"></label>&nbsp;&nbsp;<label  id="floodindexrating"></label></td>
									</tr>
									 									<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;"><label>Population</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="population"></label></td>
									</tr>
									<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;" nowrap><label>Pop. Density</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="populationdensity"></label></td>
									</tr>		 
									<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;"><label>Vaccinated</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="vaccinated"></label></td>
									</tr>		 
									<tr>
										<td style="width: 5%">
										<td style="width: 20%;background-color:#eee;padding-right:5px;" nowrap><label>Power Outages</label></td>
										<td style="width: 75%;background-color:#eee;padding-right:5px;"><label  id="outages"></label></td>
									</tr>		 
									</table> 
									<br /><br /><br />
					 				</div> 
					 				
				 					</div>
							 		<div id="chartview2"
									style="float: left; width: 75%; border: 1px dotted #ddd;">
									<div  id="worldmap" class="c5 custom-popup" ></div>
						 		</div>
							</div>
						</div>
					</div>
				</div>
				</main>


<!-- FOOTER_BEGIN -->
 	 	<div id="ibm-related-content">
			<div id="ibm-merchandising-module">
 			</div>
		</div>
	</div> 

	<footer role="contentinfo" aria-label="IBM">
		<div id="ibm-footer">
			<h2 class="ibm-access">Footer links</h2>
			<ul>
				<li><a href="//www.ibm.com/contact/us/en/">Contact</a></li>
				<li><a href="//www.ibm.com/privacy/us/en/">Privacy</a></li>
				<li><a href="//www.ibm.com/legal/us/en/">Terms of use</a></li>
				<li><a href="//www.ibm.com/accessibility/us/en/">Accessibility</a></li>
			</ul>
		</div>
	</footer>
	<!-- FOOTER_END -->
	</div>
	 </DIV>
</BODY>
</HTML>

