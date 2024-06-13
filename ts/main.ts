/**
 *  - create a class to represent the JSON response for the random dog
 *  - Call the random dog endpoint of the API (use the proper URL)
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
        
        /**
         *  Set up event handler when page is loaded
         */
        document.addEventListener("DOMContentLoaded", function(){
            // Wire up the random Dog image button
            let randomDogButton = document.getElementById("random_image");
            randomDogButton.addEventListener("click", function(){
                getRandomDogImage().then(displayDogImage).catch(displayError);
            });
        });
        
        /**
         *  Calls the dog.ceo random dog image endpoint
         *  and displays the image on the HTML page
         */
        async function getRandomDogImage(){
            // Get random dog image and wait for the response
            let response = await fetch("https://dog.ceo/api/breeds/image/random");
            console.log(response);
        
            // If the service did not respond properly
            if (!response.ok){
                alert("Could not get a random image, please try again later.");
                // Throw exception to handle later on
                throw new Error("HTTP error! Status: " + response.status);
            }
        
            // If the service did respond properly, get the json response
            let data:RandomImageResponse = await response.json();
            console.log(data);
            return data;
        }
        
        function displayDogImage(dogData:RandomImageResponse){
            // Todo: display image on page
            let displayDiv = document.getElementById("Display");

            let breedName = getDogBreed(dogData.message);

            // Create a Bootstrap card component with an image cap
            let card =
            `<div class="card" style="width: 18rem;">
                <img src="${dogData.message}" class="card-img-top" alt="${breedName}">
                <div class="card-body">
                    <h5 class="card-title">${breedName}</h5>
                    <p class="card-text"> Example picture of a ${breedName} </p>
                    <a href="${dogData.message}" target="_blank" class="btn btn-primary">See full image</a>
                </div>
            </div>`;

            let container = document.createElement("div"); // Create an element to hold the card
            container.classList.add("col"); // Add the Bootstrap class to the container
            container.innerHTML = card; // Add the card to the container

            // Add image as the first child of the display div but keep the previous images
            displayDiv.insertBefore(container, displayDiv.firstChild); // Insert the new image before the current first image
        }
        
        function displayError(error:Error){
            // Todo: display nice error message to user
        }

        /**
         * This function returns the breed name portion fo the URL
         * from the random dog image response Example URL:
         * https://images.dog.ceo/breeds/weimaraner/n02092339_114.jpg
         * @param url the URL pointing to a dog image
         * @returns the breed name portion of the URL
         */
        function getDogBreed(url: string): string {
            let parts = url.split("/");
            let breedIndex = parts.indexOf("breeds") + 1;
            return parts[breedIndex];
        }