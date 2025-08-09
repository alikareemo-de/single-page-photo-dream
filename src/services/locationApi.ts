// Location API service to fetch countries and cities

export interface Country {
  code: string;
  name: string;
}

export interface City {
  name: string;
  country: string;
}

// Using REST Countries API - free, no API key required
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data = await response.json();
    const countries = data.map((country: any) => ({
      code: country.cca2,
      name: country.name.common
    }));
    
    // Sort countries alphabetically
    return countries.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Fallback to basic list
    return [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
    ];
  }
};

// Using World Cities API - free, no API key required
export const fetchCitiesByCountry = async (countryCode: string): Promise<string[]> => {
  try {
    // Using a free API that works without authentication
    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/cities`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: getCountryNameByCode(countryCode)
        })
      }
    );
    
    if (!response.ok) {
      return getDefaultCities(countryCode);
    }
    
    const data = await response.json();
    if (data.error || !data.data) {
      return getDefaultCities(countryCode);
    }
    
    return data.data.sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    return getDefaultCities(countryCode);
  }
};

// Helper function to get country name from code for the cities API
const getCountryNameByCode = (countryCode: string): string => {
  const countryMap: { [key: string]: string } = {
    'US': 'United States',
    'CA': 'Canada', 
    'GB': 'United Kingdom',
    'DE': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'ES': 'Spain',
    'AU': 'Australia',
    'JP': 'Japan',
    'MX': 'Mexico',
    'BR': 'Brazil',
    'IN': 'India',
    'CN': 'China',
    'RU': 'Russia',
    'RS': 'Serbia',
    'NL': 'Netherlands',
    'BE': 'Belgium',
    'CH': 'Switzerland',
    'AT': 'Austria',
    'SE': 'Sweden',
    'NO': 'Norway',
    'DK': 'Denmark',
    'FI': 'Finland',
    'PL': 'Poland',
    'CZ': 'Czech Republic',
    'HU': 'Hungary',
    'GR': 'Greece',
    'PT': 'Portugal',
    'IE': 'Ireland',
    'TR': 'Turkey',
    'EG': 'Egypt',
    'ZA': 'South Africa',
    'NG': 'Nigeria',
    'KE': 'Kenya',
    'MA': 'Morocco',
    'AR': 'Argentina',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PE': 'Peru',
    'VE': 'Venezuela',
    'TH': 'Thailand',
    'VN': 'Vietnam',
    'PH': 'Philippines',
    'ID': 'Indonesia',
    'MY': 'Malaysia',
    'SG': 'Singapore',
    'KR': 'South Korea',
    'BD': 'Bangladesh',
    'PK': 'Pakistan',
    'LK': 'Sri Lanka',
    'NP': 'Nepal',
    'MM': 'Myanmar',
    'KH': 'Cambodia',
    'LA': 'Laos'
  };
  
  return countryMap[countryCode] || countryCode;
};

// Fallback function with some major cities for common countries
const getDefaultCities = (countryCode: string): string[] => {
  const defaultCities: { [key: string]: string[] } = {
    'US': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    'CA': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'],
    'GB': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh'],
    'DE': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund'],
    'FR': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'],
    'IT': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence'],
    'ES': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'],
    'AU': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra'],
    'JP': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto'],
    'MX': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Torreón']
  };
  
  return defaultCities[countryCode] || ['Capital City', 'Main City', 'Other City'];
};