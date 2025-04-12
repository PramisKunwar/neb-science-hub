
import { notes, NoteItem } from '@/data/notes';
import { subjects, Subject } from '@/data/subjects';

export const searchAll = (query: string): { notes: NoteItem[], subjects: Subject[] } => {
  const lowerQuery = query.toLowerCase();
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(lowerQuery) || 
    note.subject.toLowerCase().includes(lowerQuery) || 
    note.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  );
  
  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(lowerQuery) ||
    subject.description.toLowerCase().includes(lowerQuery) ||
    subject.areas.some(area => 
      area.name.toLowerCase().includes(lowerQuery) ||
      area.chapters.some(chapter => chapter.title.toLowerCase().includes(lowerQuery))
    )
  );
  
  return {
    notes: filteredNotes,
    subjects: filteredSubjects
  };
};
