document.getElementById('downloadForm').addEventListener('submit', function(event) {
   event.preventDefault();
    
   const videoUrl = document.getElementById('videoUrl').value;

   const apiUrl = `https://vidnabber.com/wp-json/aio-dl/api/?url=${encodeURIComponent(videoUrl)}&key=3492879087e0cbbedf805e05fbefbc1841caf7a92897119a8ee2e8eb519620b8`;

   // Show progress bar and text
   const progressBarContainer = document.getElementById('progressBarContainer');
   const progressBar = document.getElementById('progressBar');
   const progressText = document.getElementById('progressText');
   
   progressBarContainer.classList.remove('hidden');
   progressText.classList.remove('hidden');
   
   progressBar.style.width = '50%'; // Simulate progress

   fetch(apiUrl)
       .then(response => response.json())
       .then(data => {
           // Complete progress
           progressBar.style.width = '100%';
           setTimeout(() => { 
               progressBarContainer.classList.add('hidden'); 
               progressText.classList.add('hidden'); // Hide text after progress completes
           }, 500); // Hide after a delay

           displayResults(data);
       })
       .catch(error => {
           console.error('Error:', error);
           alert("An error occurred while fetching data. Please try again."); // User-friendly error message
           // Hide progress bar and text on error
           progressBarContainer.classList.add('hidden');
           progressText.classList.add('hidden');
       });
});

function displayResults(data) {
   const resultDiv = document.getElementById('result');
    
   if (data.url) {
       resultDiv.innerHTML = `
           <h2>${data.title}</h2>
           <img src="${data.thumbnail}" alt="${data.title} Thumbnail" class="thumbnail">
           <p>Duration: ${data.duration}</p>
           <h3>Download Links:</h3>
           <div class="download-container">
               ${data.medias.map(media => `
                   <a href="${media.url}" class="download-link" download="${media.quality}.${media.extension}">
                       ${media.quality} (${media.formattedSize})
                   </a>
               `).join('')}
           </div>
       `;
   } else {
       resultDiv.innerHTML = `<p>No video found. Please check the URL.</p>`;
   }
}
