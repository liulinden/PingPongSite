import math,sys
from datetime import date
sys.stdin = open('input.txt', 'r')

def toDays(newer,olddate=date(2023,1,1)):
    return (newer-olddate).days

def cinput(msg=""):
    inp = input(msg)
    if len(inp) > 0 and inp[0]=='#':
        inp = cinput()
    return inp

data=[cinput().split('/')]

matches=[]
inp=cinput()
while inp!="end":
    match = inp.split('/')
    month=int(match[0])
    day=int(match[1])
    year=int(match[2])
    dateday=toDays(date(int(match[2]),int(match[0]),int(match[1])))
    matches.append([int(match[2]),int(match[0]),int(match[1]),dateday,match[3],match[4],match[5],int(match[6]),int(match[7])])
    inp=cinput()
data.append(matches)
print(data)