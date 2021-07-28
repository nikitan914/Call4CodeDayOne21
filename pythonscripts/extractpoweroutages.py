
import requests
from pandas.io.json import json_normalize
import pandas as pd
import urllib
import json
import io
from bs4 import BeautifulSoup
import json
from googletrans import Translator
import xml.etree.ElementTree as ET


### Extracting Power Outages for North Carolina

df_outage= pd.DataFrame(columns = ['State','County', 'latitude','longitude',
                                   'Power_company','Customers_total','Customer_outage'])

df_counties = pd.read_csv('uscounties.csv', encoding="utf-8")
df_counties = df_counties.apply(lambda x: x.astype(str).str.upper())
print(df_counties.head(2))

df_states = pd.read_csv('powerstate.csv', encoding="utf-8")
df_states = df_states.apply(lambda x: x.astype(str).str.upper())
print(df_states.head(2))

selstate="NC";

selstate=selstate.replace(',', '').upper()

df_selstate=  df_states[(df_states.STATE == selstate)]
print(df_selstate)
for index, row in df_selstate.iterrows(): 
    x=row['PAGE']
    try:
        urlnws="https://poweroutage.us/area/county/%s" % (x)
        print(urlnws)
        #urlnws = "http://localhost:8080/oridayone/county1.htm" 
        page = requests.get(urlnws)
        soup = BeautifulSoup(page.content, 'html.parser')
        #print('------------')
        #print(soup);
        county = soup.select('h1')[0].text.strip()
        print(county)
        
        sp=str(soup)
        s = sp.index('/area/state') +12 
        sp1 = sp[s:]
        s1 = sp1.index('>')-1
        state=sp1[:s1].upper()
        print(state)
        
 
        powerc = []
        text = []
        for div in soup.findAll('div',{'class':'col-md-5'}):
            powerc.append(div.text)
        for div in soup.findAll('div',{'class':'col-xs-4'}):
            text.append(div.text)
        print(powerc)
        print(text)
        
        powercompany=", ".join(powerc)
        customer=int(text[0].replace(',', ''))
        affected=int(text[1].replace(',', ''))
        
        lat=0
        lng=0
        print(state)
        print(county.upper())
        dflocation = df_counties[(df_counties.state_name == state) & (df_counties.county==county.upper())]
        print(dflocation)
        if not dflocation.empty:
            lat=dflocation['lat'].iloc[0]
            lng=dflocation['lng'].iloc[0]
            if customer>0 and affected>0:
                df2 = {'State':state,'County':county, 'latitude':lat,'longitude':lng,
                                           'Power_company':powercompany,'Customers_total':customer,'Customer_outage':affected}
                df_outage = df_outage.append(df2, ignore_index=True)
    except BaseException:
        raise
     
print(df_outage) 
