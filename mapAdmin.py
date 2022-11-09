import requests
# response = requests.get("http://localhost:3000/")
# print(response)

response = requests.get("http://localhost:3000/")
print(response)

# resetStrand = requests.get("http://localhost:3000/mapName/reset/strand")
# print(resetStrand)


resetMap = requests.get("http://localhost:3000/mapName/reset/strand")
print(resetStrand)