import React from "react";
import "./Footer.css";

{/*Test Footer*/}

const Footer = () => {
  return (
    <footer>
      {/* Footer content goes here */}
      <footer>
         <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
           <div class="sm:flex sm:items-center sm:justify-between">


             <ul >
               <li>
                 <a href="http://localhost:3000/home" class="hover:underline me-4 md:me-6">Home</a>
               </li>
               <li>
                 <a href="http://localhost:3000/about" class="hover:underline me-4 md:me-6">About</a>
               </li>
             </ul>


             <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
               
               <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                   DePaul University
               </span>
              
             </a>
            

             <ul class="flex flex-wrap items-center mb-6 text-med font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
               <li>
                 <a href="http://localhost:3000/student" class="hover:underline me-4 md:me-6">Student Application</a>
               </li>
               <li>
                 <a href="http://localhost:3000/client" class="hover:underline">Client Application</a>
               </li>
             </ul>
            
           </div>
            
             <span class="block text-med dark:text-white">
               <p className="mt-2 text-center">Address: 1 E. Jackson Blvd.</p>
               <p className="mt-2 text-center">Chicago, IL 60604</p>
               <p className="mt-2 text-center">Phone: (***) ***-****</p>
             </span>
            
           <hr class="my-6 border-white-300 sm:mx-auto lg:my-8"></hr>


           <span class="block text-sm text-white">© 2001-2024
             <a> DePaul University </a>
           </span>
         </div>
     </footer>


    </footer>
  );
};

export default Footer;  

// export const Footer = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     return (
//         <nav>
//             <div className="menu" onClick={() => setMenuOpen(!menuOpen)}></div>

//             <footer class="sticky bottom-0 bg-white-500 rounded-lg m-4">
//                 <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
//                     <div class="sm:flex sm:items-center sm:justify-between">

//                         <ul class="flex flex-wrap items-center mb-6 text-med font-medium text-gray-500 sm:mb-0 dark:text-gray-400">

                            
//                             <li>
//                                 <a href="http://localhost:3000/home" class="hover:underline me-4 md:me-6">Home</a>
//                             </li>
//                             <li>
//                                 <a href="http://localhost:3000/about" class="hover:underline me-4 md:me-6">About</a>
//                             </li>
//                         </ul>

//                         <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
//                             {/* Remove Image and Configure styling Later */}
//                             <img src="" class="h-8" alt="DePaul Site Logo" />
                        

//                             <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
//                                 DePaul University
//                             </span>
                            
//                         </a>
                        

//                         <ul class="flex flex-wrap items-center mb-6 text-med font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//                             <li>
//                                 <a href="http://localhost:3000/student" class="hover:underline me-4 md:me-6">Student Application</a>
//                             </li>
//                             <li>
//                                 <a href="http://localhost:3000/client" class="hover:underline">Client Application</a>
//                             </li>
//                         </ul>
                    
//                     </div>
                    
//                     <span class="block text-med dark:text-white">
//                         <p className="mt-2 text-center">Address: 1 E. Jackson Blvd.</p>
//                         <p className="mt-2 text-center">Chicago, IL 60604</p>
//                         <p className="mt-2 text-center">Phone: (***) ***-****</p>
//                     </span>
                        
//                     <hr class="my-6 border-white-300 sm:mx-auto lg:my-8"></hr>

//                     <span class="block text-sm text-white">© 2001-2024
//                         <a> DePaul University </a>
//                     </span>
//                 </div>
//             </footer>
//         </nav>
//     );
// };


// export const Footer = () => {
//     // const [menuOpen, setMenuOpen] = useState(false);

// <footer class="bg-blue-500 rounded-lg m-4">
//     <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
//     <div class="sm:flex sm:items-center sm:justify-between">

//         <ul class="flex flex-wrap items-center mb-6 text-med font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//         <li>
//             <a href="http://localhost:3000/home" class="hover:underline me-4 md:me-6">Home</a>
//         </li>
//         <li>
//             <a href="http://localhost:3000/about" class="hover:underline me-4 md:me-6">About</a>
//         </li>
//         </ul>

//         <a href="#" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
//         <img src={logo} class="h-8" alt="DePaul Site Logo" />

//         <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
//             DePaul University
//         </span>
        
//         </a>
        

//         <ul class="flex flex-wrap items-center mb-6 text-med font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//         <li>
//             <a href="http://localhost:3000/student" class="hover:underline me-4 md:me-6">Student Application</a>
//         </li>
//         <li>
//             <a href="http://localhost:3000/client" class="hover:underline">Client Application</a>
//         </li>
//         </ul>
        
//     </div>
        
//         <span class="block text-med dark:text-white">
//         <p className="mt-2 text-center">Address: 1 E. Jackson Blvd.</p>
//         <p className="mt-2 text-center">Chicago, IL 60604</p>
//         <p className="mt-2 text-center">Phone: (***) ***-****</p>
//         </span>
        
//     <hr class="my-6 border-white-300 sm:mx-auto lg:my-8"></hr>

//     <span class="block text-sm text-white">© 2001-2024
//         <a> DePaul University </a>
//     </span>
//     </div>
// </footer>

// };