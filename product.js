// get phone slug from query parameter
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

let testvar;
async function getProductData(slug) {
  try {
    const api_url = `http://phone-specs-api.azharimm.dev/${slug}`;
    const response = await fetch(api_url);
    const productData = await response.json();
    console.log(productData);
    testvar = productData
    return productData;
  } catch (error) {
    console.error(error);
    // handle error here, e.g. show a message to the user
  }
}

// use product data to populate the product page
async function populateProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  if (slug) {
    const product = await getProductData(slug);

    if (!product || !product.data || !product.data.specifications) {
      console.error("Product data is missing or invalid");
      return;
    }

    const { phone_name, brand, phone_images, release_date } = product.data;
    const specs = product.data.specifications;

    document.getElementById("product-name").textContent = phone_name + ' ('+brand +')';
    document.querySelector("#product-image img").src = phone_images[0]
    document.getElementById("product-relese-date").textContent = release_date;

    const specList = document.getElementById("product-specs");
    copybox = document.getElementById("specs-copybox"); 
    const lines = product.data.specifications.map(record => {
        return record.specs.map(spec => {
            return `${spec['key']}: \n${spec['val'][0].replace(/\n/g, ' ').trim()}` 
        });
    }).flat();
    copybox.textContent = lines.join('\n');
    
    // Assuming the JSON data is stored in the variable json_data

    const phoneImages = product.data.phone_images;

    phoneImages.forEach((image) => {
        // console.log(image)
        const imgElement = document.createElement("img");
        imgElement.classList.add("photobox-image");
        imgElement.src = image;
        // console.log(imgElement)
        const headerElement = document.createElement("div");
        headerElement.classList.add("photobox-header");

        const textareaElement = document.createElement("textarea");
        textareaElement.classList.add("photobox_text");
        textareaElement.textContent = image

        const photoboxElement = document.createElement("div");
        photoboxElement.classList.add("photobox");
        
        photoboxElement.appendChild(headerElement);
        headerElement.appendChild(imgElement);
        headerElement.appendChild(textareaElement);
        
        
    
        // Assuming there's a div with an ID of "photobox-container" that you want to append the photobox to
        document.getElementById("photobox-container").appendChild(photoboxElement);
        // console.log(photoboxElement)
        });

        // Assuming the textareas have the class "photobox_text"
        const photoboxTextElements = document.querySelectorAll(".photobox_text");

        photoboxTextElements.forEach((textarea) => {
            // Create the copy button
            const copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.classList.add("copy-button")
        
        // Add a click event listener to the copy button
        copyButton.addEventListener("click", () => {
            // Copy the content of the corresponding textarea to the clipboard
            textarea.select();
            document.execCommand("copy");
        });
        
        // Add the copy button to the parent element of the textarea
        textarea.parentNode.appendChild(copyButton);

        
        
        
});


    } 
  
    } 


function copyspecs() {
    const copybox_text= document.querySelector(".copybox")
    console.log(copybox_text)
    navigator.clipboard.writeText(copybox_text.value);     
    }

populateProductPage();

