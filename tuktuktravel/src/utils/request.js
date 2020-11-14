import 'whatwg-fetch'
// import { execute, makePromise } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { onError } from 'apollo-link-error'

//import conf from 'utils/env'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204) {
    return response
  }
  console.log(response)
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  // let userData = localStorage.getItem('userData')
  // let token = false
  // if (userData !== null) {
  //   userData = JSON.parse(userData);
  //   ({ token } = userData)
  // }
  // let optionsMerged = {}
  // if (options) {
  //   optionsMerged = JSON.parse(JSON.stringify(options))
  // }
  // if (token && url.match('api-agregateur') === null) {
  //   let headers = { 
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   }
  //   if (options && options.headers) {
  //     headers = { ...headers, ...options.headers }
  //   }
  //   optionsMerged.headers = headers
  // }
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    //.then(data => {console.log('data', data)})
}

/* eslint-disable no-console */

/**
 * Requests a URL, returning a promise
 *
 * @param  {object} query     The graphql query
 *
 * @return {object}           The response data
 */
// export async function graphqlRequest(query) {
//   const uri = `${conf.agregatorURL}/graphql`
//   const httpLink = new HttpLink({ uri })

//   const linkError = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path }) =>
//         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
//     }
//     if (networkError) console.log(`[Network error]: ${networkError}`)
//   })

//   const link = linkError.concat(httpLink)

//   return makePromise(execute(link, query))
//     .then((r) => r.data)
// }
