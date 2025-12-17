<H1>SDEV 255 Final - Group 1</H1>
<h2>Getting the backend ready</h2>
<h3>Installing Dependencies</h3>
<p>Ensure node.js is installed on your system. Once it is, open the folder in VScode.</p>
<img width="668" height="177" alt="image showing what to type in the console to install the dependencies to run the backend server" src="https://github.com/user-attachments/assets/72dcd79d-63c2-43fd-ba98-c699bc7a3e89" />
<p>Once open, type 'npm install' in the terminal. Node package manager will then download the correct dependencies.</p>
<h3>Installing the .env file.</h3>
<p>The .env includes vulnerable data that certain parties should not be able to see. To ensure it is not visible in plain text, it is secured in a .env file.</p>
<p>If you are given access to the .env file, you must make sure your .gitignore file will not push it to the database. </p>
<p>Make sure your .gitignore file includes the enviroment variables show in this picture. Otherwise, anyone that can view the repo can gain access to the secret keyword used for encryption, or edit information in the database.</p>
<img width="543" height="639" alt="Image showing what to put in the gitignore file to ensure vulnerable data isn't leaked." src="https://github.com/user-attachments/assets/47f1069d-9858-428f-9d7a-4d664db21966" />
<p>The .env file should be placed in the root folder, where package.json is also present, like so.</p>
<img width="341" height="299" alt="Image showing the .env file placed in the same folder as the package.json file." src="https://github.com/user-attachments/assets/d6d634fe-e49a-480e-9f11-c70df3ffb3d0" />
<h3>Starting the backend server</h3>
<p>The backend server can be started by simply typing 'node backend\app.js'</p>
<p>If you are given errors about missing modules, see the above section on installing dependencies.</p>
<p>Once started, the console should output the message, listening on port 3000.</p>
<img width="834" height="143" alt="Image showing the console outputting the listening on port 3000 message, indicating it was sucessfully started." src="https://github.com/user-attachments/assets/539e2905-4a5b-49fa-8510-ada82d3c355a" />
<p>The server is now started, and you can access the website by navigating to this URL in your browser of choice.</p>
<img width="418" height="41" alt="URL showing the homepage of the site: http://127.0.0.1:5500/frontend/views/index.html" src="https://github.com/user-attachments/assets/7b0334d9-c947-44ae-a92d-ec5475d04db4" />
<img width="1479" height="455" alt="Picture of the front of the website" src="https://github.com/user-attachments/assets/39aa3d39-23eb-4157-b0d9-a08528b80035" />

