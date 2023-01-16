const pageTitle = document.querySelector('.page-title')
const themeSwitch = document.querySelector('.theme-switch')
const themeSwitchLeft = document.querySelector('.switch-left')
const themeSwitchRight = document.querySelector('.switch-right')
const filterSearchBar = document.getElementById('filter')
const filterLocationInput = document.getElementById('filter-location')
const filterLocationValue = filterLocationInput.value
const checkBox = document.getElementById('checkbox')
const notChecked = document.querySelector('.notchecked')
const checked = document.querySelector('.checked')
const searchBtn = document.querySelector('.search-button')
const form = document.querySelector('.search-form')
const mainContainer = document.getElementById('main-container')
const infoContainer = document.getElementById('info-container')

let jobArray = []

const getJsonData = async function(){
    const response = await fetch("./data.json")
    jobArray = await response.json();
    spread = [...jobArray];
    populateDom(jobArray)
}
getJsonData()
function addListToDom(array){
    array.forEach((data) => {
        const jobElement =`
        <div id="${data.id}" class="list job-container">
            <picture id="${data.id}" style="background-color: ${data.logoBackground};" class="list job-icon">
                <img id="${data.id}" class="list job-logo" src="${data.logo}">
            </picture>
            <div id="${data.id}" class="list description-top">
                <p id="${data.id}" class="list job-posted">${data.postedAt}</p>
                <div id="${data.id}" class="list small-circle"></div>
                <p id="${data.id}" class="list job-time">${data.contract}</p>
            </div>
            <h3 id="${data.id}" class="list job-title">${data.position}</h3>
            <p id="${data.id}" class="list job-company">${data.company}</p>
            <h4 id="${data.id}" class="list job-location">${data.location}</h4>
        </div>`;
        mainContainer.innerHTML += jobElement
    });
}

function populateDom(array){
    addListToDom(array)
}

checkBox.addEventListener('change', () =>{
    if(checkBox.checked){
        checkBox.classList.remove('checked')
        checkBox.classList.add('notchecked')
        filter()
    }
    else{
        checkBox.classList.remove('notchecked')
        checkBox.classList.add('checked')
        mainContainer.innerHTML = ''
        getJsonData()
    }
})


pageTitle.addEventListener('click', () => {
    form.classList.remove('hidden')
    mainContainer.classList.remove('hidden')
    infoContainer.classList.add('hidden')
})

// themeSwitch.addEventListener('click', darkMode)

// function darkMode(){
//     themeSwitch.classList.remove('switch-light')
//     themeSwitch.classList.remove('switch-left')
//     themeSwitch.classList.add('switch-right')
//     themeSwitch.classList.add('switch-dark')
//     themeSwitch.removeEventListener('click', darkMode)
//     themeSwitch.addEventListener('click', lightMode)
//     document.querySelector('.company-container').classList.add('company-container-dark')
// }
// function lightMode(){
//     themeSwitch.classList.remove('switch-right')
//     themeSwitch.classList.remove('switch-dark')
//     themeSwitch.classList.add('switch-light')
//     themeSwitch.classList.add('switch-left')
//     themeSwitch.removeEventListener('click', lightMode)
//     themeSwitch.addEventListener('click', darkMode)
// }

