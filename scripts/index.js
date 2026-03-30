let fetchedData = [];

// fetch all issues
const allIssues = async () => {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  fetchedData = data.data;
  //   console.log("🚀 ~ allIssues ~ fetchedData:", fetchedData)

  document.getElementById("total-issue").innerText = `${fetchedData.length} Issues`;

  activeButton("btn-all");
  displayCards(fetchedData);
};

// making button active
document.getElementById("btn-open").addEventListener("click", () => {
  const openIssues = fetchedData.filter((issue) => issue.status === "open");
  activeButton("btn-open");
  displayCards(openIssues);
  document.getElementById("total-issue").innerText = `${openIssues.length} Open Issues`;
});

document.getElementById("btn-close").addEventListener("click", () => {
  const closedIssues = fetchedData.filter((issue) => issue.status === "closed");
  activeButton("btn-close");
  displayCards(closedIssues);
  document.getElementById("total-issue").innerText = `${closedIssues.length} Closed Issues`;
});

document.getElementById("btn-all").addEventListener("click", () => {
  activeButton("btn-all");
  displayCards(fetchedData);
  document.getElementById("total-issue").innerText = `${fetchedData.length} Issues`;
});

const activeButton = (btnID) => {
  const buttons = document.querySelectorAll("#buttons button");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeBtn = document.getElementById(btnID);
  activeBtn.classList.add("active");
};


    // priority style
    const priorityStyle = {
      high: "bg-red-100 text-red-700 w-20 text-center rounded-full",
      medium: "bg-yellow-100 text-yellow-700 w-20 text-center rounded-full",
      low: "bg-slate-100 text-slate-700 w-20 text-center rounded-full",
    };

    //labeling --- 1
    const labelStyle = (label) => {
      if (label.includes("bug")) {
        return {
          label: `px-2 bg-red-100 text-red-700 text-center rounded-full`,
          icon: `fa-solid fa-bug text-red-700`,
        };
      }
      if (label.includes("help wanted")) {
        return {
          label: `px-2 bg-yellow-100 text-yellow-600 text-center rounded-full`,
          icon: `fa-solid fa-circle-question text-yellow-700  `,
        };
      }
      if (label.includes("enhancement")) {
        return {
          label: `px-2 bg-green-100 text-green-700 text-center rounded-full`,
          icon: `fa-solid fa-arrow-up-right-dots text-green-700`,
        };
      }
      if (label.includes("good first issue")) {
        return {
          label: `px-2 bg-amber-100 text-amber-700 text-center rounded-full`,
          icon: `fa-solid fa-anchor-circle-exclamation text-amber-700`,
        };
      }
      if (label.includes("documentation")) {
        return {
          label: `px-2 bg-gray-100 text-gray-700 text-center rounded-full`,
          icon: `fa-solid fa-file text-gray-700`,
        };
      }
    };
    //labeling --- 2
    const labeling = (arr) => {
      return arr
        .map((aLabel) => {
          const labelValue = labelStyle(aLabel);

          return `
            <span class="${labelValue.label}">
                <i class="${labelValue.icon} pr-1"></i>
                    ${aLabel}
            </span>
        `;
        }) 
        .join(" ");
    };

// display cards
const displayCards = (issues) => {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  for (let issue of issues) {
    // make card
    const card = document.createElement("div");
    card.addEventListener("click", ()=>{
      loadModal(issue.id)
    });
    if (issue.status == "open") {
      card.classList.add("shadow-[0_1px_6px_0_rgba(0,0,0,0.10)]", "rounded-lg", "border-t-4", "border-green-500");
    } else {
      card.classList.add("shadow-[0_1px_6px_0_rgba(0,0,0,0.10)]", "rounded-lg", "border-t-4", "border-purple-500");
    }



    card.innerHTML = `
    <div class="border-b p-6 border-zinc-200 space-y-3">
        <div class="flex justify-between items-center mb-5">
            <img src="${issue.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed- Status .png"}"/>
            <div class="${priorityStyle[issue.priority]}"> ${issue.priority}</div>
        </div>

        <div class="space-y-3 h-[150px]">
            <h2 class="font-semibold">${issue.title}</h2>
            <p class="text-slate-500">${issue.description}</p>

            <div class=" flex flex-wrap gap-1">
                ${labeling(issue.labels)}
                
            </div>

        </div>
    </div>
     <div class="p-6 space-y-2">
        <p class="text-slate-500">${issue.author}</p>
        <p class="text-slate-500">${new Date(issue.updatedAt).toLocaleDateString()}</p>
    </div>
    `;
    // console.log(new Date(issue.updatedAt).toLocaleDateString());

    cards.appendChild(card);
  }
};


// modal
const loadModal = async(id) => {
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();
  modalData = data.data;


  document.getElementById(`my_modal_5`).showModal();
  const modal = document.getElementById("modal-bx");
  modal.innerHTML = "";
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("space-y-6");
  modalContainer.innerHTML = `
          <div class="space-y-2">
            <h1 class="text-2xl font-semibold">${modalData.title}</h1>
            <div class="space-x-2">
              <span class="bg-green-600 text-white rounded-full py-1 px-3">${modalData.status}</span>
              <span class="text-gray-600">&bull;</span>
              <span class="text-gray-600">Opened by ${modalData.author}</span>
              <span class="text-gray-600">&bull;</span>
              <span class="text-gray-600">${new Date(modalData.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1">
            ${labeling(modalData.labels)}
          </div>

          <p class="text-gray-600 text-lg">${modalData.description}</p>

          <div class="flex ">
            <div class="flex-1 space-y-1">
              <h3 class="text-gray-600">Assignee:</h3>
              <h2 class="font-semibold">${modalData.assignee}</h2>
            </div>
            <div class="flex-1 space-y-1">
              <h3 class="text-gray-600">Priority:</h3>
              <div class="${priorityStyle[modalData.priority]}"> ${modalData.priority}</div>
            </div>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary px-8">Close</button>
            </form>
          </div>
  
  `;
  modal.append(modalContainer);
  
}




allIssues();
