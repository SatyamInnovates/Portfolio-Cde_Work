
const project_container = document.getElementById("project")
fetch("../database/projects.json")
    .then(response => {
        if (!response.ok) throw new Error("could not fetch projects,some error while fetching database");
        return response.json();
    })
    .then(projects => {
        for (const p of projects){
            const card = document.createElement('div')
            card.classList.add('project-group');
            const name = document.createElement('h2');
            const description = document.createElement('p')
            name.textContent = p.name;
            description.textContent = p.description;
            card.appendChild(name);
            card.appendChild(description);

            for (let l of p.Links) {
                const link_box = document.createElement('a');
                link_box.textContent = l.label
                link_box.href = l.link
                card.appendChild(link_box)
            }
            project_container.appendChild(card)
            
        }
    })
    .catch(error => {
        project_container.textContent = `-Could not fetch projects ${error}`;
    }
);



