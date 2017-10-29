/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Tests for the chord-lyric db functions.
 * @module chord-lyric_test
 */
const { expect } = require('chai')
const { initDB } = require('../utilities/db_reset')
const { createMeasure } = require('../utilities/create_items.js')
const { db } = require('../../db/db_connection')
const { Chord, Lyric } = require('../../db/model/chord-lyric_db')

const fields = {
  chord: ['chordId', 'beatIndex', 'noteCode', 'bassNoteCode', 'suffix'],
  lyric: ['lyricId', 'verseIndex', 'lyricText'],
}

const items = [
  // beatIndex, noteCode, bassNoteCode, suffix
  { type: 'chord', descString: 'chord with no suffix, no bass note', item: new Chord(0, 'G', null, null) },
  { type: 'chord', descString: 'chord with bass note, no suffix', item: new Chord(1, 'C#', 'E', null) },
  { type: 'chord', descString: 'chord with suffix, no bass note', item: new Chord(2, 'Bb', null, 'dim') },
  { type: 'chord', descString: 'chord with suffix, bass note', item: new Chord(3, 'A', 'B', 'm7b5') },
]

describe('successful addToDb()', function () {
  items.forEach(function (testData) {
    context(testData.descString, function () {
      let itemId
      let itemFromDb
      const item = testData.item
      before('Reset the DB and add the item', async function () {
        await initDB()
        // make a fake chart/section/measure to insert item into
        const measure = await createMeasure()
        itemId = await item.addToDb(measure.measureid)
        itemFromDb = await db.one(`SELECT * FROM  ${testData.type}s WHERE ${testData.type}Id=$1`, itemId)
      })
      it('should return a number itemId', function () {
        expect(itemId).to.be.a('number')
      })
      fields[testData.type].forEach((field) => {
        it(`should set the ${field} in the db`, function () {
          const fromDb = itemFromDb[field.toLowerCase()]
          const fromItem = item[field]
          expect(fromDb).to.equal(fromItem)
        })
      })
    })
  })
})

const chordFailures = [
  { descString: 'the measureId doesn\'t exist in the db', chord: new Chord(0, 'G'), measureId: -1 },
  { descString: 'the chord is missing a measureId', chord: new Chord(0, 'G'), measureId: null },
  { descString: 'the chord is missing a note code', chord: new Chord(0), measureId: 1 },
]

describe('failure Chord.prototype.addToDb()', function () {
  chordFailures.forEach(function (testData) {
    context(testData.descString, function () {
      before('Reset the DB', async function () {
        await initDB()
        // make a fake measure to insert chord into;
        // assume there will be a measure with id 1 after this
        await createMeasure()
      })
      it(`should throw an error when ${testData.descString}`, function () {
        return testData.chord.addToDb(testData.measureId)
          .catch(err => expect(err.message).to.contain('Chord not added'))
      })
    })
  })
})

// const userUpdateInputs = [
//   { field: 'email', value: 'wakkawakka@wallawalla.com' },
//   { field: 'firstName', value: 'Fozzie' },
//   { field: 'lastName', value: 'Bear' },
// ]
//
// describe('User.prototype.update()', function () {
//   let user
//   before('Reset the DB and get the user', async function () {
//     await initDB()
//     user = await User.getById(1)
//   })
//   userUpdateInputs.forEach(function (testData) {
//     describe(testData.field, function () {
//       before('Run the update', async function () {
//         await user.update(testData.field, testData.value)
//       })
//       it(`has changed the ${testData.field} field in the db`, async function () {
//         const u = await User.getById(1)
//         expect(u[testData.field]).to.equal(testData.value)
//       })
//       it(`has changed the ${testData.field} property in the user obj`, function () {
//         expect(user[testData.field]).to.equal(testData.value)
//       })
//       it('has not affected user authentication for db data', async function () {
//         const u = await User.getById(1)
//         expect(u.checkPassword(userData.password)).to.equal(true)
//       })
//       it('has not affected user authentication for user obj data', function () {
//         expect(user.checkPassword(userData.password)).to.equal(true)
//       })
//     })
//   })
// })
