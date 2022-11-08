// Import dependencies
const express = require("express");
const useragent = require("useragent");
var cron = require('node-cron');
const app = express();


// If you change this remember to change it on the client side as well
const port = 80;

// Host the front end
app.use(express.static("client"));

// Start the server and initialize socket.io
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);

const mapNames = ["Strand", "Overgrown Ruin", "Terrace", "Frozen Cabins", "Moon Temple", "Crimson Temple", "Carcass", "Dark Forest", "Colosseum", "Bramble Valley", "Excavation", "Thicket", "Bone Crypt", "Museum", "Waterways", "Factory", "Cells", "Caldera", "Park", "Defiled Cathedral", "Atoll", "Shore", "Vaal Pyramid", "Phantasmagoria", "Primordial Pool", "Laboratory", "Dungeon", "Chateau", "Temple", "Crater", "Crimson Township", "Wharf", "Coral Ruins", "Mud Geyser", "Acid Caverns", "Shrine", "Overgrown Shrine", "Lava Chamber", "Jungle Valley", "Arachnid Tomb", "Plateau", "Dry Sea", "Spider Forest", "Necropolis", "Colonnade", "Arachnid Nest", "Lair", "Mausoleum", "Summit", "Fungal Hollow", "Wasteland", "Bog", "Ancient City", "Ghetto", "Maze", "Barrows", "Canyon", "Villa", "Residence", "Foundry", "Pier", "Dig", "Desert", "Underground River", "Cold River", "Stagnation", "Racecourse", "Gardens", "Leyline", "Alleyways", "Peninsula", "Arena", "Castle Ruins", "Belfry", "Precinct", "Cemetery", "Cursed Crypt", "Marshes", "Promenade", "Port", "Silo", "Arsenal", "Lava Lake", "Orchard", "Pen", "Sulphur Vents", "Underground Sea", "Plaza", "Mesa", "Armoury", "Ashen Wood", "Dunes", "Forking River", "Vault", "Grotto", "Arcade", "Waste Pool", "Grave Trough", "Ramparts", "Arid Lake"]
const mapMods = ["rogue", "strong", "invasion", "breach", "spirit", "harb", "deli", "beyond"]

function MapMaker(id, name) {
    this.id = id
    this.name = name
    this.mods = emptyMods
}

function ModMaker() {
    this.rogue = 0
    this.strong = 0
    this.breach = 0
    this.spirit = 0
    this.harb = 0
    this.deli = 0
    this.beyond = 0
}

function emptyMod() {
    return new ModMaker(0, 0, 0, 0, 0, 0, 0)

}

