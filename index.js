const project_container = document.getElementById("project")
const skills_container = document.getElementById('skills')

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




fetch("../database/skills.json")
    .then(response => {
        if (!response.ok) throw new Error("could not fetch skills,some error while fetching database");
        return response.json();
    })
    .then(skill => {
        for (const s of skill){
            const skill_card = document.createElement('div');
            skill_card.classList.add("skill-group");
            const skill_list = document.createElement('ul');
            skill_list.classList.add('skills-list')
            const heading = document.createElement('h3');
            heading.textContent = s.topic;
            skill_card.appendChild(heading)
            
            for(let st of s.sub_topic){
                const sub_topic = document.createElement('li')
                sub_topic.textContent = st
                skill_list.appendChild(sub_topic)
            }
            skill_card.appendChild(skill_list)
            skills_container.appendChild(skill_card)
        }
    })
    .catch(error => {
        skills_container.textContent = `could not fetch skills ${error}`
    }
);


