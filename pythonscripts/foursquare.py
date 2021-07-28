import pandas as pd
import requests
import numpy as np
import json

#df_counties = pd.read_csv('uscounties.csv', encoding="utf-8")
df_nc = pd.read_csv('allnccities.csv', encoding="utf-8") 

df_nc = df_nc.apply(lambda x: x.astype(str).str.lower())
print(df_nc.head(2)) 
df_nc['address']=df_nc['city']+', '+df_nc['county_name']+' County, North Carolina'
print(df_nc)


CLIENT_ID = '1KC0CKO5AAE5DMOFHDPXWOOQOBLMN2T1YWMGTFMA5C5DSGCS' # your Foursquare ID
CLIENT_SECRET = 'TZAN5P5MEYJ54MV4UCQU0RK1K0UURYB5ACEGYCDJIUNCGRUM' # your Foursquare Secret
VERSION = '20191210' # Foursquare API version
radius=100000
LIMIT=100000

def getNearbyVenues(cities,counties, latitudes, longitudes, radius=2000):
    dfv= pd.DataFrame(columns = ['city','county','citylat', 'citylng','name',
                                   'lat','lng','vtype','gtype'])

    for city,county, lat, lng in zip(cities,counties, latitudes, longitudes):
        # create the API request URL
        url = 'https://api.foursquare.com/v2/venues/search?&client_id={}&client_secret={}&v={}&ll={},{}&radius={}&limit={}'.format(
            CLIENT_ID, 
            CLIENT_SECRET, 
            VERSION, 
            lat, 
            lng, 
            radius, 
            LIMIT)
            
        # make the GET request
        results = requests.get(url).json()["response"]["venues"] 
        for v in results:
            print(v)
            try:
                vtype=v['categories'][0]['name'];
                gtype='General';
                if vtype.upper().find("CHURCH")>=0:
                    gtype='CHURCH'
                if vtype.upper().find("TEMPLE")>=0:
                    gtype='CHURCH'
                if vtype.upper().find("SCHOOL")>=0:
                    gtype='SCHOOL'
                if vtype.upper().find("PARK")>=0:
                    gtype='PARK'
                if vtype.upper().find("GARDEN")>=0:
                    gtype='PARK'
                if vtype.upper().find("TRAIL")>=0:
                    gtype='PARK'
                
                    
                df2 = {'city':city,'county':county,'citylat':lat, 'citylng':lng,'name':v['name'],
                                   'lat':v['location']['lat'],'lng':v['location']['lng'],'vtype':vtype,'gtype':gtype}
                dfv = dfv.append(df2, ignore_index=True)

            except:
                    print("oops")

    return(dfv)




nc_venues = getNearbyVenues(cities=df_nc['city'],counties=df_nc['county_name'],
                                   latitudes=df_nc['lat'],
                                   longitudes=df_nc['lng']
                                  )
nc_venues.head()
nc_venues.to_csv('nc_allcities_venues.csv')
nc_venues.to_json('nc_allcities_venues.json')




