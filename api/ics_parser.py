#!/usr/bin/env python

def join_multiline(text):
    res = []
    curline = ''
    for s in text.split('\n'):
        if (s[0:1] == ' '):
            curline = ' '.join((curline, s.rstrip()))
        else:
            if (curline != ''):
                res.append(curline)
            curline = s.rstrip()
    return (res)

def parse(ics_text):
    res = []
    in_event = False
    sub_event = 0
    text = join_multiline(ics_text)
#    print '\n'.join(text)
    for t in text:
        if (in_event):
            if (t[0:6] == 'BEGIN:'):
                sub_event = sub_event + 1
            if (t == 'END:VEVENT'):
                in_event = False
                print 'stop event'
                res.append(ev)
            else:
                if (t[0:4] == 'END:'):
                    sub_event = sub_event - 1
            if (sub_event == 0):
                if (t[0:10] == 'ORGANIZER;'):
                    ev['organizer'] = t[10:].split('=')[1].split(':')[0].split(';')[0]
                    print 'organizer: %s' % ev['organizer']
                if (t[0:10] == 'ORGANIZER:'):
                    ev['organizer'] = t[10:].split(':')[1]
                    print 'organizer: %s' % ev['organizer']
                if (t[0:8] == 'SUMMARY:'):
                    ev['summary'] = t[8:]
                    print 'summary: %s' % ev['summary']
                if (t[0:7] == 'DTSTART'):
                    ev['start'] = t[7:].split(':')[1]
                    print 'start: %s' % ev['start']
                if (t[0:5] == 'DTEND'):
                    ev['end'] = t[5:].split(':')[1]
                    print 'end: %s' % ev['end']
        else:
            if (t == 'BEGIN:VEVENT'):
                in_event = True
                sub_event = 0
                print 'start event'
                ev = {}
    print res

if __name__ == "__main__":
    parse(open('ics_parser.ics').read())
