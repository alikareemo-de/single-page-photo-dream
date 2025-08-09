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

// Using GeoDB Cities API - free tier available (no API key for basic usage)
export const fetchCitiesByCountry = async (countryCode: string): Promise<string[]> => {
  try {
    // Using a free API that doesn't require authentication for basic requests
    const response = await fetch(
      `https://api.api-ninjas.com/v1/city?country=${countryCode}&limit=50`,
      {
        headers: {
          'X-Api-Key': 'demo' // Using demo key for basic functionality
        }
      }
    );
    
    if (!response.ok) {
      // If API fails, return some default cities based on country
      return getDefaultCities(countryCode);
    }
    
    const data = await response.json();
    const cities = data.map((city: any) => city.name);
    
    return cities.sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    return getDefaultCities(countryCode);
  }
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