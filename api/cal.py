#!/usr/bin/env python
from pyexchange import Exchange2010Service, ExchangeNTLMAuthConnection
from datetime import date,datetime
from pytz import timezone
import pickle
import json

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

# Set up the connection to Exchange
connection = ExchangeNTLMAuthConnection(url=config['URL'],
                                        username=config['USERNAME'],
                                        password=config['PASSWORD'])

service = Exchange2010Service(connection)

y = date.today().year
m = date.today().month
d = date.today().day
calendar_list = service.calendar().list_events(
    start=timezone("Europe/Paris").localize(datetime(y, m, d, 0, 0, 0)),
    end=timezone("Europe/Paris").localize(datetime(y, m, d, 23, 59, 59)),
    details=True
)

events = []

tz = timezone('Europe/Paris')

for event in calendar_list.events:
    #print(pickle.dumps(event))
    #print pickle.dumps(event.start);

    e = {
        "start" : tz.normalize(event.start),
        "stop" : tz.normalize(event.end),
        "label" : event.subject,
        "author" : event.organizer
        }
    events.append(e)

print "Content-type: application/json"
print 
#print(json.JSONEncoder().encode(events))
print(json.dumps(events, cls=DateTimeEncoder))
