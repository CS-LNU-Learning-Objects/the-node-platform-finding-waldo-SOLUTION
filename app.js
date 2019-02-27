/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.1.0
 */

'use strict'

const {TextCrawler} = require('./lib/text-crawler')

// Instantiate a TextCrawler object passing a regular
// expression literal (i meaning case-insensitive).
const textCrawler = new TextCrawler(/waldo/i)

// Register listeners for the found and error event.
textCrawler.on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
textCrawler.on('error', error => console.error(`ERROR: ${error.message}`))

// Add files to search.
textCrawler.addFile('data/file1.txt')
  .addFile('data/file2.txt')
  .addFile('data/file3.json')
  .addFile('data/file4.json')
  .addFile('data/file5.json')

// Start searching.
textCrawler.find()
