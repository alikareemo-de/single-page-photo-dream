// Country and city data for registration form
export interface Country {
  code: string;
  name: string;
  cities: string[];
}

export const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    cities: [
      "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
      "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
      "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis",
      "Seattle", "Denver", "Washington DC", "Boston", "Nashville", "Detroit",
      "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore",
      "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa", "Kansas City",
      "Atlanta", "Colorado Springs", "Virginia Beach", "Raleigh", "Omaha", "Miami",
      "Oakland", "Minneapolis", "Tulsa", "Cleveland", "Wichita", "New Orleans"
    ]
  },
  {
    code: "CA",
    name: "Canada",
    cities: [
      "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa",
      "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria",
      "Halifax", "Oshawa", "Windsor", "Saskatoon", "St. Catharines", "Regina",
      "Sherbrooke", "St. John's", "Barrie", "Kelowna", "Abbotsford", "Kingston",
      "Sudbury", "Saguenay", "Trois-Rivières", "Guelph", "Cambridge", "Whitby"
    ]
  },
  {
    code: "GB",
    name: "United Kingdom",
    cities: [
      "London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds",
      "Sheffield", "Edinburgh", "Bristol", "Cardiff", "Leicester", "Wakefield",
      "Coventry", "Nottingham", "Newcastle", "Sunderland", "Brighton", "Hull",
      "Plymouth", "Stoke-on-Trent", "Wolverhampton", "Derby", "Swansea",
      "Southampton", "Salford", "Aberdeen", "Westminster", "Portsmouth",
      "York", "Peterborough", "Dundee", "Lancaster", "Oxford", "Newport",
      "Preston", "St Albans", "Norwich", "Chester", "Cambridge", "Salisbury"
    ]
  },
  {
    code: "AU",
    name: "Australia",
    cities: [
      "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
      "Newcastle", "Canberra", "Central Coast", "Wollongong", "Logan City",
      "Geelong", "Hobart", "Townsville", "Cairns", "Darwin", "Toowoomba",
      "Ballarat", "Bendigo", "Albury", "Launceston", "Mackay", "Rockhampton",
      "Bunbury", "Bundaberg", "Wagga Wagga", "Hervey Bay", "Mildura",
      "Shepparton", "Port Macquarie", "Gladstone", "Tamworth"
    ]
  },
  {
    code: "DE",
    name: "Germany",
    cities: [
      "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart",
      "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Bremen", "Dresden",
      "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld",
      "Bonn", "Münster", "Karlsruhe", "Mannheim", "Augsburg", "Wiesbaden",
      "Gelsenkirchen", "Mönchengladbach", "Braunschweig", "Chemnitz", "Kiel",
      "Aachen", "Halle", "Magdeburg", "Freiburg", "Krefeld", "Lübeck"
    ]
  },
  {
    code: "FR",
    name: "France",
    cities: [
      "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg",
      "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre",
      "Saint-Étienne", "Toulon", "Angers", "Grenoble", "Dijon", "Nîmes",
      "Aix-en-Provence", "Saint-Quentin", "Brest", "Le Mans", "Amiens",
      "Tours", "Limoges", "Clermont-Ferrand", "Villeurbanne", "Besançon",
      "Orléans", "Metz", "Mulhouse", "Rouen", "Caen", "Nancy"
    ]
  },
  {
    code: "IT",
    name: "Italy",
    cities: [
      "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna",
      "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua",
      "Trieste", "Taranto", "Brescia", "Prato", "Parma", "Modena", "Reggio Calabria",
      "Reggio Emilia", "Perugia", "Livorno", "Ravenna", "Cagliari", "Foggia",
      "Rimini", "Salerno", "Ferrara", "Sassari", "Latina", "Giugliano", "Monza",
      "Syracuse", "Bergamo", "Pescara", "Forlì", "Trento", "Vicenza"
    ]
  },
  {
    code: "ES",
    name: "Spain",
    cities: [
      "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga",
      "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba",
      "Valladolid", "Vigo", "Gijón", "L'Hospitalet", "A Coruña", "Granada",
      "Vitoria", "Elche", "Santa Cruz de Tenerife", "Oviedo", "Badalona",
      "Cartagena", "Terrassa", "Jerez de la Frontera", "Sabadell", "Móstoles",
      "Alcalá de Henares", "Pamplona", "Fuenlabrada", "Almería", "Leganés"
    ]
  },
  {
    code: "MX",
    name: "Mexico",
    cities: [
      "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León",
      "Juárez", "Torreón", "Querétaro", "San Luis Potosí", "Mérida", "Mexicali",
      "Aguascalientes", "Cuernavaca", "Acapulco", "Saltillo", "Villahermosa",
      "Culiacán", "Chihuahua", "Morelia", "Xalapa", "Reynosa", "Veracruz",
      "Cancún", "Tampico", "Durango", "Oaxaca", "Tuxtla Gutiérrez", "Hermosillo",
      "Pachuca", "Toluca", "Matamoros", "Coatzacoalcos", "Mazatlán"
    ]
  },
  {
    code: "JP",
    name: "Japan",
    cities: [
      "Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe",
      "Kawasaki", "Kyoto", "Saitama", "Hiroshima", "Sendai", "Kitakyushu",
      "Chiba", "Sakai", "Niigata", "Hamamatsu", "Okayama", "Kumamoto",
      "Shizuoka", "Kagoshima", "Matsuyama", "Utsunomiya", "Matsudo", "Kawaguchi",
      "Kanazawa", "Sagamihara", "Oita", "Nara", "Toyama", "Nagasaki", "Toyota",
      "Takatsuki", "Gifu", "Fujisawa", "Hirakata", "Kashiwa", "Suita", "Tsu"
    ]
  }
];

export const getCountries = (): Country[] => countries;

export const getCitiesByCountry = (countryCode: string): string[] => {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.cities : [];
};