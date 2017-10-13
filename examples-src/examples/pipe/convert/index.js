import csv_to_json from './csv-to-json'
import googledrive_csv_to_json from './googledrive-csv-to-json'
import dropbox_csv_to_json from './dropbox-csv-to-json'

export default {
  title: 'Conversion',
  descripton: '',
  items: [
    csv_to_json,
    googledrive_csv_to_json,
    dropbox_csv_to_json
  ]
}
