const fs = require('fs');
const { parse } = require('json2csv');

// Function to filter required fields
function filterStationData(station) {
  return {
    id: station.id,
    name: station.name,
    slug: station.slug,
    phone_number: station.phone_number,
    region: station.region,
    website: station.website,
    address: station.address,
    latitude: station.latitude,
    longitude: station.longitude,
    work_dates: JSON.stringify(station.work_dates), // Convert array to string for CSV
  };
}

// Read the original stations.json file
fs.readFile('stations.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON data
  const parsedData = JSON.parse(data);

  // Filter each station's data
  const filteredStations = parsedData.results.map(filterStationData);

  // Convert filtered data to CSV format
  const csv = parse(filteredStations);

  // Write the CSV data to a new file
  fs.writeFile('filtered_stations.csv', csv, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Filtered data saved to filtered_stations.csv');
  });
});
