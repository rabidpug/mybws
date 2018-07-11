import React from 'react'
const SearchHelp = () => (
  <div>
    Enter an Article Number to search for a specific article.
    <br />
    Other searches will be made across the Description, Category, Sub Category and Segment fields. Surround in quotes to
    match a whole phrase. The results will be sorted by how well they match your search.
    <br />
    If you arent getting a good result, turn off &quot;Search Complete Words&quot; in the settings menu - this will
    search each individual letter instead (eg the search &quot;chv rgl ult&quot; will return &quot;Chivas Regal
    Ultis&quot;)
  </div>
)

export default SearchHelp
