// fetch all issues
const allIssues = async () => {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  const totalIssues = data.data;
//   console.log("🚀 ~ allIssues ~ totalIssues:", totalIssues)

  document.getElementById("total-issue").innerText = `${totalIssues.length} Issues`;

  displayCards(totalIssues);
};



const displayCards = (issues) => {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  for (let issue of issues) {
    // make card
    const card = document.createElement("div");
    if (issue.status == "open") {
      card.classList.add("shadow-[0_1px_6px_0_rgba(0,0,0,0.10)]", "rounded-lg", "border-t-4", "border-green-500");
    } else {
      card.classList.add("shadow-[0_1px_6px_0_rgba(0,0,0,0.10)]", "rounded-lg", "border-t-4", "border-purple-500");
    }

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


allIssues();