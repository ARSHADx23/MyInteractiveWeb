const audio = new Audio('path/to/podcast.mp3');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const notesContainer = document.getElementById('notes-container');

// Example timestamped notes
const notes = [
  { time: 12, text: "Introduction to the episode" },
  { time: 45, text: "Guest joins the conversation" },
  { time: 120, text: "Key topic: Web development trends" },
  { time: 210, text: "Listener Q&A" },
  { time: 300, text: "Closing remarks" }
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function renderNotes() {
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.innerHTML = `
      <span class="timestamp">${formatTime(note.time)}</span>
      <span>${note.text}</span>
    `;
    li.addEventListener('click', () => {
      const audio = document.getElementById('podcast-audio');
      audio.currentTime = note.time;
      audio.play();
      li.classList.add('active');
      setTimeout(() => li.classList.remove('active'), 300);
    });
    notesList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderNotes);

playButton.addEventListener('click', () => {
    audio.play();
});

pauseButton.addEventListener('click', () => {
    audio.pause();
});

fetch('notes.json')
    .then(response => response.json())
    .then(notes => {
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `<span>${note.timestamp}</span>: ${note.description}`;
            noteElement.addEventListener('click', () => {
                audio.currentTime = note.time;
                audio.play();
            });
            notesContainer.appendChild(noteElement);
        });
    })
    .catch(error => console.error('Error loading notes:', error));