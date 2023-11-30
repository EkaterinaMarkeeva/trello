// import Controller from "./controller";

// export default class Form {
  
//   getDataForm() {
//     const textarea = document.querySelector('textarea');
//     return textarea.value;
//   }

//   createForm(e) {
//     const elem = e.target;
//     const parent = elem.closest('.column');
    
//     const form = document.createElement('form');
//     const textarea = document.createElement('textarea');
//     const btnAddCard = document.createElement('button');
//     const btnDelete = document.createElement('button');
    
//     textarea.placeholder = "Enter a title for this card...";
//     btnAddCard.textContent = "Add Card";
//     btnDelete.textContent = `\u{00d7}`;
    
//     form.classList.add('form');
//     btnAddCard.classList.add('btn');
//     btnAddCard.classList.add('btn-add-crd');
//     btnDelete.classList.add('btn-delete');
    
//     form.appendChild(textarea);
//     form.appendChild(btnAddCard);
//     form.appendChild(btnDelete);
//     parent.appendChild(form);
    
//     btnAddCard.addEventListener('click', Controller.onCellClick);
//     btnDelete.addEventListener('click', Controller.onCellClick);
//   };

//   removeForm(e) {
//       const elem = e.target;
//       const parent = elem.closest('.form');
  
//       parent.remove();
//     }
// }
