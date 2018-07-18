import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const GET_RES = gql`
  query business($where: BusinessWhereInput) {
    business(where: $where) {
      id
      zomatoID
      name
      url
      address
      locality
      city
      latitude
      longitude
      price
      hours
      cuisine
      tags
      type
    }
  }
`

/**
 * TODOS to implement Filter query:
 * 0) (optional) use introspection query to get all Tag and Cuisine options OR just hard code the list of tags/cuisines for now
 * 1) BUILD QUERY: Loop over tag/cuisine options and create checkbox for user to "select" a tag
 *    1a) Create a state variable to track each tag/cuisine checkbox's status
 *    1b) As we create that checkbox, link the checkbox's status to the state variable so they automatically update
 * 2) SEND QUERY: In the render function, run the businesses() query with inputs based on the tag/cuisine state variables
 * 3) DISPLAY RESULTS: Display each Business based on what the businesses() query returns
 * 4) (optional) Implement a cache that stores the value of the businesses() query to improve performance
 */

class Feed extends React.Component {
  constructor() {
    //this is where step 0 would go, where we look up (or hard code) the list of tags/cuisine
    tags = ["BRUNCH","LUNCH"]
    
    //then, we set up the shape of our stat's tags and cuisines object
    this.state.tags = {};
    tags.forEach(tag => {
      this.state.tags[tag] = false;
    });
    
    //at the end of this function, we need to have a this.state.tags, and it should look like:
    /**
     * tags: {
      BRUNCH: false,
      LUNCH: false
    },
     */
    //TODO DONT FORGET we need to do the same for cuisines
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.tags).forEach(tag => { //Object.keys() gets just the keys [BRUNCH, LUNCH, etc.]
          //create a checkbox with the text of the tag
          //link that checkbox to change the boolean of the tag's state
              //onclick, toggle this.state.tags[tag] (so it turns from F->T or T->F)
        })}
        <Query
          query={GET_RES}
          variables={{
            where: {
              // tags: {
              //   BRUNCH: this.state.tags.BRUNCH
              // }
              tags: this.state.tags,
              /**
               * we can just tags: this.state.tags since the tags object in state
               * matches the shape of the tags object our where: expects based on 
               * our graphQL schema
               * DONT FORGET to do the same for cuisine
               */
            }
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "LOading..."
            }
            if (error) {
              return error
            }
            return (
              <div>
                {/* TODO: here is where we do step 3
                data.business will probably have the businesses in it
                You can create components to display each business. */}
                {data.tweets.map(tweet => {
                  return (
                    <TweetComponent
                      key={tweet.id}
                      text={tweet.text}
                      author={tweet.author}
                    />
                  )
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Feed
