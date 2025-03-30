document.addEventListener("DOMContentLoaded",()=>{
    const dogList = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    fetch("http://localhost:3000/pups").then((response)=>response.json()).then((data)=>{
        dogList.innerHTML=``
        data.map((dog)=>{
            const dogSpan = document.createElement('span');
            dogSpan.textContent=dog.name;
            dogList.appendChild(dogSpan);
            dogSpan.addEventListener("click",()=>{
              dogInfo.innerHTML=`
                <img src="${dog.image}" />
                <h2>${dog.name}</h2>
                <button id="dog-${dog.id}">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
              `
              document.getElementById(`dog-${dog.id}`).addEventListener('click',()=>{
                  fetch(`http://localhost:3000/pups/${dog.id}`,{
                      method: 'PATCH',
                      headers: {
                          "content-type": 'application/json'
                      },
                      body: JSON.stringify({isGoodDog: !dog.isGoodDog})
                  }).catch((err)=>{
                      console.log(err)
                  })
              })
            });
        })
    }).catch((err)=>{console.error(err)})
})