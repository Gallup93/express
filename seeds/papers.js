exports.seed = function(knex) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('footnotes').del() // delete all footnotes first
    .then(() => knex('papers').del()) // delete all papers

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([

        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('papers').insert({
          title: 'Lizard People in the U.S.', author: '[REDACTED]', publisher: 'NSA'
        }, 'id')
        .then(paper => {
          return knex('footnotes').insert([
            { note: 'Courtney Love', paper_id: paper[0] },
            { note: 'Zoltan Istvan', paper_id: paper[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
