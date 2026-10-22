const project_container = document.getElementById("project-cards");
const skills_container = document.getElementById("skills");
const buttons = document.querySelectorAll('.filter-btn');
let all_projects = [];

fetch("../database/projects.json")
    .then(response => {
        if (!response.ok) throw new Error("could not fetch projects");
        return response.json();
    })
    .then(projects => {
        all_projects = projects;
        render(all_projects);
    })
    .catch(error => {
        console.error(error);
        project_container.textContent = `Could not fetch projects: ${error}`;
    });

fetch("../database/skills.json")
    .then(response => {
        if (!response.ok) throw new Error("could not fetch skills, some error while fetching database");
        return response.json();
    })
    .then(skill => {
        for (const s of skill) {
            const skill_card = document.createElement("div");
            skill_card.classList.add("skill-group");
            const skill_list = document.createElement("ul");
            skill_list.classList.add("skills-list");
            const heading = document.createElement("h3");
            heading.textContent = s.topic;
            skill_card.appendChild(heading);

            for (const st of s.sub_topic) {
                const sub_topic = document.createElement("li");
                sub_topic.textContent = st;
                skill_list.appendChild(sub_topic);
            }
            skill_card.appendChild(skill_list);
            skills_container.appendChild(skill_card);
        }
    })
    .catch(error => {
        console.error(error);
        skills_container.textContent = `could not fetch skills ${error}`;
    });

function render(list) {
    for (const p of list) {
        const card = document.createElement("div");
        card.classList.add("project-group");
        const name = document.createElement("h3");
        name.style.color = 'greenyellow';
        const description = document.createElement("p");
        name.textContent = p.name;
        description.textContent = p.description;
        card.appendChild(name);
        card.appendChild(description);

        for (const l of p.Links) {
            const link_box = document.createElement("a");
            link_box.textContent = l.label;
            link_box.href = l.link;
            card.appendChild(link_box);
        }

        project_container.appendChild(card);
    }
}

function filterprojects(tag) {
    project_container.textContent = "";
    if (tag === "all") {
        render(all_projects);
    } else {
        render(all_projects.filter(p => p.tag === tag));
    }
}

async function loadHours(){
    try{
        const response = await fetch("https://hackatime.hackclub.com/api/v1/users/Code_Arjun/stats");
        const data = await response.json();
        hour = document.getElementById('total_hours')
        hour.textContent = `last 2 weeks Coding Hours: ${data.data.human_readable_total}`;
        
    }catch(err){
        console.log(err)
    }
}

loadHours()


buttons.forEach(btn => {
    btn.addEventListener('click',()=>{
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterprojects(btn.dataset.filter)
    })
})

