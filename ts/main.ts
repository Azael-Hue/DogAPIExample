/**
 *  - create a class to represent the JSON response for the random joke
 *  - Call the random joke endpoint of the API (use the proper URL)
 *  - Create an object (from the class above) to hold the returned data
 *      (important so we get goof intellisense)
 *  - Add the data to the HTML page with DOM manipulation
 */

/**
 *  Holds the data for the random image from the dog.ceo API
 *  Example response:
 * {
        "message": "https://images.dog.ceo/breeds/terrier-patterdale/patterdale-terrier-287612805105275kBT.jpg",
        "status": "success"
 *  }
 */
class RandomImageResponse{
    /** The URL that points to the random dog image */
    message: string; // Matching property name with JSON response property name
    status: string;
}