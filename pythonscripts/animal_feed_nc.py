import requests
import json
import pandas as pd

url = "https://services2.arcgis.com/kCu40SDxsCGcuUWO/ArcGIS/rest/services/Animal_Feed_Operation_Permits_(View)/FeatureServer/0/query?where=PERMIT_STATUS%3D+%27ACTIVE%27&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=FACILITY%2CCOUNTY%2CTOTAL_LIVE_WEIGHT&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="
allData = json.loads(requests.get(url).text)
locationList = allData["features"]

finalData = []
 
for location in locationList:
    
    # append all of the information in the form of a dictionary
    finalData.append({
        "Facility Name":location['attributes']['FACILITY'],
        "County":location['attributes']['COUNTY'],
        "Live Weight":location['attributes']['TOTAL_LIVE_WEIGHT'],
        "Latitude":float(location['geometry']['y']),
        "Longitude":float(location['geometry']['x'])
    })


 
finalData = sorted(finalData, key=lambda e:e['County'])
# create dataframe
df = pd.DataFrame()
df = df.from_dict(finalData)

# print the first 10 entries in the dataframe
print(df)
#df.to_csv('ncanimal.csv')
#df.to_json('ncanimal.json')





