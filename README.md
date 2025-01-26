<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">SoccerMetrics</h1>

  <p align="center">
    AI soccer shot analysis platform to improve kicking form
    <br />
    <a href="https://www.youtube.com/watch?v=WyINpCzZDsw" target="_blank"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://www.shakespeareai.ca">Visit Website</a>
    ·
    <a href="https://github.com/gordonzhang1/ShakespeareAI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/gordonzhang1/ShakespeareAI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->




<!-- ABOUT THE PROJECT -->
## About The Project

  <a href="https://github.com/gordonzhang1/ShakespeareAI">
    <img src="https://www.gordonzhang.ca/assets/WhaleBeing-CMRDC8OQ.png" alt="Logo" width="1000" height="auto">
  </a>
  <p>  SoccerMetrics is a 
</p>


## What it does, and how we built it
</h3>
<p>WhaleBeing uses a dynamic prediction model to display how ship routes interact with blue whale habitats using a web app.

The core of our maching learning model is based off a 2019 research paper published in _ Diversity and Distributions (https://onlinelibrary.wiley.com/doi/full/10.1111/ddi.12940) _, and predicts daily, year-round habitat suitability for blue whales off the coast of California. We implemented a method using a Boosted Regression Tree and candidate Generalized Additive Mixed Models to use satellite data of tracked blue whales to produce a whale distribution prediction.

WhaleBeing enables users to search and visualize ship routes overlaid on our dynamic prediction heatmaps using the SeaRoutes API. Once a ship route is found, WhaleBeing calculates the likelihood of that route intersecting with areas of high blue whale activity by integrating the distribution weights along the nodes of the ship route.

This calculation is pivotal in assessing the risk of ship strikes and supports proactive decision-making to mitigate such risks, ultimately aiding in the protection of this endangered species.</p>



### Built With

* [![React][React.js]][React-url]
* [![Python][Python]][Python-url]
* [![Flask][Flask]][Flask-url]
* [![NumPy][NumPy]][NumPy-url]
* [![Pandas][Pandas]][Pandas-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![OpenCV][OpenCV]][OpenCV-url]
* [![MediaPipe][MediaPipe]][MediaPipe-url]





### Deployed With
* [![Google Cloud][GoogleCloud]][GoogleCloud-url]
* [![Vercel][Vercel]][Vercel-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features
<ul>
  <li><strong>AI-Powered Whale Distribution Prediction:</strong> Built a machine learning model in Python with NumPy and Pandas to predict whale distribution patterns using open-source satellite data, providing whale presence forecasts for any day of the year.</li>
  <li><strong>Real-Time Whale Heatmap:</strong> Integrated the machine learning model with the Mapbox API to deliver an interactive, real-time predictive whale heatmap, enhancing maritime navigation and minimizing the risk of ship strikes.</li>
  <li><strong>Ship Strike Risk Analysis:</strong> Developed a Python-based risk-analysis algorithm in Flask to assess the probability of ship strikes with whales.</li>
  <li><strong>Seamless Integration with Ship Route Search:</strong> Incorporated the Searoutes API to enable dynamic ship route searches, calculating risk percentages based on predicted whale presence.</li>

</ul>
And more to come! 
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<p>Want to try WhaleBeing out? Go to <a href="https://www.whalebeing.co/">www.whalebeing.ca</a> and type in 9455911 for the ship IMO number, and 2025/01/09 - 2025/01/11 for the dates. </p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>








<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Gordon Zhang - g234zhan@uwaterloo.ca

Project Link: [https://github.com/gordonzhang1/WhaleBeing](https://github.com/gordonzhang1/WhaleBeing)

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[contributors-url]: https://github.com/gordonzhang1/ShakespeareAI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[forks-url]: https://github.com/gordonzhang1/ShakespeareAI/network/members
[stars-shield]: https://img.shields.io/github/stars/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[stars-url]: https://github.com/gordonzhang1/ShakespeareAI/stargazers
[issues-shield]: https://img.shields.io/github/issues/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[issues-url]: https://github.com/gordonzhang1/ShakespeareAI/issues
[license-shield]: https://img.shields.io/github/license/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[license-url]: https://github.com/gordonzhang1/ShakespeareAI/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/gordonzhang1
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[OpenAI-API]: https://img.shields.io/badge/OpenAI%20API-412991?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-API-url]: https://openai.com/api/

[GCP]: https://img.shields.io/badge/Cloud%20Vision%20API-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[GCP-url]: https://cloud.google.com/vision/

[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/

[Firestore]: https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firestore-url]: https://firebase.google.com/products/firestore/

[Cpp]: https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white
[Cpp-url]: https://isocpp.org/

[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Render]: https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white
[Render-url]: https://render.com/

[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=FFFFFF
[Python-url]: https://www.python.org/

[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/

[Azure]: https://img.shields.io/badge/Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white
[Azure-url]: https://azure.microsoft.com/

[NumPy]: https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white
[NumPy-url]: https://numpy.org/

[Pandas]: https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white
[Pandas-url]: https://pandas.pydata.org/

[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/

[OpenCV]: https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white
[OpenCV-url]: https://opencv.org/
[MediaPipe]: https://img.shields.io/badge/MediaPipe-FF6F00?style=for-the-badge&logo=google&logoColor=white
[MediaPipe-url]: https://mediapipe.dev/
[GoogleCloud]: https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white
[GoogleCloud-url]: https://cloud.google.com/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
