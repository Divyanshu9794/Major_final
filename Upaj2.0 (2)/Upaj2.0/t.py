import sys
import json
# data = {
#     "n":sys.argv[1],
#     "p":sys.argv[2],
#     "k":sys.argv[3],
#     "rainfall":sys.argv[4],
#     "humidity":sys.argv[5],
#     "ph":sys.argv[6]
# }
data = "Rice"
resp = {
    "Response": 200,
    "Message": "Data from Python",
    "Data": "Rice"
}
print(json.dumps(resp))
sys.stdout.flush()
