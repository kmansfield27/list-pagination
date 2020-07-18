
document.addEventListener('DOMContentLoaded', function() {

   // Set global variables for the student list and # of students to display per page 
   const listItems = document.querySelectorAll('.student-item');
   const itemsPerPage = 10;

   // Global variable for layout selection
   const page = document.querySelector('.page');

   // Create no results notification
   const noResults = document.createElement('p');
   page.appendChild(noResults);
   noResults.textContent = 'There are no students that match your search.';
   noResults.style.marginTop = '60px';
   noResults.style.textAlign = 'center';
   noResults.style.display = 'none';

   /*** 
      Function to divide the list into pages. The function accepts a list 
      and a page number as arguments. The list is an array that
      is looped over. startIndex and endIndex are used to control 
      which indices are displayed on the screen. As the page number is
      changed, the displayed indices will adjust. 
   ***/
   function showPage(list, page) {
      const startIndex = (page * itemsPerPage) - itemsPerPage; 
      const endIndex = (page * itemsPerPage) - 1;
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i <= endIndex) {
            list[i].style.display = '';
         } else {
            list[i].style.display = 'none';
         }
      }
   }

   // Create pagination links at the bottom of the screen.
   function appendPageLinks(list) {

      // Binding to determine the # of page links needed in the pagination
      const pageCount = Math.ceil(list.length / itemsPerPage);

      // Create and append elements for pagination
      const div = document.createElement('div');
      const ul = document.createElement('ul');
      page.appendChild(div);
      div.className = 'pagination';
      div.appendChild(ul);

      // Create the inner markup for each link in pagination
      for (let i = 1; i <= pageCount; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = '#';
         a.textContent = `${[i]}`;
         ul.appendChild(li);
         li.appendChild(a);

         // Add active class to first link by default
         if (i === 1) {
            a.className = 'active';
         }
         
         // Callback to update the pagination links on click 
         a.addEventListener('click', function (e) {
            e.preventDefault();
            const links = document.querySelectorAll('.pagination a'); 
            const clicked = e.target;
            const pageNumber = clicked.textContent;

               // Remove and set active class to links
               for (link of links) {
                  link.className = '';
               }
               clicked.className = 'active';

               // Adjust view to display appropriate list items
               showPage(listItems, pageNumber); 
            
         });
      }
   }

   // Search function
   function searchList(searchInput) {

      // Define a new array to pass results on search into
      let searchResults = [];
      const pagination = document.querySelector('.pagination');

      for (let i = 0; i < listItems.length; i++) {
         
         // If search matches list item, push to new array and make visible          
         if ( searchInput.value !== 0 && listItems[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase() ) ) {
            searchResults.push(listItems[i]);
            listItems[i].style.display = '';
         } else {    
            listItems[i].style.display = 'none';
         }
      }

      // Remove initial pagination
      pagination.parentNode.removeChild(pagination);

      // Rerun showPage and appendPageLinks to refresh view
      showPage(searchResults, 1);
      appendPageLinks(searchResults);


      // Display no results message when no matches found
      if (searchResults.length === 0) {
         noResults.style.display = 'block';
      } else {
         noResults.style.display = 'none';
      }
   }


   // Create search bar and pass in the search handler
   function appendSearch() {

      // Create and append search elements
      const header = document.querySelector('.page-header');
      const div = document.createElement('div');
      div.className = 'student-search';
      const input = document.createElement('input');
      input.placeholder = 'Search for students...';
      const button = document.createElement('button');
      button.textContent = 'Search';
      header.appendChild(div);
      div.appendChild(input);
      div.appendChild(button);

      // Click handler for search button
      button.addEventListener( 'click', function (e) {
         searchList(input);
      });
   
      // Keyup handler for input
      input.addEventListener( 'keyup', function (e) {
         searchList(input);
      });
   }
   
   // Initialize functions
   showPage(listItems, 1); 
   appendPageLinks(listItems);
   appendSearch();

});