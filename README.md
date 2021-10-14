<p align="center">
<<<<<<< HEAD
<img src="./src/sylph-icon.png" />
=======
<img src="https://raw.githubusercontent.com/sveltejs/svelte/29052aba7d0b78316d3a52aef1d7ddd54fe6ca84/site/static/images/svelte-android-chrome-512.png" width="250" />
>>>>>>> dev
</p>
<h1 align ="center">Sylph</h1>
<p align="center">A drag and drop Svelte prototyping tool.</p>
<p align="center">
<a target="_blank" href="https://github.com/oslabs-beta/Sylph/blob/dev/LICENSE.md"><img alt="GitHub license" src="https://img.shields.io/github/license/oslabs-beta/sylph"></a> 

<a href="https://github.com/oslabs-beta/Sylph/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/oslabs-beta/sylph"></a>
<a href="https://github.com/oslabs-beta/sylph/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/oslabs-beta/sylph"></a>
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oslabs-beta/sylph">

</p>
<h2>Table of Contents</h2>

- [About](https://github.com/oslabs-beta/sylph/#About)
- [Features](https://github.com/oslabs-beta/sylph/#Features)
- [Getting Started](https://github.com/oslabs-beta/sylph/#Getting-Started)
- [Example](https://github.com/oslabs-beta/sylph/#Example)
- [Contributors](https://github.com/oslabs-beta/sylph/#Contributors)
- [License](https://github.com/oslabs-beta/sylph/#License)

<h2 href="#About">About</h2>

Sylph is a prototyping tool for Svelte web applications. With its convenient drag-and-drop interface, component customizer, real-time code preview, and real-time site preview, Sylph allows users to quickly prototype and develop the architecture of their Svelte applications.
Harnessing the power of Electron, TypeScript, and Svelte, Sylph provides an open-source solution for the fast-growing Svelte community's prototyping needs. 

## Features
  - Drag and drop UI.
  - Live code and Svelte application preview.
  - Full svelte application saved on your local machine, not just code snippets.
## Getting Started


### Installing Sylph

Sylph is available for Mac and Windows operating systems. You can download Sylph directly from www.sylph.cc.

Navigate to [Sylph releases]('https://github.com/oslabs-beta/Sylph/releases') in the repository and download the package for your respective operating system. 

<a href="https://github.com/oslabs-beta/Sylph/releases">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg>
</a> 

* MacOS:
  * Run the Sylph.dmg file.
  * Drag the Sylph app into your systems application folder.
  * Double click to run the Sylph application file.

* Windows:
  * Run the Sylph.exe file.

**NOTE**: Sylph will occupy port 5000 for its child process.

## How to Use Sylph

1. Open Sylph and choose "Create a new Svelte prototyping project". Type in the project name and click "Create New". **NOTE**: We do not advise creating two projects of the same name in the same directory.
2. When the Sylph sandbox loads, click the "Components" tab on the right-hand side to open a drawer of components. Drag and drop into the sandbox.
3. To customize an element, click on it in the sandbox. It should turn purple and you should see a menu on the right-hand side change to "Element Attributes". 
    * Assign an ID to the selected element to edit styles.
4. To edit global elements and classes, make sure all elements are de-selected and input your customization into the right-hand column. 
5. You can see your project's directory in the upper right. Click on the arrow to view a dropdown of the directory structure. 
6. Use the tabs in the bottom panel to switch between the code editor, preview, or code editor + preview views. 
7. Drag the horizontal and vertical bars to resize the panels to your desire. 
8. When finished, you can exit the application or select File -> Close Project. 
9. If you would like to reload your saved project, navigate to the main menu and select "Open a previous Svelte prototyping project", selecting your project's filename from the dropdown list. Then click "Open". 

## How to Contribute to Sylph

To run Sylph locally, clone this repository to your local machine and open it. 

Install the required npm packages and run the local version.

```
npm i
npm run dev
```

Feel free to create a branch and make a pull request if you would like to suggest any improvements! 

<h2 href="#Contributors">Contributors</h2>

Sylph is an open-source product developed through OSLabs. This project is maintained by the below group of dedicated engineers, but we openly welcome, encourage and appreciate any and all contributions.

<table align="center">
  <tr>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4D03AQGA6GbnL7avug/profile-displayphoto-shrink_800_800/0/1631750855713?e=1639612800&v=beta&t=pbtoVQC0qc8Ap0n2dRDbj7qvyYN8fwVApYtQsZqu4Ks" width="250"/></td>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFkBD1Q_j8AAw/profile-displayphoto-shrink_800_800/0/1563465185947?e=1639612800&v=beta&t=-8k7a0_FGR6M7eaQeMdNbfyLlD3DD0ETRNZSWAR5ipc" width="250"/></td>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4E03AQEKSfkLzET2Dw/profile-displayphoto-shrink_800_800/0/1629157163376?e=1639612800&v=beta&t=Dr92AuQHcyoSBWiZSq1LgPTqkqmCSGjnKrUfHcCIcmE" width="250"/></td>
    <td valign="top"> <img src="https://media-exp1.licdn.com/dms/image/C4E03AQF499xOPl_xjQ/profile-displayphoto-shrink_800_800/0/1631916229559?e=1639612800&v=beta&t=lQ3b5BwuQETt64nYRZzq8SMzN3-c6wvPvIAFVDyD0wQ" width="250"/></td>
  </tr>
  <tr>
      <td valign="top"><h2 align="center">Randy Diebold</h2></td>
      <td valign="top"><h2 align="center">Kailee Pedersen</h2></td>
      <td valign="top"><h2 align="center">Haobo Wang</h2></td>
      <td valign="top"><h2 align="center">Nick Andreala</h2></td>
  </tr>
   <tr>
      <td align="center"><a href="https://github.com/Randy-diebold" target="_blank" align="center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a></td>
      <td align="center"><a href="https://github.com/kailee-p" target="_blank" align="center"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a></td>
      <td align="center"><a href="https://github.com/hwpanda" target="_blank" align="center"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a></td>
      <td align="center"><a href="https://github.com/JovianDev" target="_blank" align="center"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a></td>
  </tr>
</table>

If you'd like to reach out with any feedback or just want to connect, feel free to contact us. 

<h2 href="#License">License</h2>

This product is licensed under the MIT License.

This is an open source product.

This product is accelerated by [OS Labs](https://opensourcelabs.io/).
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs






