/**
 * Text crawler module.
 *
 * @module ./lib/text-crawler
 * @author Mats Loock
 * @version 1.2.0
 */

'use strict'

const { EventEmitter } = require('events')
const { readFile } = require('fs-extra')

/**
 * Represents a text crawler.
 */
class TextCrawler extends EventEmitter {
  /**
   * Creates an instance of TextCrawler.
   *
   * @param {RegExp} regexp - The regular expression to search a match for.
   */
  constructor (regexp) {
    super()
    this.regexp = regexp
    this._files = []
  }

  /**
   * Adds a file to be included in a search.
   *
   * @param {string} file - The file to search.
   * @returns {TextCrawler} The current instance.
   */
  addFile (file) {
    this._files.push(file)

    return this
  }

  /**
   * Executes a search for a match between a regular expression and the content
   * of a specified file. If there is a match the event TextCrawler#found will
   * be emitted.
   *
   * @fires TextCrawler#error
   * @fires TextCrawler#found
   * @returns {TextCrawler} The current instance.
   */
  find () {
    this._files.forEach(async file => {
      try {
        const content = await readFile(file, 'utf8')
        const matches = content.match(this.regexp)
        if (matches) {
          matches.forEach(match => this.emit('found', file, match))
        }
      } catch (error) {
        this.emit('error', error)
      }
    })

    return this
  }
}

// Exports.
module.exports.TextCrawler = TextCrawler
