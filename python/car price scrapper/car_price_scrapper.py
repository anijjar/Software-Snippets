#!/usr/bin/env python3
from bs4 import BeautifulSoup as bs # Parse html document
from requests import get # make html requests
import pandas as pd # analytics library
import time
import random
import os

names = []
hrefs = []
prices = []
locations = []

def export():
  cols = ["Name", "Price", "Location", "Link"]
  data = pd.DataFrame({"Name" : names, "Price" : prices, "Location": locations, "Link" : hrefs})[cols]
  # Clean up price field
  data["Price"] = data["Price"].replace({'\$ ':''}, regex = True)
  data["Price"] = data["Price"].replace({'\,':''}, regex = True)
  
  # Export to an xlsx file
  script_dir = os.path.dirname(os.path.realpath(__file__))
  output_path = os.path.join(script_dir, 'Car_list.xlsx')
  data.drop_duplicates().to_excel(output_path)

# end of export
  
def scrap_page(page):
  # confirmed this url is allowed under their robots.txt
  base_url = "https://vancouver.craigslist.org/search/cta#search=1~gallery~{}~0".format(page)
  r = get(base_url)
  soup = bs(r.text, 'html.parser')
  list_of_cars = soup.find_all('li', attrs={'class': 'cl-static-search-result'})
  for car in list_of_cars:
    names.append(car['title'])
    hrefs.append(car.find('a')['href'])
    # Extract the price by finding the 'div' with class 'price' and getting its text
    price_div = car.find('div', class_='price')
    prices.append(price_div.text.strip()) if price_div else prices.append(None)
    # Extract the location by finding the 'div' with class 'location' and getting its text
    location_div = car.find('div', class_='location')
    locations.append(location_div.text.strip()) if location_div else locations.append(None)
# end of scrap_page

def app():
  # Calculate the number of pages (hardcoded)
  page_count = 83 # 10,000 / 120 = 8.333
  # get data (keep it to 5 pages)
  for i in range(0, 5):
    scrap_page(i)
    print(f"got page {i}.")
    time.sleep(random.randint(1,2))
  # export to csv
  export()
# end of app
  
if __name__ == '__main__':
  app()