let phones = [];

async function call_api(phoneName) {
  const api_url = 'http://phone-specs-api.azharimm.dev/search?query=' + phoneName;
  const response = await fetch(api_url);
  const phones_data = await response.json();
//   phones = phones_data['data']['phones'].map(phone => [phone['phone_name'], phone['slug']]);
  phones = phones_data['data']['phones'].map(phone => [phone['phone_name'], phone['brand'], phone['slug']]);

  return phones_data;
}

async function get_data() {
  const searchField = document.querySelector("#search_bar");
  const phoneName = searchField.value.trim();
  if (phoneName !== '') {
    await call_api(phoneName);
    console.log(phones);
    
    const results = document.querySelector("#results");
    results.innerHTML = '';
    for (const phone of phones) {
      const phoneName = phone[0];
      const phoneBrand = phone[1];
      const phoneSlug = phone[2];
      const recordElem = createRecordElem(phoneName, phoneSlug, phoneBrand);
      results.appendChild(recordElem);
    }
  }
}

function handleRowClick(event) {
    const phoneName = event.currentTarget.dataset.phoneName;
    const phoneSlug = event.currentTarget.dataset.phoneSlug;
    console.log("Phone clicked:", phoneName, phoneSlug);
    // do something with the phone name and slug
  }

function createRecordElem(phone, slug, brand) {
  const recordElem = document.createElement("tr");
  const tdBrand = recordElem.appendChild(document.createElement("td"));
  const tdPhone = recordElem.appendChild(document.createElement("td"));
  const tdSlug = recordElem.appendChild(document.createElement("td"));
  tdPhone.textContent = phone;
  tdSlug.textContent = slug;
  tdBrand.textContent = brand;
  tdSlug.className = "slug-cell";
  tdBrand.className = "brand-cell";

  recordElem.dataset.phoneName = phone;
  recordElem.dataset.phoneSlug = slug;

//   recordElem.addEventListener("click", handleRowClick);
    recordElem.addEventListener("click", () => {
        // redirect to product page with phone slug as query parameter
        window.location.href = `product.html?slug=${slug}`;
    });

  return recordElem;
};

const searchButton = document.querySelector("#search_btn");
searchButton.addEventListener("click", get_data);

