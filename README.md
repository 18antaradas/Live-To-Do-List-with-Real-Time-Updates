# ✅ Live To-Do List with Real-Time Updates

A dynamic, single-page task manager built with **HTML5, CSS3, JavaScript and jQuery**. Add, edit, complete, filter and delete tasks instantly, with no page reloads, thanks to real-time DOM manipulation.

> Web Programming project (MC470404), MCA (AI & IoT), Department of Computer Science & Engineering, **NIT Patna**.

---

## ✨ Features

- **Single-Page Application:** every action happens without reloading the page
- **Add, edit, delete and complete tasks** with inline editing
- **Priority levels:** High / Medium / Low with colour-coded badges and left borders
- **Live statistics:** Total, Pending and Completed counters update instantly
- **Filters:** All, Pending, Completed or High Priority
- **Clear Completed:** remove all finished tasks in one click
- **Timestamps:** each task shows the time it was added
- **Animations:** slide-in for new tasks, fade-out on deletion
- **Toast notifications:** instant feedback for every action
- **Keyboard support:** press Enter to add a task or save an edit

## 🛠️ Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Structure | HTML5 | Task list, input, filters, stats bar |
| Styling | CSS3 | Flexbox layout, gradient theme, animations, priority colours |
| Logic | JavaScript + jQuery 3.6.0 (CDN) | Events, DOM updates, filtering, state |

## 📁 Project Structure

```
├── index.html        # Page structure
├── css/
│   └── style.css     # Styling and animations
├── js/
│   └── script.js     # jQuery logic
└── README.md
```

## 🚀 Getting Started

No installation or build step is needed.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

Open `index.html` in any modern browser (Chrome 90+, Firefox 80+, Safari 14+, Edge 90+). An internet connection is only needed on first load to fetch jQuery from the CDN.

## 🧠 How It Works

```
Page loads → jQuery loads → $(document).ready() fires
        ↓
User enters a task + priority → clicks Add (or presses Enter)
        ↓
Empty?  → show warning toast
Valid?  → build <li> with template literal → .append() to <ul> → updateStats()
        ↓
Checkbox → toggle .completed     Edit → swap <span> for <input>
Delete   → .fadeOut() + .remove()   Filter → .toggle() by status/priority
```

### Event delegation

Task buttons are created dynamically after the page loads, so listeners are attached to `document` and filtered by class:

```javascript
// Works for current AND future elements
$(document).on('click', '.btn-delete', function () { ... });
```

### Core functions

| Function | Purpose |
|---|---|
| `addTask()` | Validates input, builds and appends a task item |
| `updateStats()` | Recalculates Total / Pending / Completed counters |
| `showToast(msg)` | Displays a temporary notification |
| `timeNow()` | Returns the current time for the task timestamp |

## 🧪 Tested Behaviour

| Action | Result |
|---|---|
| Add a task | Appears instantly with badge, timestamp and buttons; stats update |
| Add an empty task | Warning toast; nothing added |
| Check / uncheck | Strikethrough on/off; counters update |
| Edit then Save | Text turns into an input and back; Enter also saves |
| Delete | Task fades out; counters update |
| Filters | Pending, Completed and High Priority show the right tasks |
| Clear Completed | All completed tasks fade out; stats update |

## ⚠️ Known Limitations

- Tasks are stored only in the page, so they disappear on refresh (no `localStorage` or backend yet)
- Task text is inserted as HTML, so special characters such as `<` or quotes can break the layout; escape user input before rendering
- A newly added task is not hidden or shown according to the currently active filter until a filter button is clicked again
- Editing a task does not change its priority

## 🔮 Future Enhancements

- Persist tasks with `localStorage` or a backend database
- Escape user input to prevent HTML injection
- Re-apply the active filter when tasks change
- Due dates, search, drag-and-drop ordering and dark mode
- Multi-user real-time sync with WebSockets

## 👥 Team

| Member | Role |
|---|---|
| Antara Das (2447058) | jQuery: core utilities (add task, time, statistics) |
| Sonu Kumar (2447059) | Documentation and commit log |
| Arpit Gupta (2447060) | Team member |
| Ajay Patidar (2447061) | HTML structure |
| Neha Sonkar (2447062) | UI design and CSS |
| Priyal Patidar (2447063) | jQuery: filtering, clear completed, initialisation |

**Submitted to:** Dr. Adla Sanober

## 📚 References

- [jQuery API Documentation](https://api.jquery.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools jQuery Tutorial](https://www.w3schools.com/jquery/)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 📄 License

For academic and educational purposes.
