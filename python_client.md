Install python-osc: `sudo pip install python-osc`

Use it like this:
```
from pythonosc import udp_client

client = udp_client.SimpleUDPClient("wonkavator.shapiro", 9009)

client.send_message("/up", 42)
client.send_message("/down", 42)
```
