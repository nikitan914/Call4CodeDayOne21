import pandas as pd
import requests 
import json

#df_counties = pd.read_csv('Topcities.csv', encoding="utf-8")
df_counties = pd.read_csv('200nccities.csv', encoding="utf-8")
print(df_counties.head(2))
 
 
def getTemp(names, latitudes, longitudes, radius=2000):
    dfv= pd.DataFrame(columns = ['city','lat', 'lng','apiurl'])

    for name, lat, lng in zip(names, latitudes, longitudes):
        url='https://api.weather.gov/points/{},{}'.format(lat, lng ) 
        print(url)
        results = requests.get(url).json()['properties']
        try:
            apiurl=results['forecastHourly']
            print(apiurl)
            df2 = {'city':name,'lat':lat, 'lng':lng,'apiurl':apiurl}
            dfv = dfv.append(df2, ignore_index=True)
            print(df2)
        except:
            print("oops")

    return(dfv)




nctemps = getTemp(names=df_counties['city'],
                                   latitudes=df_counties['lat'],
                                   longitudes=df_counties['lng']
                                  )
nctemps.head()
nctemps.to_csv('200nccities_tempapi.csv') 




