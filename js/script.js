/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

document.addEventListener('DOMContentLoaded', () => {


   // Set global variables
   const listItems = document.querySelectorAll('.student-item');
   const itemsPerPage = 10;


   /*** 
      Function to divide the list into pages. The function accepts a list 
      and a page number as arguments. The list is an array that
      is looped over. startIndex and endIndex are used to control 
      which indices are displayed on the screen. As the page number is
      changed, the displayed indices will adjust. 
   ***/

   const showPage = (list, page) => {
      const startIndex = (page * itemsPerPage) - itemsPerPage; 
      const endIndex = page * itemsPerPage - 1;
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i <= endIndex) {
            list[i].style.display = '';
         } else {
            list[i].style.display = 'none';
         }
      }
   }

   /*** 
      Function to create the pagination buttons at the bottom of the screen.

   ***/

   const appendPageLinks = (list) => {
      const div = document.createElement('div');
      div.className = 'pagination';

      const ul = document.createElement('ul');
      const pageCount = Math.ceil(list.length / itemsPerPage);
      
      document.querySelector('.page').appendChild(div);
      div.appendChild(ul);

      for (let i = 1; i <= pageCount; i++) {
         let li = document.createElement('li');
         li.innerHTML = `<a href="#">${[i]}</a>`;
         ul.appendChild(li);
      }

      const links = document.querySelectorAll('.pagination a');

      ul.firstElementChild.firstElementChild.className = 'active';

      ul.addEventListener('click', (e) => {

         if (e.target.tagName === 'A') {
            //e.preventDefault();
            const clicked = e.target;
            for (link of links) {
               link.className = '';
            }
            clicked.className = 'active';

            const page = clicked.textContent;
            showPage(listItems, page); 
         }
      });
   }


   /*
      <div class="page-header cf">
        <h2>Students</h2>
        
        <!-- student search HTML to add dynamically -->
        <div class="student-search">
          <input placeholder="Search for students...">
          <button>Search</button>
        </div>
        <!-- end search -->

      </div>
   */

   const appendSearch = () => {
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
   }
   

   showPage(listItems, 1); 
   appendPageLinks(listItems);
   appendSearch();

   const input = document.querySelector('input');
   const button = document.querySelector('button');

   const searchList = (searchElement, list) => {
      for (let i = 0; i <= list.length; i++) {
         if ( searchElement.value.length !== 0 && 
              list[i].textContent.toLowerCase().includes(searchElement.value.toLowerCase() ) ) {
            
            list[i].style.display = 'list-item';
         } else {    
            list[i].style.display = 'none';
         }
      }
   }

   button.addEventListener( 'click', (e) => {
      searchList(input, listItems);
   });

   input.addEventListener( 'keyup', (e) => {
      searchList(input, listItems);
   });

});