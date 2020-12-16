'use strict'

const ATCQueue = function () {
  this.aircraftQueue = []
}

ATCQueue.prototype.aircraftCount = function () {
  return this.aircraftQueue.length
}

ATCQueue.prototype.enqueue = function (aircraft) {
  this.aircraftQueue.push(aircraft)
}

ATCQueue.prototype.dequeue = function () {
  const q = this.aircraftQueue

  // find the first plane in the queue for each combination of type and size
  const bigPassenger = q.find(p => p.type === 'passenger' && p.size === 'large')
  const smallPassenger = q.find(p => p.type === 'passenger' && p.size === 'small')
  const bigCargo = q.find(p => p.type === 'cargo' && p.size === 'large')
  const smallCargo = q.find(p => p.type === 'cargo' && p.size === 'small')

  // skip any categeories for which we didn't find a plane, save the first of
  // these options for which we did find a plane as `firstPriority`
  const firstPriority = bigPassenger || smallPassenger || bigCargo || smallCargo

  // remove the plane selected above from the queue
  q.splice(q.indexOf(firstPriority), 1)

  // return the plane with highest priority
  return firstPriority
}

// ALTERNATE SOLUTION

// ATCQueue.prototype.dequeue = function () {
//   let index = 0
//   let ac = this.aircraftQueue[index]
//
//   this.aircraftQueue.forEach((qAC, qIndex) => {
//     const diffSize = qAC.size === 'large' && ac.size !== 'large'
//     const diffType = qAC.type === 'passenger' && ac.type !== 'passenger'
//     const sameType = qAC.type === ac.type
//
//     if (diffType || (sameType && diffSize)) {
//       index = qIndex
//       ac = this.aircraftQueue[index]
//     }
//   })
//
//   this.aircraftQueue.splice(index, 1)
//
//   return ac
// }

module.exports = ATCQueue