const originalMaps = [
    { votes: 0, label: "Strand", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Overgrown Ruin", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Terrace", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Frozen Cabins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Moon Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crimson Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Carcass", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dark Forest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Colosseum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bramble Valley", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Excavation", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Thicket", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bone Crypt", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Museum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Waterways", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Factory", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cells", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Caldera", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Park", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Defiled Cathedral", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Atoll", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Shore", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Vaal Pyramid", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Phantasmagoria", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Primordial Pool", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Laboratory", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dungeon", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Chateau", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crater", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crimson Township", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Wharf", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Coral Ruins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mud Geyser", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Acid Caverns", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Shrine", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Overgrown Shrine", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lava Chamber", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Jungle Valley", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arachnid Tomb", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Plateau", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dry Sea", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Spider Forest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Necropolis", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Colonnade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arachnid Nest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lair", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mausoleum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Summit", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Fungal Hollow", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Wasteland", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bog", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ancient City", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ghetto", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Maze", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Barrows", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Canyon", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Villa", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Residence", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Foundry", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Pier", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dig", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Desert", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Underground River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cold River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Stagnation", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Racecourse", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Gardens", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Leyline", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Alleyways", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Peninsula", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arena", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Castle Ruins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Belfry", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Precinct", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cemetery", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cursed Crypt", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Marshes", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Promenade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Port", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Silo", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arsenal", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lava Lake", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Orchard", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Pen", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Sulphur Vents", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Underground Sea", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Plaza", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mesa", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Armoury", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ashen Wood", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dunes", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Forking River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Vault", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Grotto", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arcade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Waste Pool", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Grave Trough", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ramparts", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arid Lake", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
]
let maps = [
    { votes: 0, label: "Strand", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Overgrown Ruin", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Terrace", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Frozen Cabins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Moon Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crimson Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Carcass", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dark Forest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Colosseum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bramble Valley", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Excavation", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Thicket", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bone Crypt", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Museum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Waterways", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Factory", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cells", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Caldera", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Park", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Defiled Cathedral", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Atoll", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Shore", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Vaal Pyramid", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Phantasmagoria", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Primordial Pool", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Laboratory", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dungeon", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Chateau", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Temple", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crater", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Crimson Township", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Wharf", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Coral Ruins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mud Geyser", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Acid Caverns", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Shrine", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Overgrown Shrine", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lava Chamber", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Jungle Valley", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arachnid Tomb", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Plateau", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dry Sea", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Spider Forest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Necropolis", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Colonnade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arachnid Nest", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lair", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mausoleum", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Summit", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Fungal Hollow", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Wasteland", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Bog", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ancient City", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ghetto", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Maze", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Barrows", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Canyon", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Villa", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Residence", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Foundry", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Pier", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dig", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Desert", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Underground River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cold River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Stagnation", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Racecourse", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Gardens", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Leyline", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Alleyways", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Peninsula", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arena", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Castle Ruins", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Belfry", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Precinct", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cemetery", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Cursed Crypt", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Marshes", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Promenade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Port", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Silo", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arsenal", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Lava Lake", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Orchard", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Pen", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Sulphur Vents", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Underground Sea", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Plaza", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Mesa", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Armoury", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ashen Wood", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Dunes", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Forking River", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Vault", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Grotto", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arcade", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Waste Pool", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Grave Trough", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Ramparts", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
    { votes: 0, label: "Arid Lake", rogue: 0, strong: 0, invasion: 0, breach: 0, spirit: 0, harb: 0, deli: 0, beyond: 0 },
]




// console.log(maps);


// All of the users
const users = {}

// Cool down in milliseconds
const coolDown = 500

// The magic number
const magicNumber = 25381238823847823427345

// On new client connection
io.on("connection", (socket) => {
    socket.emit("mapUpdate", maps);

    // Parse the user agent string
    const userAgent = useragent.parse(socket.handshake.headers["user-agent"]);

    // The users IP address
    const address = socket.handshake.address;

    // Make the handle
    const id = hash(userAgent.os.toString() + userAgent.device.toString() + magicNumber);
    const handled = hash(id + address + magicNumber);

    // On new vote
    socket.on("mapVote", (index, element, key) => {
        // console.log(index)
        // console.log(element)
        // console.log(key)
        // console.log("mapVote");
        // Check if the user is allowed to vote
        if (typeof users[handled] === "undefined" || typeof users[handled] !== "undefined" && users[handled] + coolDown <= Date.now()) {
            switch (key) {
                case "rogue":
                    if (maps[index]) {
                        maps[index].rogue += 1
                        maps[index].votes += 1
                    }
                    break
                case "strong":
                    if (maps[index]) {
                        maps[index].strong += 1
                        maps[index].votes += 1
                    }
                    break
                case "breach":
                    if (maps[index]) {
                        maps[index].breach += 1
                        maps[index].votes += 1
                    }
                    break
                case "spirit":
                    if (maps[index]) {
                        maps[index].spirit += 1
                        maps[index].votes += 1
                    }
                    break
                case "harb":
                    if (maps[index]) {
                        maps[index].harb += 1
                        maps[index].votes += 1
                    }
                    break
                case "deli":
                    if (maps[index]) {
                        maps[index].deli += 1
                        maps[index].votes += 1
                    }
                    break
                case "beyond":
                    if (maps[index]) {
                        maps[index].beyond += 1;
                        maps[index].votes += 1;
                    }
                    break
                case "invasion":
                    if (maps[index]) {
                        maps[index].invasion += 1;
                        maps[index].votes += 1;
                    }
                    break
            }

            // console.log(Object.entries(maps[index]))


            // Tell everybody else about the new vote
            io.emit("mapUpdate", maps);

            // Set the timestamp
            users[handled] = Date.now();
        }

    });
});

function copy(x) {
    return JSON.parse(JSON.stringify(x));
}

cron.schedule('* 1-4 * * *', () => {
    console.log('running a task every 10 seconds');
    io.emit("mapUpdate", originalMaps);
    maps = copy(originalMaps)
});


// Generate a random RGB color
function randomRGB() {
    const r = () => Math.random() * 256 >> 0;
    return `rgb(${r()}, ${r()}, ${r()})`
}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hash(s) {
    return s.split("").reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
}