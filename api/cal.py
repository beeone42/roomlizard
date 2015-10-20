#!/usr/bin/env python
from pyexchange import Exchange2010Service, ExchangeNTLMAuthConnection
from datetime import datetime
from pytz import timezone
import pickle
import json

URL = u'https://owa.42.fr/EWS/Exchange.asmx'
USERNAME = u'STAFF.42.FR\\sb'
PASSWORD = u"mail42sh@"

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            encoded_object = list(obj.timetuple())[3:5]
        else:
            encoded_object =json.JSONEncoder.default(self, obj)
        return encoded_object


# Set up the connection to Exchange
connection = ExchangeNTLMAuthConnection(url=URL,
                                        username=USERNAME,
                                        password=PASSWORD)

service = Exchange2010Service(connection)

calendar_list = service.calendar().list_events(
    start=timezone("Europe/Paris").localize(datetime(2015, 10, 20, 0, 0, 0)),
    end=timezone("Europe/Paris").localize(datetime(2015, 10, 20, 23, 59, 59)),
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
