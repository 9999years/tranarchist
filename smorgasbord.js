const id = (id) => document.getElementById(id)
const sel = (sel) => document.querySelector(sel)
const selAll = (sel) => document.querySelectorAll(sel)

function el(element, properties, ...children) {
    const ret = document.createElement(element)
    if (properties !== null && properties !== undefined) {
        for (const key in properties) {
            ret.setAttribute(key, properties[key])
        }
    }
    for (const child of children) {
        ret.append(child)
    }
    return ret
}

const colors = [
    "white",
    "green",
    "yellow",
    "red"
]

const sections = {
    "Romantic": "Chemical reaction, feelings of love",
    "Friendship": "Companionship, playfulness, shared activity/interest",
    "Domestic": "Sharing a dwelling/home",
    "Sexual": "Activities involving genitals, anus, or orgasms?",
    "Physical touch": "Dance, body contact, cuddles, hugs, pets, hand holding, massage",
    "Life partner": "Sharing goals (long term or life)",
    "Caregiver": "Giving care to or receiving care from",
    "Co-Caregivers": "Children, animals, plants, family",
    "Emotional intimacy": "Sharing & bring vulnerable",
    "Emotional support": "Listening, being asked for advice, confidant",
    "Social partners": "Seen together: at events, with friends, family, work, on social media",
    "Financial": "Sharing: money, accounts, payment responsibilities, property",
    "Kink": "Any of your favorites",
    "Power dynamic": "Boss/employee, Teacher/student, age/pet/DS play",
    "Collaborative partners": "Teaching projects, making art, organizing",
    "Business partners": "A mix of collaborative, financial, & social",
}

function make_boxes() {
    const boxes = el("div", {id: "boxes"})
    for (const section of Object.getOwnPropertyNames(sections)) {
        const textarea = el("textarea", {
            placeholder: sections[section],
            "data-feeling": colors[0],
            class: colors[0],
        })
        const h2 = el("h2", null, section)
        h2.addEventListener("click", function (_e) {
            next_color(textarea)
        })
        boxes.append(
            el("section", {
                "data-name": section,
            },
                h2,
                textarea
            )
        )
    }
    id("boxes").replaceWith(boxes)
}

make_boxes()

function next_color_name(color) {
    return colors[(colors.indexOf(color) + 1) % colors.length]
}

function next_color(textarea) {
    let color = textarea.getAttribute("data-feeling")
    let new_color = next_color_name(color)
    textarea.classList.add(new_color)
    textarea.classList.remove(color)
    textarea.setAttribute("data-feeling", new_color)
}

function export_wants() {
    const out = {}
    for (const box of id("boxes").children) {
        const textarea = box.getElementsByTagName("textarea")[0]
        const color = colors.indexOf(textarea.getAttribute("data-feeling"))
        const text = textarea.value
        if (color == 0 && text.trim().length == 0) {
            continue
        }
        const name = box.getAttribute("data-name")
        out[name] = [color, text]
    }
    id("export").innerText = btoa(JSON.stringify(out))

}

function import_wants() {
    const wants = JSON.parse(atob(prompt("smorgasbord code:")));
    const boxes = document.querySelectorAll('#boxes>div')
    const changes = Object.keys(wants)
    for (i = 0; i < changes.length; i++) {
        cur = boxes[boxen.indexOf(changes[i])].lastElementChild
        cur.style.backgroundColor = colors[wants[changes[i]][0]]
        cur.value = wants[changes[i]][1]
    }
}
