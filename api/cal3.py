#!/usr/bin/env python
import requests
from datetime import date,datetime
from pytz import timezone
import pickle
import json
import sys
from ics_parser import parse, parse_date

def read_config(confname):
    with open(confname) as json_data_file:
        data = json.load(json_data_file)
    return (data)

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            encoded_object = list(obj.timetuple())[3:5]
        else:
            encoded_object =json.JSONEncoder.default(self, obj)
        return encoded_object

config = read_config("config.json")

r = requests.get(config['URL'], auth=(config['USERNAME'], config['PASSWORD']))
r.encoding = 'ISO-8859-1'
ics = parse(r.text.encode('utf-8'));
#print ics

today = date.today().strftime('%Y%m%d')
#today = "20160526"
events = []
for i in ics:
    if (i['start'][0:8] == today):
        events.append({
            'start': parse_date(i['start']),
            'stop': parse_date(i['end']),
            'label': i['summary'],
            'author': i['organizer']
            })

tz = timezone('Europe/Paris')

print "Content-type: application/json"
print 
print(json.dumps(events, cls=DateTimeEncoder))