function addDescriptionToDom(data){
    let companyWebsite = `${data.company.toLowerCase().replace(/ /g,'')}.com`
    infoContainer.innerHTML = `
    <div class="company-container">
        <div class="left-company-container">
            <picture style="background-color:${data.logoBackground};" class="company-container-logo">
                <img class="job-logo" src="${data.logo}">
            </picture>
        </div>
        <div class="middle-company-container">
            <h2>${data.company}</h2>
            <p><a href="${data.website}">${companyWebsite}</a></p>
        </div>
        <div class="right-company-container">
            <button onclick="window.location.href='${data.website}' " class="company-site" id="company-site">Company Site</button>    
        </div>
            </div>
            <div class="job-description-container">
        <div class="top-container">
            <div class="top-container-left">
                <div class="description-top">
                    <p class="job-posted">${data.postedAt}</p>
                    <div class="small-circle"></div>
                    <p class="job-time">${data.contract}</p>
                </div>
                <h3 class="job-description-title">${data.position}</h3>
                <h4 class="job-description-location">${data.location}</h4>
            </div>
            <div class="top-container-right">
                <button onclick="window.location.href = '${data.apply}' "class="apply-button">Apply Now</button>
            </div>
        </div>
        <p class="job-description">${data.description}</p>
        <div class="requirements-container">
            <h3>Requirements</h3>
            <p class="requirements-content">${data.requirements.content}</p>
            <ul>
                <li>${data.requirements.items[0]}</li>
                <li>${data.requirements.items[1]}</li>
                <li>${data.requirements.items[2]}</li>
                <li>${data.requirements.items[3]}</li>
            </ul>    
        </div>
        <div class="role-container">
            <h3>What You Will Do</h3>
            <p class="role-content">${data.role.content}</p>
            <ol>
                <li>${data.role.items[0]}</li>
                <li>${data.role.items[1]}</li>
                <li>${data.role.items[2]}</li>
                <li>${data.role.items[3]}</li>
            </ol>  
        </div>
    </div>
    <footer>
    <div>
        <h3>${data.position}</h3>
        <p>So Digital Inc.</p>
    </div>
    <button onclick="window.location.href = '${data.apply}' "class="apply-button">Apply Now</button>
    </footer>`;    
}

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    filterSearch()
})
function filter(){
    jobArray = jobArray.filter((data) =>{
        if(data.contract.includes('Full Time')){
            return data
        }
        mainContainer.innerHTML = ""
        console.log(data)
    })
    populateDom(jobArray)
}
filterSearchBar.addEventListener("keyup", filterSearch)
function filterSearch(){
    const jobContainer = document.querySelectorAll('.job-container')
    const jobTitle = [...document.querySelectorAll('.job-title')]
    const jobTitleMapped = jobTitle.map(h3 => h3.innerText.toUpperCase())
    const jobCompany = [...document.querySelectorAll('.job-company')]
    const jobCompanyMapped = jobCompany.map(p => p.innerText.toUpperCase())
    const jobLocation = [...document.querySelectorAll('.job-location')]
    const jobLocationMapped = jobLocation.map(h3 => h3.innerText.toUpperCase())
    for (i = 0; i < jobTitle.length; i++){
        let filterSearchVal = filterSearchBar.value.toUpperCase()
        if(jobTitleMapped[i].indexOf(filterSearchVal) > -1 || jobCompanyMapped[i].indexOf(filterSearchVal) > -1 || jobLocationMapped[i].indexOf(filterSearchVal) > -1){
            jobContainer[i].style.display = ""
        }
        else if (jobTitleMapped[i].indexOf(filterSearchVal) <= -1 || jobCompanyMapped[i].indexOf(filter) <= -1 || jobLocationMapped[i].indexOf(filter) <= -1){
            jobContainer[i].style.display = "none"
        }
    }
}
// filterLocationInput.addEventListener("keyup", filterSearchLocation)
// function filterSearchLocation(){
//     const jobContainer = document.querySelectorAll('.job-container')
//     const jobLocation = [...document.querySelectorAll('.job-location')]
//     const jobLocationMapped = jobLocation.map(h3 => h3.innerText.toUpperCase())
//     for (i = 0; i < jobLocation.length; i++){
//         let filterSearchValue = filterLocationInput.value.toUpperCase()
//         if(jobLocationMapped[i].indexOf(filterSearchValue) > -1){
//             jobContainer[i].style.display = ""
//         }
//         else if (jobLocationMapped[i].indexOf(filterSearchValue) <= -1){
//             jobContainer[i].style.display = "none"
//         }
//     }
// }
window.onload=function(){
    mainContainer.addEventListener('click', (e)=>{
        let target = e.target
        console.log(target)
        if(target.classList.contains("list")){
            addDescriptionToDom(jobArray[target.id-1])
            infoContainer.classList.remove('hidden')
            form.classList.add('hidden')
            mainContainer.classList.add('hidden')
                window.scrollTo({
                    top:110,
                    behavior:'smooth'
                });
        }
    })
}
